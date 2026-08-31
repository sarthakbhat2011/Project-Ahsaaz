import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Mail, CheckCircle2, AlertCircle, Eye, RefreshCw, Layers, Trash2 } from 'lucide-react';
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

  const handleDeleteEmail = async (emailId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this mail log from the Developer Mailbox?")) return;
    try {
      const devToken = localStorage.getItem('project_ahsaaz_dev_token');
      const response = await fetch(`/api/sent-emails/${encodeURIComponent(emailId)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${devToken || ''}`
        }
      });
      if (response.ok) {
        setEmails(prev => prev.filter(item => item.id !== emailId));
        if (selectedEmail?.id === emailId) {
          setSelectedEmail(null);
        }
      }
    } catch (err) {
      console.error("Error deleting sent email:", err);
    }
  };

  useEffect(() => {
    fetchEmails();
    const interval = setInterval(fetchEmails, 8000); // Poll every 8s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-3 right-3 left-3 sm:left-auto sm:right-6 sm:bottom-6 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {!expanded ? (
          <motion.button
            layoutId="monitor-panel"
            onClick={() => setExpanded(true)}
            className="pointer-events-auto bg-[#34302c] text-white hover:bg-[#442a22] px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full flex items-center gap-2 shadow-xl border border-white/10 text-[10px] sm:text-xs font-mono tracking-wider uppercase cursor-pointer max-w-full"
          >
            <Terminal size={14} className="text-[#fe9162] shrink-0" />
            <span className="truncate">Developer Mailbox &amp; Server Monitor ({emails.length})</span>
          </motion.button>
        ) : (
          <motion.div
            layoutId="monitor-panel"
            className="pointer-events-auto bg-[#1e1b18] text-[#fff8f5] w-full max-w-[calc(100vw-24px)] sm:w-[480px] h-[85vh] max-h-[580px] sm:h-[550px] rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl p-3.5 sm:p-6 flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-3 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <Terminal className="text-[#fe9162] animate-pulse shrink-0" size={18} />
                <div>
                  <h4 className="font-mono text-xs font-bold text-white tracking-wider uppercase">SMTP &amp; API Monitor</h4>
                  <p className="text-[10px] text-[#827470]">Tracking contact@projectahsaaz.org triggers</p>
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
            <div className="flex-grow my-3 overflow-y-auto pr-1 max-w-full">
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
                          No registrations triggered yet. Once a volunteer signs up or a meal is sanitized, real-time records populate here.
                        </p>
                      </div>
                    ) : (
                      emails.map((email) => (
                        <div
                          key={email.id}
                          onClick={() => setSelectedEmail(email)}
                          className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-white/10 cursor-pointer transition-all flex justify-between items-start gap-2 group/mail"
                        >
                          <div className="space-y-1 max-w-[68%] min-w-0 overflow-hidden">
                            <p className="font-serif text-xs sm:text-sm text-white truncate">{email.subject}</p>
                            <p className="text-[10px] font-mono text-[#827470] truncate">To: {email.to}</p>
                            <p className="text-[9px] font-mono text-[#827470]/60">{new Date(email.timestamp).toLocaleString()}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1.5 shrink-0">
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
                            <div className="flex items-center gap-2 pt-0.5">
                              <button
                                onClick={(e) => handleDeleteEmail(email.id, e)}
                                className="text-red-400/80 hover:text-red-400 p-0.5 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                                title="Delete mail from Developer Mailbox"
                                type="button"
                              >
                                <Trash2 size={11} />
                              </button>
                              <span className="text-[10px] font-mono text-[#fe9162] hover:underline flex items-center gap-1">
                                <Eye size={10} />
                                <span>Inspect</span>
                              </span>
                            </div>
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
                    className="space-y-3 h-full flex flex-col max-w-full"
                  >
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setSelectedEmail(null)}
                        className="text-xs font-mono text-[#fe9162] hover:underline self-start cursor-pointer shrink-0"
                      >
                        ← Back to Mailbox List
                      </button>

                      <button
                        onClick={() => handleDeleteEmail(selectedEmail.id)}
                        className="text-xs font-mono text-red-400 hover:text-red-300 hover:underline flex items-center gap-1 cursor-pointer shrink-0 bg-red-500/10 px-2 py-0.5 rounded-md border border-red-500/20"
                      >
                        <Trash2 size={11} />
                        <span>Delete Mail</span>
                      </button>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1 text-[11px] font-mono max-w-full overflow-hidden break-all">
                      <p className="break-all"><span className="text-[#827470]">To:</span> {selectedEmail.to}</p>
                      <p className="break-all"><span className="text-[#827470]">Subject:</span> {selectedEmail.subject}</p>
                      <p className="break-all"><span className="text-[#827470]">Timestamp:</span> {new Date(selectedEmail.timestamp).toLocaleString()}</p>
                      <p className="break-words">
                        <span className="text-[#827470]">SMTP Status:</span>{' '}
                        {selectedEmail.sentSuccessfully ? (
                          <span className="text-emerald-400">Delivered successfully via authenticated server.</span>
                        ) : (
                          <span className="text-[#fe9162]">Sandbox Emulated (developer preview log).</span>
                        )}
                      </p>
                    </div>

                    {/* HTML Iframe renderer */}
                    <div className="flex-grow border border-white/10 rounded-xl bg-white overflow-hidden min-h-[180px] max-w-full">
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
            <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 text-[9.5px] sm:text-[10px] text-[#827470] leading-relaxed flex items-start gap-2 shrink-0">
              <Layers size={15} className="text-[#fe9162] shrink-0 mt-0.5" />
              <p className="break-words">
                <strong>Developer Inbox Loop:</strong> Project Ahsaaz packages volunteer &amp; meal registrations into formatted logs routed to <strong>sarthakbhat2011@gmail.com</strong>.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
