import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const PORT = parseInt(process.env.PORT || "3000");
const DATA_DIR = path.join(process.cwd(), "data");
const SIGNUPS_FILE = path.join(DATA_DIR, "signups.json");
const EMAILS_FILE = path.join(DATA_DIR, "sent_emails.json");
const CONTEMPLATIONS_FILE = path.join(DATA_DIR, "contemplations.json");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to read/write contemplations
function readContemplations() {
  if (!fs.existsSync(CONTEMPLATIONS_FILE)) {
    const defaults = [
      {
        id: "default-1",
        text: "Listening is not waiting for your turn to talk; it is giving up your internal agenda to be with another.",
        username: "Ahsaaz Companion",
        authorId: "system",
        createdAt: new Date().toISOString()
      },
      {
        id: "default-2",
        text: "A fine china plate represents equality. Pity serves in paper cups; empathy serves on ceramics.",
        username: "Ahsaaz Companion",
        authorId: "system",
        createdAt: new Date().toISOString()
      }
    ];
    writeContemplations(defaults);
    return defaults;
  }
  try {
    const data = fs.readFileSync(CONTEMPLATIONS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading contemplations:", err);
    return [];
  }
}

function writeContemplations(data: any[]) {
  try {
    fs.writeFileSync(CONTEMPLATIONS_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing contemplations:", err);
  }
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
const DEV_TOKEN = process.env.DEV_TOKEN || "ahsaazdev123";

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

  // API Route: Get all recent signups (Public: email address and private messages stripped for privacy)
  app.get("/api/signups", (req, res) => {
    const signups = readSignups();
    const publicSignups = signups.map(({ name, createdAt }: any) => ({ name, createdAt }));
    res.json(publicSignups);
  });

  // API Routes for Contemplation Starboard
  app.get("/api/contemplations", (req, res) => {
    const clientAuthorId = req.headers["x-author-id"] as string;
    const list = readContemplations();
    const publicList = list.map((item: any) => ({
      id: item.id,
      text: item.text,
      username: item.username,
      createdAt: item.createdAt,
      isAuthor: clientAuthorId ? item.authorId === clientAuthorId : false
    }));
    res.json(publicList);
  });

  app.post("/api/contemplations", csrfCheck, rateLimiter, (req, res) => {
    const { text, username, authorId } = req.body;
    if (!text || !username || !authorId) {
      return res.status(400).json({ error: "Text, username, and authorId are required." });
    }
    const list = readContemplations();
    const newEntry = {
      id: Date.now().toString(),
      text: text.trim(),
      username: username.trim(),
      authorId,
      createdAt: new Date().toISOString()
    };
    list.unshift(newEntry);
    writeContemplations(list);
    
    // Return with isAuthor: true so the creator can immediately edit/delete
    const clientResponse = {
      id: newEntry.id,
      text: newEntry.text,
      username: newEntry.username,
      createdAt: newEntry.createdAt,
      isAuthor: true
    };
    res.status(201).json(clientResponse);
  });

  app.put("/api/contemplations/:id", csrfCheck, rateLimiter, (req, res) => {
    const { id } = req.params;
    const { text, authorId } = req.body;
    if (!text || !authorId) {
      return res.status(400).json({ error: "Text and authorId are required." });
    }
    const list = readContemplations();
    const index = list.findIndex((item: any) => item.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Contemplation not found." });
    }
    const entry = list[index];
    if (entry.authorId !== authorId) {
      return res.status(403).json({ error: "Forbidden: You are not authorized to edit this contemplation." });
    }
    entry.text = text.trim();
    writeContemplations(list);
    
    res.json({
      id: entry.id,
      text: entry.text,
      username: entry.username,
      createdAt: entry.createdAt,
      isAuthor: true
    });
  });

  app.delete("/api/contemplations/:id", csrfCheck, rateLimiter, (req, res) => {
    const { id } = req.params;
    const { authorId } = req.body;
    if (!authorId) {
      return res.status(400).json({ error: "authorId is required." });
    }
    const list = readContemplations();
    const index = list.findIndex((item: any) => item.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Contemplation not found." });
    }
    const entry = list[index];
    if (entry.authorId !== authorId) {
      return res.status(403).json({ error: "Forbidden: You are not authorized to delete this contemplation." });
    }
    list.splice(index, 1);
    writeContemplations(list);
    res.json({ success: true });
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
    const { name, email, phone, message, ratings } = req.body;

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
A new volunteer applicant has completed their capability assessment.
Name: ${name}
Empathy Message: "${signupMsg}"

Write a short, highly personalized, and deeply moving 2-3 sentence "Ahsaaz Reflection" specifically addressing their message and volunteer spirit. Express deep, soothing gratitude, and reflect on how their specific intent helps heal isolation and hunger. Avoid standard corporate language or robotic greetings. Speak from the heart. Do not use markdown tags, just return the plain text paragraphs.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
        });
        reflection = response.text || "";
      } else {
        reflection = `Thank you, ${name}. Your desire to join Project Ahsaaz stems from a beautiful, deep realization of human connection. By sharing your warmth and addressing hunger with dignity, you are helping to sow a seed of hope that will grow into a sanctuary of support for our community. We are honored to walk this path of true compassion together with you.`;
      }
    } catch (err: any) {
      console.error("Gemini AI Reflection generation error:", err);
      reflection = `Thank you, ${name}. Your message of compassion resonates deeply with Project Ahsaaz. By step-by-step offering food and genuine human listening, you are restoring dignity and showing that empathy is a physical force for good. We welcome your hand in our shared circle of friends.`;
    }

    const timestamp = new Date().toISOString();
    const newSignup = { name, email, message: signupMsg, reflection, timestamp };

    // Save signup
    const signups = readSignups();
    signups.unshift(newSignup);
    writeSignups(signups.slice(0, 100));

    // HTML escape for XSS protection inside email template
    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedPhone = phone ? escapeHtml(phone) : "";
    const escapedMessage = escapeHtml(signupMsg);
    const escapedReflection = escapeHtml(reflection);

    // Process capability ratings (8 questions requested by user)
    const questionsList = [
      { id: 'communication', question: '1. How would you rate your communication skills??' },
      { id: 'outreach', question: '2. How comfortable are you with interacting with new people and approaching them for outreach??' },
      { id: 'initiative', question: '3. How would you rate your ability to take initiative without being constantly instructed??' },
      { id: 'editing', question: '4. How would you rate your editing/content creation skills??' },
      { id: 'speaking', question: '5. How would you rate your public speaking skills??' },
      { id: 'problem_solving', question: '6. How would you rate your problem-solving and time management skills??' },
      { id: 'teamwork', question: '7. How would you rate your ability to work in a team.??' },
      { id: 'caregiving', question: '8. How would you rate your ability to interact with children/elderly people.??' }
    ];

    let totalScore = 0;
    let validCount = 0;

    const formattedRatings = questionsList.map(q => {
      const val = (ratings && typeof ratings[q.id] === 'number') ? ratings[q.id] : 7;
      totalScore += val;
      validCount++;
      const pct = val * 10;
      let badge = 'Proficient';
      let badgeBg = '#047857';
      if (val >= 9) { badge = 'Exemplary / Leader'; badgeBg = '#9b451c'; }
      else if (val >= 7) { badge = 'Proficient'; badgeBg = '#047857'; }
      else if (val >= 4) { badge = 'Competent'; badgeBg = '#d97706'; }
      else { badge = 'Developing'; badgeBg = '#6b7280'; }

      return {
        question: q.question,
        score: val,
        pct,
        badge,
        badgeBg
      };
    });

    const overallAvg = validCount > 0 ? (totalScore / validCount).toFixed(1) : "7.5";
    const overallPct = Math.round(parseFloat(overallAvg) * 10);

    // 3. Compose the HTML email to developer
    const recipientEmail = "sarthakbhat2011@gmail.com";
    const subject = `[Project Ahsaaz] Volunteer Capability Application: ${escapedName}`;
    const htmlContent = `
      <div style="font-family: 'Inter', sans-serif; background-color: #fff8f5; color: #1e1b18; padding: 16px; border-radius: 16px; max-width: 100%; box-sizing: border-box; margin: 0 auto; border: 1px solid #e9e1dc; box-shadow: 0 10px 30px rgba(68, 42, 34, 0.05); word-break: break-all; overflow-wrap: anywhere;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="font-family: 'Source Serif 4', Georgia, serif; color: #442a22; margin: 0 0 6px 0; font-size: 24px; font-weight: 700; letter-spacing: -0.01em;">Project Ahsaaz</h1>
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #9b451c; margin: 0; font-weight: 600;">Volunteer Assessment &bull; Capability Matrix Log</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 16px; border-radius: 12px; margin-bottom: 16px; border: 1px solid rgba(130, 116, 112, 0.15); box-sizing: border-box; max-width: 100%;">
          <h2 style="font-family: 'Source Serif 4', Georgia, serif; color: #442a22; margin-top: 0; margin-bottom: 12px; font-size: 18px; border-bottom: 2px solid #9b451c; padding-bottom: 6px;">Volunteer Applicant Profile</h2>
          
          <table style="width: 100%; border-collapse: collapse; table-layout: fixed; word-break: break-all; overflow-wrap: anywhere; margin-bottom: 16px;">
            <tr>
              <td style="padding: 6px 0; font-weight: 600; color: #504441; font-size: 13px; width: 35%;">Full Name:</td>
              <td style="padding: 6px 0; color: #1e1b18; font-size: 13px; width: 65%; font-weight: 700;">${escapedName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600; color: #504441; font-size: 13px;">Email Address:</td>
              <td style="padding: 6px 0; color: #1e1b18; font-size: 13px;"><a href="mailto:${escapedEmail}" style="color: #9b451c; text-decoration: none;">${escapedEmail}</a></td>
            </tr>
            ${escapedPhone ? `
            <tr>
              <td style="padding: 6px 0; font-weight: 600; color: #504441; font-size: 13px;">Phone / WhatsApp:</td>
              <td style="padding: 6px 0; color: #1e1b18; font-size: 13px;">${escapedPhone}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 6px 0; font-weight: 600; color: #504441; font-size: 13px;">Registered at:</td>
              <td style="padding: 6px 0; color: #1e1b18; font-size: 13px;">${new Date(timestamp).toLocaleString()}</td>
            </tr>
          </table>

          <div style="background-color: #fbf2ed; border: 1px solid #ffdbce; padding: 12px 16px; border-radius: 10px; margin-bottom: 16px; text-align: center;">
            <span style="font-size: 11px; font-weight: 700; color: #9b451c; text-transform: uppercase; letter-spacing: 0.08em;">Overall Candidate Capability Index</span>
            <div style="font-size: 22px; font-weight: 800; color: #442a22; margin: 4px 0;">${overallAvg} / 10 <span style="font-size: 13px; color: #9b451c;">(${overallPct}%)</span></div>
          </div>

          <h3 style="font-family: 'Source Serif 4', Georgia, serif; color: #442a22; font-size: 15px; margin: 16px 0 10px 0;">Volunteer Capability Rating Matrix (8 Questions)</h3>
          
          <table style="width: 100%; border-collapse: collapse; table-layout: fixed; word-break: break-all; font-size: 12px;">
            <thead>
              <tr style="background-color: #fff8f5; border-bottom: 1px solid #e9e1dc; text-align: left;">
                <th style="padding: 8px 4px; color: #442a22; width: 45%;">Assessment Question</th>
                <th style="padding: 8px 4px; color: #442a22; width: 20%; text-align: center;">Rating</th>
                <th style="padding: 8px 4px; color: #442a22; width: 35%;">Visual Capability Meter</th>
              </tr>
            </thead>
            <tbody>
              ${formattedRatings.map(r => `
                <tr style="border-bottom: 1px solid #f5ece7;">
                  <td style="padding: 8px 4px; color: #504441; font-weight: 500; font-size: 11px; word-break: break-words;">${escapeHtml(r.question)}</td>
                  <td style="padding: 8px 4px; text-align: center; font-weight: 700; color: #442a22;">
                    <span style="background-color: ${r.badgeBg}; color: #ffffff; padding: 2px 6px; border-radius: 8px; font-size: 10px; font-weight: 700; display: inline-block;">${r.score}/10</span>
                  </td>
                  <td style="padding: 8px 4px;">
                    <div style="background-color: #e9e1dc; height: 10px; border-radius: 5px; overflow: hidden; width: 100%;">
                      <div style="background-color: #9b451c; width: ${r.pct}%; height: 100%; border-radius: 5px;"></div>
                    </div>
                    <span style="font-size: 9px; color: #827470; margin-top: 2px; display: block;">${r.badge} (${r.pct}%)</span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div style="background-color: #fbf2ed; padding: 16px; border-radius: 12px; margin-bottom: 16px; border-left: 4px solid #9b451c; box-sizing: border-box;">
          <h3 style="margin-top: 0; color: #9b451c; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">Statement of Empathy</h3>
          <p style="font-style: italic; color: #504441; font-size: 13px; line-height: 1.5; margin: 0; word-break: break-words;">"${escapedMessage}"</p>
        </div>

        <div style="background-color: #fff8f5; border: 1px dashed #d4c3be; padding: 16px; border-radius: 12px; margin-bottom: 16px; box-sizing: border-box;">
          <h3 style="margin-top: 0; color: #442a22; font-family: 'Source Serif 4', Georgia, serif; font-size: 15px; font-weight: 600;">Personalized AI Ahsaaz Reflection</h3>
          <p style="color: #504441; font-size: 13px; line-height: 1.5; margin: 0; word-break: break-words;">${escapedReflection}</p>
        </div>

        <div style="text-align: center; border-top: 1px solid #efe6e2; padding-top: 16px; font-size: 11px; color: #827470;">
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
        console.log(`[Developer Inbox Simulator] Email to ${recipientEmail}:`);
        console.log(`Subject: ${subject}`);
        console.log("-----------------------------------------");
      }
    } catch (err: any) {
      console.error("Nodemailer transmission error:", err);
      emailError = err.message || "Failed to transmit via SMTP server.";
    }

    // 5. Store sent email in sent-emails log (Developer Monitor)
    const sentEmails = readSentEmails();
    sentEmails.unshift({
      id: "email-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
      to: recipientEmail,
      subject: subject,
      html: htmlContent,
      timestamp: timestamp,
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

  // API Route: Handle Dignity Plate Sanitized Meal Registration
  app.post("/api/plate-signup", csrfCheck, rateLimiter, async (req, res) => {
    const { name, grain, stew, blessing } = req.body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({ error: "Sponsor / Volunteer Name is required." });
    }

    const escapedName = escapeHtml(name.trim());
    const escapedGrain = escapeHtml(grain || "Aromatic Basmati Rice");
    const escapedStew = escapeHtml(stew || "Traditional Yellow Lentil Dal");
    const escapedBlessing = escapeHtml(blessing || "Dignity is your eternal birthright.");
    const timestamp = new Date().toISOString();

    const recipientEmail = "sarthakbhat2011@gmail.com";
    const subject = `[Project Ahsaaz] Dignity Plate Meal Sanitized: ${escapedName}`;

    const htmlContent = `
      <div style="font-family: 'Inter', sans-serif; background-color: #fff8f5; color: #1e1b18; padding: 16px; border-radius: 16px; max-width: 100%; box-sizing: border-box; margin: 0 auto; border: 1px solid #e9e1dc; box-shadow: 0 10px 30px rgba(68, 42, 34, 0.05); word-break: break-all; overflow-wrap: anywhere;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="font-family: 'Source Serif 4', Georgia, serif; color: #442a22; margin: 0 0 6px 0; font-size: 24px; font-weight: 700; letter-spacing: -0.01em;">Project Ahsaaz</h1>
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #9b451c; margin: 0; font-weight: 600;">Dignity Plate Meal Registration &bull; Sourcing Simulator</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 16px; border-radius: 12px; margin-bottom: 16px; border: 1px solid rgba(130, 116, 112, 0.15); box-sizing: border-box; max-width: 100%;">
          <h2 style="font-family: 'Source Serif 4', Georgia, serif; color: #442a22; margin-top: 0; margin-bottom: 12px; font-size: 18px; border-bottom: 1px solid #f5ece7; padding-bottom: 6px;">Dignity Plate Customization Log</h2>
          
          <table style="width: 100%; border-collapse: collapse; table-layout: fixed; word-break: break-all; overflow-wrap: anywhere;">
            <tr>
              <td style="padding: 6px 0; font-weight: 600; color: #504441; font-size: 13px; width: 35%; word-break: break-all;">Volunteer/Sponsor:</td>
              <td style="padding: 6px 0; color: #1e1b18; font-size: 13px; width: 65%; word-break: break-all; font-weight: 700;">${escapedName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600; color: #504441; font-size: 13px;">Grain Base:</td>
              <td style="padding: 6px 0; color: #1e1b18; font-size: 13px; word-break: break-all;">${escapedGrain}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600; color: #504441; font-size: 13px;">Entrée Choice:</td>
              <td style="padding: 6px 0; color: #1e1b18; font-size: 13px; word-break: break-all;">${escapedStew}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600; color: #504441; font-size: 13px;">Stenciled Note:</td>
              <td style="padding: 6px 0; color: #9b451c; font-size: 13px; font-style: italic; word-break: break-words;">"${escapedBlessing}"</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600; color: #504441; font-size: 13px;">Packed & Sanitized At:</td>
              <td style="padding: 6px 0; color: #1e1b18; font-size: 13px; word-break: break-all;">${new Date(timestamp).toLocaleString()}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #fbf2ed; padding: 16px; border-radius: 12px; margin-bottom: 16px; border-left: 4px solid #9b451c; box-sizing: border-box;">
          <h3 style="margin-top: 0; color: #9b451c; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">Status</h3>
          <p style="color: #504441; font-size: 13px; margin: 0;">Meal packed in eco-friendly earthenware kit and dispatched for local elder delivery queue.</p>
        </div>

        <div style="text-align: center; border-top: 1px solid #efe6e2; padding-top: 16px; font-size: 11px; color: #827470;">
          <p style="margin: 0 0 4px 0;">This registration was recorded by the Developer Inbox Loop.</p>
          <p style="margin: 0;">Project Ahsaaz &bull; Unhurried Companioning & Meal Logistics</p>
        </div>
      </div>
    `;

    let emailSent = false;
    let emailError = "";

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
          auth: { user: smtpUser, pass: smtpPass },
        });

        await transporter.sendMail({
          from: `"Project Ahsaaz" <${smtpUser}>`,
          to: recipientEmail,
          subject: subject,
          html: htmlContent,
        });
        emailSent = true;
      } else {
        emailError = "Sandbox Emulated mode (SMTP credentials not in .env). Logged to developer mailbox.";
      }
    } catch (err: any) {
      emailError = err.message || "Failed to transmit via SMTP.";
    }

    const sentEmails = readSentEmails();
    sentEmails.unshift({
      id: "plate-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
      to: recipientEmail,
      subject: subject,
      html: htmlContent,
      timestamp: timestamp,
      sentSuccessfully: emailSent,
      errorMsg: emailError,
    });
    writeSentEmails(sentEmails.slice(0, 50));

    res.json({ success: true, name: escapedName });
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
    console.log(`[SECURITY] Developer Portal is active. Authentication token is loaded locally.`);
    console.log("=========================================================================");
  });
}

startServer().catch((err) => {
  console.error("Error starting full-stack server:", err);
});
