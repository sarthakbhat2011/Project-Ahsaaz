import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Mail, CheckCircle2, AlertCircle, Eye, EyeOff, RefreshCw, Layers } from 'lucide-react';
import { SentEmail } from '../types';

export default function ServerMonitor() {
  const [emails, setEmails] = useState<SentEmail[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<SentEmail | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const devToken = localStorage.getItem('project_ahsaaz_dev_token');
      const response = await fetch('/api/sent-emails', {
        headers: {
          'Authorization': `Bearer ${devToken || ''}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setEmails(data);
      }
    } catch (err) {
      console.error("Error fetching emails from server monitor:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
    const interval = setInterval(fetchEmails, 8000); // Poll every 8s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {!expanded ? (
          <motion.button
            layoutId="monitor-panel"
            onClick={() => setExpanded(true)}
            className="bg-[#34302c] text-white hover:bg-[#442a22] px-4 py-3 rounded-full flex items-center gap-2 shadow-xl border border-white/10 text-xs font-mono tracking-wider uppercase cursor-pointer"
          >
            <Terminal size={14} className="text-[#fe9162]" />
            <span>Developer Mailbox &amp; Server Monitor ({emails.length})</span>
          </motion.button>
        ) : (
          <motion.div
            layoutId="monitor-panel"
            className="bg-[#1e1b18] text-[#fff8f5] w-[340px] md:w-[480px] h-[550px] rounded-3xl border border-white/15 shadow-2xl p-6 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Terminal className="text-[#fe9162] animate-pulse" size={18} />
                <div>
                  <h4 className="font-mono text-xs font-bold text-white tracking-wider uppercase">SMTP &amp; API Monitor</h4>
                  <p className="text-[10px] text-[#827470]">Tracking sarthakbhat2011@gmail.com triggers</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchEmails}
                  disabled={loading}
                  className="p-1 rounded-md hover:bg-white/5 text-[#827470] hover:text-white transition-all cursor-pointer"
                  title="Sync server logs"
                >
                  <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                </button>
                <button
                  onClick={() => {
                    setExpanded(false);
                    setSelectedEmail(null);
                  }}
                  className="p-1 rounded-md hover:bg-white/5 text-[#827470] hover:text-white font-mono text-xs cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* Email List or Detailed view */}
            <div className="flex-grow my-4 overflow-y-auto pr-1">
              <AnimatePresence mode="wait">
                {!selectedEmail ? (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    {emails.length === 0 ? (
                      <div className="text-center py-12 space-y-3">
                        <Mail className="mx-auto text-white/20" size={36} />
                        <p className="text-xs text-[#827470] max-w-[240px] mx-auto leading-relaxed">
                          No registrations triggered yet. Once a volunteer signs up via the form, the real-time email dispatch records will populate here.
                        </p>
                      </div>
                    ) : (
                      emails.map((email) => (
                        <div
                          key={email.id}
                          onClick={() => setSelectedEmail(email)}
                          className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-white/10 cursor-pointer transition-all flex justify-between items-start"
                        >
                          <div className="space-y-1 max-w-[70%]">
                            <p className="font-serif text-sm text-white line-clamp-1">{email.subject}</p>
                            <p className="text-[10px] font-mono text-[#827470]">To: {email.to}</p>
                            <p className="text-[9px] font-mono text-[#827470]/60">{new Date(email.timestamp).toLocaleString()}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {email.sentSuccessfully ? (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-mono">
                                <CheckCircle2 size={10} />
                                <span>SMTP_OK</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#fe9162]/10 text-[#fe9162] text-[9px] font-mono" title={email.errorMsg}>
                                <AlertCircle size={10} />
                                <span>EMULATED</span>
                              </span>
                            )}
                            <span className="text-[10px] font-mono text-[#fe9162] hover:underline flex items-center gap-1">
                              <Eye size={10} />
                              <span>Inspect HTML</span>
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4 h-full flex flex-col"
                  >
                    <button
                      onClick={() => setSelectedEmail(null)}
                      className="text-xs font-mono text-[#fe9162] hover:underline self-start cursor-pointer"
                    >
                      ← Back to Mailbox List
                    </button>

                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1.5 text-xs font-mono">
                      <p><span className="text-[#827470]">To:</span> {selectedEmail.to}</p>
                      <p><span className="text-[#827470]">Subject:</span> {selectedEmail.subject}</p>
                      <p><span className="text-[#827470]">Timestamp:</span> {new Date(selectedEmail.timestamp).toLocaleString()}</p>
                      <p>
                        <span className="text-[#827470]">SMTP Status:</span>{' '}
                        {selectedEmail.sentSuccessfully ? (
                          <span className="text-emerald-400">Delivered successfully via authenticated server.</span>
                        ) : (
                          <span className="text-[#fe9162]">Sandbox Emulated. SMTP settings not provided in .env (expected behavior in preview mode).</span>
                        )}
                      </p>
                    </div>

                    {/* HTML Iframe renderer */}
                    <div className="flex-grow border border-white/10 rounded-xl bg-white overflow-hidden h-[220px]">
                      <iframe
                        srcDoc={selectedEmail.html}
                        title="Draft preview"
                        sandbox=""
                        className="w-full h-full border-none"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Details panel */}
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[10px] text-[#827470] leading-relaxed flex items-start gap-2">
              <Layers size={16} className="text-[#fe9162] shrink-0 mt-0.5" />
              <p>
                <strong>Developer Inbox Loop:</strong> Project Ahsaaz automatically packages volunteer credentials, coordinates, and custom Gemini-generated reflections into an HTML email template and routes it to <strong>sarthakbhat2011@gmail.com</strong>.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
