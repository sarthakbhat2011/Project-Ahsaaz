import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";

const PORT = parseInt(process.env.PORT || "3000");
const DATA_DIR = path.join(process.cwd(), "data");
const SIGNUPS_FILE = path.join(DATA_DIR, "signups.json");
const EMAILS_FILE = path.join(DATA_DIR, "sent_emails.json");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to read signups
function readSignups() {
  if (!fs.existsSync(SIGNUPS_FILE)) return [];
  try {
    const data = fs.readFileSync(SIGNUPS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading signups:", err);
    return [];
  }
}

// Helper to write signups
function writeSignups(signups: any[]) {
  try {
    fs.writeFileSync(SIGNUPS_FILE, JSON.stringify(signups, null, 2));
  } catch (err) {
    console.error("Error writing signups:", err);
  }
}

// Helper to read sent emails
function readSentEmails() {
  if (!fs.existsSync(EMAILS_FILE)) return [];
  try {
    const data = fs.readFileSync(EMAILS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading emails:", err);
    return [];
  }
}

// Helper to write sent emails
function writeSentEmails(emails: any[]) {
  try {
    fs.writeFileSync(EMAILS_FILE, JSON.stringify(emails, null, 2));
  } catch (err) {
    console.error("Error writing emails:", err);
  }
}

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY environment variable is not set. Gemini features will run in simulator mode.");
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return aiClient;
}

// Developer Authentication Token setup
const DEV_TOKEN = process.env.DEV_TOKEN || "sarthakbhatsamosachutni2011,2001";

// HTML escape helper for XSS prevention
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Lightweight in-memory rate limiter to prevent API/SMTP spam
const ipLimits = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // max 5 requests per minute

function rateLimiter(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = req.ip || (req.headers["x-forwarded-for"] as string) || "unknown";
  const now = Date.now();
  const limit = ipLimits.get(ip);

  if (!limit) {
    ipLimits.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }

  if (now > limit.resetTime) {
    ipLimits.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }

  if (limit.count >= MAX_REQUESTS) {
    return res.status(429).json({ error: "Too many signups from this IP address. Please wait a minute." });
  }

  limit.count++;
  next();
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Security Headers Middleware (Helmet equivalents for Clickjacking, MIME sniffing, and XSS hardening)
  app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });

  // CSRF protection check for state-mutating requests
  const csrfCheck = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const origin = req.headers.origin;
    const host = req.headers.host;
    if (origin && !origin.includes(host || 'localhost:3000')) {
      return res.status(403).json({ error: "Forbidden: CSRF protection triggered." });
    }
    next();
  };

  // API Route: Get all recent signups (Public: email address stripped for privacy)
  app.get("/api/signups", (req, res) => {
    const signups = readSignups();
    const publicSignups = signups.map(({ email, ...rest }: any) => rest);
    res.json(publicSignups);
  });

  // API Route: Verify developer token
  app.post("/api/dev/auth", csrfCheck, (req, res) => {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: "Token is required." });
    }
    if (token === DEV_TOKEN) {
      return res.json({ success: true });
    }
    return res.status(401).json({ error: "Invalid developer token." });
  });

  // API Route: Get all sent simulated/actual emails (Developer Only)
  app.get("/api/sent-emails", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized access: Missing developer token." });
    }
    const token = authHeader.split(" ")[1];
    if (token !== DEV_TOKEN) {
      return res.status(401).json({ error: "Unauthorized access: Invalid developer token." });
    }
    const emails = readSentEmails();
    res.json(emails);
  });

  // API Route: Handle Sign Up and send email to sarthakbhat2011@gmail.com
  app.post("/api/signup", csrfCheck, rateLimiter, async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required fields." });
    }

    if (typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
      return res.status(400).json({ error: "Name must be a valid string under 100 characters." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== "string" || !emailRegex.test(email) || email.length > 100) {
      return res.status(400).json({ error: "Please provide a valid email address." });
    }

    if (message && (typeof message !== "string" || message.length > 1000)) {
      return res.status(400).json({ error: "Message must be under 1000 characters." });
    }

    const signupMsg = message || "I want to offer silent warmth and assist families in need.";
    let reflection = "";

    // 1. Generate an inspiring "Ahsaaz Reflection" using Gemini
    try {
      const ai = getGemini();
      if (ai) {
        const prompt = `You are the guiding spirit of Project Ahsaaz, a compassionate, soothing organization dedicated to deep empathy, hunger relief, and emotional connection.
A new volunteer has signed up.
Name: ${name}
Empathy Message: "${signupMsg}"

Write a short, highly personalized, and deeply moving 2-3 sentence "Ahsaaz Reflection" specifically addressing their message. Express deep, soothing gratitude, and reflect on how their specific intent helps heal isolation and hunger. Avoid standard corporate language or robotic greetings. Speak from the heart. Do not use markdown tags, just return the plain text paragraphs.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
        });
        reflection = response.text || "";
      } else {
        // Fallback simulator reflection
        reflection = `Thank you, ${name}. Your desire to join Project Ahsaaz stems from a beautiful, deep realization of human connection. By sharing your warmth and addressing hunger with dignity, you are helping to sow a seed of hope that will grow into a sanctuary of support for our community. We are honored to walk this path of true compassion together with you.`;
      }
    } catch (err: any) {
      console.error("Gemini AI Reflection generation error:", err);
      reflection = `Thank you, ${name}. Your message of compassion resonates deeply with Project Ahsaaz. By step-by-step offering food and genuine human listening, you are restoring dignity and showing that empathy is a physical force for good. We welcome your hand in our shared circle of friends.`;
    }

    const timestamp = new Date().toISOString();
    const newSignup = { name, email, message: signupMsg, reflection, timestamp };

    // 2. Save signup
    const signups = readSignups();
    signups.unshift(newSignup);
    writeSignups(signups.slice(0, 100)); // Keep last 100 entries

    // HTML escape for XSS protection inside email template
    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedMessage = escapeHtml(signupMsg);
    const escapedReflection = escapeHtml(reflection);

    // 3. Compose the HTML email to developer
    const recipientEmail = "sarthakbhat2011@gmail.com";
    const subject = `[Project Ahsaaz] New Empathetic Sign-up: ${escapedName}`;
    const htmlContent = `
      <div style="font-family: 'Inter', sans-serif; background-color: #fff8f5; color: #1e1b18; padding: 40px; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid #e9e1dc; box-shadow: 0 10px 30px rgba(68, 42, 34, 0.05);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="font-family: 'Source Serif 4', Georgia, serif; color: #442a22; margin: 0 0 10px 0; font-size: 28px; font-weight: 700; letter-spacing: -0.01em;">Project Ahsaaz</h1>
          <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #9b451c; margin: 0; font-weight: 600;">Empathy in Action &bull; Hunger in Retreat</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(130, 116, 112, 0.15);">
          <h2 style="font-family: 'Source Serif 4', Georgia, serif; color: #442a22; margin-top: 0; margin-bottom: 16px; font-size: 20px; border-bottom: 1px solid #f5ece7; padding-bottom: 8px;">Volunteer Registration</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; font-weight: 600; color: #504441; font-size: 14px; width: 30%;">Full Name:</td>
              <td style="padding: 6px 0; color: #1e1b18; font-size: 14px;">${escapedName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600; color: #504441; font-size: 14px;">Email:</td>
              <td style="padding: 6px 0; color: #1e1b18; font-size: 14px;"><a href="mailto:${escapedEmail}" style="color: #9b451c; text-decoration: none;">${escapedEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600; color: #504441; font-size: 14px;">Registered at:</td>
              <td style="padding: 6px 0; color: #1e1b18; font-size: 14px;">${new Date(timestamp).toLocaleString()}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #fbf2ed; padding: 24px; border-radius: 12px; margin-bottom: 24px; border-left: 4px solid #9b451c;">
          <h3 style="margin-top: 0; color: #9b451c; font-size: 15px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">Statement of Empathy</h3>
          <p style="font-style: italic; color: #504441; font-size: 15px; line-height: 1.6; margin: 0;">"${escapedMessage}"</p>
        </div>

        <div style="background-color: #fff8f5; border: 1px dashed #d4c3be; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
          <h3 style="margin-top: 0; color: #442a22; font-family: 'Source Serif 4', Georgia, serif; font-size: 16px; font-weight: 600;">Personalized AI Ahsaaz Reflection</h3>
          <p style="color: #504441; font-size: 14px; line-height: 1.6; margin: 0;">${escapedReflection}</p>
        </div>

        <div style="text-align: center; border-top: 1px solid #efe6e2; padding-top: 20px; font-size: 12px; color: #827470;">
          <p style="margin: 0 0 4px 0;">This email was automatically triggered by the Project Ahsaaz Platform.</p>
          <p style="margin: 0;">Built with Human Dignity &bull; Dedicated to Hunger & Isolation Relief</p>
        </div>
      </div>
    `;

    let emailSent = false;
    let emailError = "";

    // 4. Send Email via Nodemailer
    try {
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
      const smtpPort = parseInt(process.env.SMTP_PORT || "587");

      if (smtpUser && smtpPass) {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Project Ahsaaz" <${smtpUser}>`,
          to: recipientEmail,
          subject: subject,
          html: htmlContent,
        });

        emailSent = true;
        console.log(`[Email Success] Real email successfully sent to ${recipientEmail} for user ${email}`);
      } else {
        emailError = "SMTP credentials not provided in .env (SMTP_USER and SMTP_PASS are missing). Running in high-fidelity sandbox mode.";
        console.log("-----------------------------------------");
        console.log(`[EMULATED EMAIL TRANSMISSION]`);
        console.log(`To: ${recipientEmail}`);
        console.log(`Subject: ${subject}`);
        console.log(`Body:\n${htmlContent}`);
        console.log("-----------------------------------------");
      }
    } catch (err: any) {
      console.error("Nodemailer failed to transmit email:", err);
      emailError = err.message || "Failed to transmit message through active SMTP transporter.";
    }

    // Save copy to sent emails for developer preview UI
    const sentEmails = readSentEmails();
    sentEmails.unshift({
      id: Date.now().toString(),
      to: recipientEmail,
      subject,
      html: htmlContent,
      timestamp,
      sentSuccessfully: emailSent,
      errorMsg: emailError,
    });
    writeSentEmails(sentEmails.slice(0, 50)); // Keep last 50 emails

    res.json({
      success: true,
      emailSent,
      emailError,
      recipient: recipientEmail,
      signup: { name, message: signupMsg, reflection, timestamp }, // exclude email here too
      reflection,
    });
  });

  // Vite development / production configuration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log("=========================================================================");
    console.log(`[Project Ahsaaz Server] Running beautifully on http://localhost:${PORT}`);
    console.log(`[SECURITY] Developer Token: sarthakbhatsamosachutni2011,2001`);
    console.log(`[SECURITY] Use this token to authenticate in the Developer Portal.`);
    console.log("=========================================================================");
  });
}

startServer().catch((err) => {
  console.error("Error starting full-stack server:", err);
});
