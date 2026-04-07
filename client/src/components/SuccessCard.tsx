import { useRef } from "react";
import { FiLink, FiCopy, FiCheck, FiDownload } from "react-icons/fi";
import { QRCodeCanvas } from "qrcode.react";

interface SuccessCardProps {
  shortUrl: string;
  copyToClipboard: () => void;
  isCopied: boolean;
}

export function SuccessCard({
  shortUrl,
  copyToClipboard,
  isCopied,
}: SuccessCardProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `qrcode-${shortUrl.split("/").pop()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="mt-6 bg-gradient-to-r from-emerald-50/50 to-emerald-100/50 rounded-2xl border border-emerald-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-2xl mx-auto shadow-sm">
      {/* Header Segment */}
      <div className="flex items-center gap-2 px-5 pt-4 pb-3">
        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
          <FiCheck className="w-3 h-3 text-white" strokeWidth={4} />
        </div>
        <span className="text-sm font-semibold text-emerald-900">Your link is ready!</span>
      </div>

      {/* Main Body Segment */}
      <div className="flex items-stretch gap-0 px-4 pb-4">
        {/* Left Action Area */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          {/* Link Display Box */}
          <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 border border-emerald-100 shadow-sm group/input transition-all hover:border-emerald-300">
            <FiLink className="text-emerald-500 shrink-0 w-4 h-4" />
            <span className="font-mono text-sm font-semibold text-emerald-700 flex-1 truncate select-all">
              {shortUrl}
            </span>
          </div>

          {/* Action Buttons Group */}
          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all duration-200 transform active:scale-95 ${
                isCopied
                  ? "bg-emerald-200 text-emerald-800 shadow-inner"
                  : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/10"
              }`}
            >
              {isCopied ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
              {isCopied ? "Copied" : "Copy link"}
            </button>
            <button
              onClick={downloadQR}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition-all duration-200 shadow-sm"
            >
              <FiDownload className="w-4 h-4" />
              Download QR
            </button>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-px bg-emerald-200/50 mx-4 self-stretch hidden sm:block"></div>

        {/* Right QR Visualization Area */}
        <div className="shrink-0 flex items-center justify-center hidden sm:flex">
          <div
            className="p-1.5 rounded-xl bg-white border-2 border-emerald-100 shadow-sm animate-in zoom-in-75 duration-700 delay-300 fill-mode-both"
            ref={qrRef}
          >
            <QRCodeCanvas 
              value={shortUrl} 
              size={80} 
              level="H" 
              className="rounded-md" 
            />
          </div>
        </div>
      </div>
      
      {/* Optional Metadata Row */}
      {/* <div className="bg-emerald-500/5 px-5 py-2 border-t border-emerald-100/50">
         <p className="text-[9px] uppercase tracking-widest font-bold text-emerald-800/40 text-center sm:text-left">
           Instant URL Shortening <span className="mx-1">•</span> No registration required
         </p>
      </div> */}
    </div>
  );
}
