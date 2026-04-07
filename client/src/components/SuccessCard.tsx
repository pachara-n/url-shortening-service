import { FiLink, FiCopy, FiCheck } from "react-icons/fi";

interface SuccessCardProps {
  shortUrl: string;
  copyToClipboard: () => void;
  isCopied: boolean;
}

export function SuccessCard({ shortUrl, copyToClipboard, isCopied }: SuccessCardProps) {
  return (
    <div className="mt-8 bg-surface-container-lowest/95 backdrop-blur-xl px-6 py-5 rounded-2xl shadow-[0_24px_48px_rgba(79,70,229,0.1)] border border-primary/20 flex flex-col gap-4 animate-in slide-in-from-top-4 fade-in duration-500">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30">
          <FiCheck className="w-3 h-3" strokeWidth={4} />
        </div>
        <span className="text-sm font-bold text-on-surface">Your link is ready!</span>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 w-full bg-surface-container-low/50 p-3.5 rounded-xl border border-outline-variant/10 flex items-center justify-between overflow-hidden">
          <span className="font-mono text-primary font-bold text-sm truncate select-all px-2">{shortUrl}</span>
          <FiLink className="w-4 h-4 text-primary/30 shrink-0" />
        </div>
        <button 
          onClick={copyToClipboard}
          className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isCopied ? 'bg-green-100 text-green-700' : 'bg-primary text-on-primary hover:bg-[#3430a3]'}`}
        >
          {isCopied ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
          {isCopied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
