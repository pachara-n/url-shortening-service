import { useState } from "react";

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
                <span
                  className="material-symbols-outlined shrink-0"
                  style={{
                    fontVariationSettings:
                      "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  link
                </span>
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
                {!isLoading && (
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontVariationSettings:
                        "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    }}
                  >
                    arrow_forward
                  </span>
                )}
              </button>
            </form>
            {error && (
              <div className="mt-4 text-error bg-error-container/40 px-4 py-3 rounded-lg border border-error/20 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2  ">
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

            {/* Centered Link Icon (Forced Scale) */}
            <span className="material-symbols-outlined text-surface drop-shadow-2xl z-10 opacity-60 scale-[2.2] lg:scale-[2.8] select-none pointer-events-none" style={{ fontVariationSettings: "'wght' 100" }}>
              link
            </span>

            {/* Floating Link Created Popup */}
            {shortUrl && (
              <div className="absolute -top-12 -right-12 bg-surface-container-lowest/90 backdrop-blur-xl px-5 py-4 rounded-2xl shadow-[0_24px_48px_rgba(79,70,229,0.15)] border border-white/40 flex flex-col gap-2 z-10 animate-in zoom-in-50 duration-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-on-surface-variant font-bold">Success!</span>
                </div>
                <div className="flex items-center gap-3 bg-surface-container-low/50 p-2 rounded-lg border border-outline-variant/20">
                  <span className="font-mono text-primary font-bold text-xs select-all">{shortUrl}</span>
                  <button 
                    className={`p-1.5 rounded-md transition-all ${isCopied ? 'bg-green-100 text-green-600' : 'bg-white text-outline hover:text-primary'}`} 
                    onClick={copyToClipboard}
                  >
                    <span className="material-symbols-outlined text-xs">{isCopied ? 'check' : 'content_copy'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Floating QR Code (Bottom Left) */}
          <div className="absolute -bottom-4 left-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-[0_24px_48px_rgba(79,70,229,0.1)] z-10 transform -rotate-6 hover:rotate-0 transition-all duration-500 border border-white">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-on-surface/5 rounded-xl flex items-center justify-center overflow-hidden">
              {shortUrl ? (
                <img alt="QR" className="w-[85%] h-[85%]" src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${shortUrl}&color=4f46e5`} />
              ) : (
                <div className="w-full h-full bg-slate-100 animate-pulse"></div>
              )}
            </div>
            <div className="mt-2 text-center">
              <span className="font-mono text-[8px] uppercase tracking-widest text-outline font-bold">Live QR</span>
            </div>
          </div>

          {/* Decorative Mesh Grid Element */}
          <div className="absolute inset-0 -z-10 opacity-40 blur-[100px] bg-primary/20 rounded-full w-full h-full scale-[1.3]"></div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full absolute bottom-0 left-0 py-8 pointer-events-none z-10">
        <div className="max-w-7xl mx-auto px-8 flex justify-center items-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
            © 2026 Streamline Architecture. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
