import { useState } from "react";
import { FiLink, FiArrowRight, FiCopy, FiCheck } from "react-icons/fi";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    setError(null);
    setShortUrl(null);
    setIsCopied(false);

    try {
      const baseUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

      const response = await fetch(`${baseUrl}/api/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to shorten URL");
      }

      setShortUrl(result.data.short_url);
      setUrl(""); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  return (
    <div className="bg-surface grid-bg font-sans text-on-surface h-screen overflow-hidden flex flex-col relative w-full">
      <main className="min-h-screen pt-32 pb-20 px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-96 h-full flex-1">
        {/* Left Side: Content */}
        <div className="flex-3 shrink-0 space-y-8 z-10 w-full px-4 md:px-0">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-on-surface leading-tight md:leading-[1.1]">
              Shorten links.
              <br />
              <span className="text-primary bg-clip-text">Amplify reach.</span>
            </h1>
            <p className="text-slate-500 text-base md:text-lg max-w-4xl leading-relaxed font-medium">
              Transform complex URLs into sleek, trackable assets designed for
              modern digital architectures.
            </p>
          </div>

          <div className="relative group w-full max-w-4xl pt-4">
            <form
              onSubmit={handleShorten}
              className="flex flex-col sm:flex-row items-center bg-surface-container-lowest sm:rounded-full rounded-2xl p-2 shadow-[0_8px_32px_rgba(79,70,229,0.08)] focus-within:ring-2 focus-within:ring-primary/40 transition-all duration-300 gap-2 sm:gap-0"
            >
              <div className="hidden sm:block pl-4 pr-3 text-outline">
                <FiLink className="w-6 h-6 shrink-0" />
              </div>
              <input
                className="flex-1 w-full bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-outline/60 font-medium px-4 sm:px-2 py-3 sm:py-2 outline-none"
                placeholder="Paste your long link here..."
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={isLoading || !url}
                className="w-full sm:w-auto bg-gradient-to-br from-primary to-[#3430a3] text-on-primary px-8 py-3 rounded-xl sm:rounded-full font-bold flex items-center justify-center gap-2 active:scale-95 transition-all duration-150 shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Wait..." : "Shorten"}
                {!isLoading && <FiArrowRight className="w-5 h-5" />}
              </button>
            </form>
            {error && (
              <div className="mt-4 text-error bg-error-container/40 px-4 py-3 rounded-lg border border-error/20 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}
            
            {/* Success Result Box (Moved beneath input form) */}
            {shortUrl && (
              <div className="mt-6 bg-surface-container-lowest/90 backdrop-blur-xl px-6 py-5 rounded-2xl shadow-[0_8px_32px_rgba(79,70,229,0.08)] border border-outline-variant/30 flex flex-col gap-4 z-20 animate-in slide-in-from-top-4 fade-in duration-500">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white">
                        <FiCheck className="w-3.5 h-3.5" strokeWidth={3} />
                      </div>
                      <span className="font-sans text-sm text-on-surface font-bold">Your link is ready!</span>
                   </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex-1 w-full bg-surface-container-low/50 p-3 rounded-xl border border-outline-variant/20 flex items-center justify-between">
                    <div className="flex items-center gap-2 overflow-hidden">
                       <FiLink className="w-4 h-4 text-primary shrink-0" />
                       <span className="font-mono text-primary font-bold text-sm truncate select-all">{shortUrl}</span>
                    </div>
                  </div>
                  <button 
                    className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-150 ${isCopied ? 'bg-green-100 text-green-700' : 'bg-primary text-on-primary hover:bg-[#3430a3] hover:shadow-lg hover:shadow-primary/20 active:scale-95'}`} 
                    onClick={copyToClipboard}
                  >
                    {isCopied ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
                    {isCopied ? 'Copied!' : 'Copy link'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse"></div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-on-surface-variant font-bold leading-relaxed whitespace-nowrap">
              Zero registration. <span className="text-primary/40 mx-1">/</span> Instant shortening. <span className="text-primary/40 mx-1">/</span> Permanent link access.
            </p>
          </div>
        </div>

        {/* Right Side: Visuals */}
        <div className="hidden md:flex flex-1 relative w-full aspect-square md:aspect-auto items-center justify-center -mt-10 md:mt-0">
          
          {/* Sonar Pulse Ring */}
          <div className="absolute w-80 h-80 rounded-full border-2 border-primary/20 animate-ping opacity-20"></div>
          <div className="absolute w-[400px] h-[400px] rounded-full border border-primary/10 animate-[pulse_4s_ease-in-out_infinite] opacity-10"></div>

          {/* Main 3D Sphere Container */}
          <div className="relative w-72 h-72 lg:w-80 lg:h-80 animate-float flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full drop-shadow-[0_32px_64px_rgba(79,70,229,0.4)]">
              {/* SVG Content (Gradients and Mesh) */}
              <defs>
                <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#818CF8" />
                  <stop offset="40%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#1E1B4B" />
                </radialGradient>
                <radialGradient id="surfaceGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
              </defs>
              
              <circle cx="100" cy="100" r="90" fill="url(#sphereGrad)" />
              <ellipse cx="100" cy="100" rx="40" ry="90" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
              <ellipse cx="100" cy="100" rx="15" ry="90" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.15" />
              <ellipse cx="100" cy="100" rx="90" ry="30" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
              <ellipse cx="100" cy="100" rx="90" ry="10" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.15" />
              <circle cx="100" cy="100" r="90" fill="url(#surfaceGlow)" />
            </svg>

            {/* Centered Link Icon (via react-icons — no FOUT) */}
            <div className="text-white/40 drop-shadow-2xl z-10 select-none pointer-events-none scale-[4] lg:scale-[5]">
               <FiLink strokeWidth={1} />
            </div>

            {/* Permanent Floating Mockup Card (Top Right) */}
            <div className="absolute -top-12 -right-16 bg-white/90 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-[0_32px_64px_rgba(79,70,229,0.15)] border border-white flex flex-col gap-2 z-20 transform rotate-6 hover:rotate-0 transition-all duration-700 animate-[float_7s_ease-in-out_infinite_-1s]">
              <div className="flex items-center gap-2">
                 <div className="flex bg-primary/10 text-primary p-1 rounded-md">
                    <FiLink className="w-3 h-3" strokeWidth={3} />
                 </div>
                 <span className="font-mono text-primary font-bold text-[10px] tracking-wide">s.pachara.app/qwerty</span>
              </div>
            </div>
          </div>
          
          {/* Floating QR Code (Bottom Left - more distance) */}
          <div className="absolute -bottom-8 -left-12 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-[0_32px_64px_rgba(79,70,229,0.15)] z-20 transform -rotate-12 hover:rotate-0 transition-all duration-700 border border-white animate-[float_8s_ease-in-out_infinite_-3s]">
            <div className="w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center p-1.5 opacity-90">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-primary">
                {/* QR Finder Patterns (The 3 big squares) */}
                <path d="M0,0 h30 v30 h-30 v-30 z M5,5 v20 h20 v-20 h-20 z M10,10 h10 v10 h-10 v-10 z" />
                <path d="M70,0 h30 v30 h-30 v-30 z M75,5 v20 h20 v-20 h-20 z M80,10 h10 v10 h-10 v-10 z" />
                <path d="M0,70 h30 v30 h-30 v-30 z M5,75 v20 h20 v-20 h-20 z M10,80 h10 v10 h-10 v-10 z" />
                
                {/* Random Data Blocks (to make it look real but un-scannable) */}
                <rect x="40" y="0" width="10" height="10" />
                <rect x="55" y="0" width="10" height="10" />
                <rect x="40" y="20" width="10" height="10" />
                <rect x="0" y="40" width="10" height="10" />
                <rect x="20" y="40" width="10" height="10" />
                <rect x="50" y="50" width="15" height="15" />
                <rect x="75" y="45" width="10" height="10" />
                <rect x="75" y="65" width="10" height="10" />
                <rect x="50" y="80" width="10" height="10" />
                <rect x="85" y="85" width="15" height="15" />
              </svg>
            </div>
            <div className="mt-2 text-center">
              <span className="font-mono text-[8px] uppercase tracking-widest text-outline font-bold">QR Code</span>
            </div>
          </div>

          {/* Decorative Mesh Grid Element */}
          <div className="absolute inset-0 -z-10 opacity-40 blur-[100px] bg-primary/20 rounded-full w-full h-full scale-[1.3]"></div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full absolute bottom-0 left-0 py-8 pointer-events-none z-10">
        <div className="max-w-7xl mx-auto px-8 flex justify-center items-center text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
            © 2026 Developed by Pachara Nokroy.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
