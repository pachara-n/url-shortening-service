import { useRef } from "react";
import { FiLink, FiCopy, FiCheck, FiDownload } from "react-icons/fi";
import { QRCodeCanvas } from "qrcode.react";

interface SuccessCardProps {
  shortUrl: string;
  copyToClipboard: () => void;
  isCopied: boolean;
}

export function SuccessCard({ shortUrl, copyToClipboard, isCopied }: SuccessCardProps) {
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
    <div className="mt-8 bg-surface-container-lowest/80 backdrop-blur-3xl px-6 py-6 rounded-[2.5rem] shadow-[0_32px_64px_rgba(5,150,105,0.12)] border border-outline-variant/20 flex flex-col sm:flex-row items-center gap-8 animate-in slide-in-from-top-6 fade-in duration-700 relative overflow-hidden group">
      {/* Glow highlight */}
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary/10 rounded-full blur-[60px]"></div>
      
      {/* Left Content: Info & Buttons */}
      <div className="flex-1 flex flex-col gap-5 w-full z-10">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-on-primary">
            <FiCheck className="w-3.5 h-3.5" strokeWidth={4} />
          </div>
          <span className="text-sm font-bold text-on-surface">Your link is ready!</span>
        </div>

        <div className="bg-surface p-1 rounded-2xl border border-outline-variant/10 flex items-center justify-between overflow-hidden shadow-inner group/input">
           <div className="p-3 text-primary/40 bg-surface-container-low rounded-xl ml-1">
             <FiLink className="w-4 h-4" />
           </div>
           <span className="flex-1 font-mono text-primary font-bold text-sm truncate px-4 select-all">
             {shortUrl}
           </span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3 w-full">
          <button 
            onClick={copyToClipboard}
            className={`flex-1 w-full px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2.5 transition-all duration-300 transform active:scale-95 shadow-lg ${
              isCopied 
                ? 'bg-[#A7F3D0] text-[#064E3B] shadow-emerald-200' // เขียวอ่อนแบบ Wrapp เมื่่อ Copy แล้ว
                : 'bg-primary text-on-primary hover:bg-primary/90 shadow-primary/20'
            }`}
          >
            {isCopied ? <FiCheck className="w-5 h-5 animate-in zoom-in" /> : <FiCopy className="w-5 h-5" />}
            {isCopied ? 'Copied!' : 'Copy link'}
          </button>

          <button 
            onClick={downloadQR}
            className="flex-1 w-full px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2.5 border-2 border-on-surface/5 hover:bg-on-surface/[0.03] transition-all transform active:scale-95 text-on-surface"
          >
            <FiDownload className="w-5 h-5" />
            Download QR
          </button>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="hidden sm:block w-[1.5px] h-32 bg-outline-variant/10 shrink-0"></div>

      {/* Right Content: QR Code */}
      <div className="w-full sm:w-auto p-4 bg-white rounded-3xl border border-outline-variant/10 shadow-sm transition-transform duration-500 hover:scale-105 z-10" ref={qrRef}>
        <QRCodeCanvas
          value={shortUrl}
          size={120}
          level={"H"}
          includeMargin={false}
          imageSettings={{
            src: "",
            x: undefined,
            y: undefined,
            height: 24,
            width: 24,
            excavate: true,
          }}
          className="rounded-lg"
        />
      </div>

      <div className="absolute bottom-4 left-6">
         <p className="text-[10px] text-outline/40 font-mono font-bold tracking-tighter uppercase">
            No registration required <span className="mx-1">•</span> 100% Free
         </p>
      </div>
    </div>
  );
}
