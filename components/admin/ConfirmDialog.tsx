'use client';

export default function ConfirmDialog({
  open = true,
  title,
  message,
  onConfirm,
  onCancel,
}: {
  open?: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 bg-brand-secondary border border-brand-border/80 rounded-2xl shadow-2xl space-y-4">
        <h3 className="text-sm font-black uppercase tracking-wider text-white">{title}</h3>
        <p className="text-sm text-brand-muted leading-relaxed">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 border border-brand-border text-brand-muted hover:text-white font-mono text-xs rounded-xl cursor-pointer transition-colors"
          >
            CANCEL
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 bg-red-500 text-white font-bold text-xs rounded-xl hover:bg-red-600 cursor-pointer transition-colors shadow-lg"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
