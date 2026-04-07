import { FiLink, FiCopy, FiCheck } from "react-icons/fi";

interface SuccessCardProps {
  shortUrl: string;
  copyToClipboard: () => void;
  isCopied: boolean;
}

export function SuccessCard({ shortUrl, copyToClipboard, isCopied }: SuccessCardProps) {
  return (
    <div className="mt-8 bg-white/40 backdrop-blur-2xl px-6 py-5 rounded-3xl shadow-[0_32px_64px_rgba(5,150,105,0.15)] border border-white/60 flex flex-col gap-4 animate-in slide-in-from-top-4 fade-in duration-500 relative overflow-hidden group">
      {/* Decorative Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      <div className="flex items-center gap-2 relative z-10">
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
          className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isCopied ? 'bg-green-100 text-green-700' : 'bg-primary text-on-primary hover:bg-[#064e3b]'}`}
        >
          {isCopied ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
          {isCopied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
