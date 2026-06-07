'use client';

import * as React from 'react';
import { MessageSquare, Mail, Phone, Send, X, Loader2 } from 'lucide-react';

interface Recipient {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface MessageDialogProps {
  open: boolean;
  recipients: Recipient[];
  onClose: () => void;
  onSent: (result: { success: boolean; count: number; channel: string }) => void;
}

type Channel = 'sms' | 'email' | 'whatsapp';

export default function MessageDialog({ open, recipients, onClose, onSent }: MessageDialogProps) {
  const [channel, setChannel] = React.useState<Channel>('sms');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [sending, setSending] = React.useState(false);

  if (!open) return null;

  const isBulk = recipients.length > 1;

  const handleSend = async () => {
    if (!message.trim()) return;
    setSending(true);

    const res = await fetch('/api/communications/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        channel,
        recipients: recipients.map(r => ({ name: r.name, phone: r.phone, email: r.email })),
        subject: channel === 'email' ? subject : undefined,
        message: message.trim(),
      }),
    });

    const data = await res.json();
    setSending(false);
    onSent({ success: data.success, count: data.sentCount || 0, channel });
    setMessage('');
    setSubject('');
  };

  const channels: { id: Channel; label: string; icon: any; desc: string }[] = [
    { id: 'sms', label: 'SMS', icon: MessageSquare, desc: 'Text message via phone number' },
    { id: 'whatsapp', label: 'WhatsApp', icon: Phone, desc: 'WhatsApp message via phone' },
    { id: 'email', label: 'Email', icon: Mail, desc: 'Email via inbox address' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-black/60 backdrop-blur-sm absolute inset-0" />
      <div
        className="relative bg-brand-secondary border border-brand-border/80 rounded-[2rem] w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-brand-border/40">
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-white">
              {isBulk ? `Bulk Message (${recipients.length})` : `Message ${recipients[0]?.name}`}
            </h2>
            <p className="text-[10px] text-brand-muted font-mono mt-0.5">
              {isBulk ? `Sending to ${recipients.length} athletes` : recipients[0]?.phone || recipients[0]?.email}
            </p>
          </div>
          <button onClick={onClose} className="p-2 border border-brand-border rounded-xl text-brand-muted hover:text-white hover:border-white/20 transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div>
            <label className="text-[9px] font-mono font-bold text-brand-muted uppercase tracking-wider block mb-2">Channel</label>
            <div className="grid grid-cols-3 gap-2">
              {channels.map((ch) => {
                const Icon = ch.icon;
                const active = channel === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setChannel(ch.id)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all cursor-pointer ${
                      active
                        ? 'bg-brand-accent/10 border-brand-accent text-brand-accent'
                        : 'bg-brand-primary border-brand-border text-brand-muted hover:text-white hover:border-white/20'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">{ch.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {channel === 'email' && (
            <div>
              <label className="text-[9px] font-mono font-bold text-brand-muted uppercase tracking-wider block mb-2">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Training Schedule Update"
                className="w-full bg-brand-primary border border-brand-border p-3 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
              />
            </div>
          )}

          <div>
            <label className="text-[9px] font-mono font-bold text-brand-muted uppercase tracking-wider block mb-2">Message</label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={channel === 'email' ? 'Write your email message...' : channel === 'whatsapp' ? 'Type WhatsApp message...' : 'Type SMS text...'}
              className="w-full bg-brand-primary border border-brand-border p-3 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors font-sans resize-none"
            />
            <div className="text-right mt-1">
              <span className="text-[9px] font-mono text-brand-muted">{message.length} chars</span>
            </div>
          </div>

          <button
            onClick={handleSend}
            disabled={sending || !message.trim()}
            className="w-full py-3.5 bg-brand-accent text-black font-black uppercase tracking-widest rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[48px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs shadow-lg shadow-brand-accent/10"
          >
            {sending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {sending ? 'SENDING...' : isBulk ? `SEND TO ${recipients.length} ATHLETES` : 'SEND MESSAGE'}
          </button>
        </div>
      </div>
    </div>
  );
}
