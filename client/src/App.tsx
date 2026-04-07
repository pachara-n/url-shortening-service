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
        <div className="flex-[1.5] shrink-0 space-y-8 z-10 w-full max-w-4xl px-4 md:px-0">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-on-surface leading-tight md:leading-[1.1]">
              Shorten links.
              <br />
              <span className="text-primary bg-clip-text">Amplify reach.</span>
            </h1>
            <p className="text-slate-500 text-base md:text-lg max-w-md leading-relaxed font-medium">
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

          <div className="flex gap-6 items-center pt-8">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-primary text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">
                Real-time Analytics
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-primary text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">
                Custom Domains
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Visuals */}
        <div className="hidden md:flex flex-1 relative w-full aspect-square md:aspect-auto items-center justify-center -mt-10 md:mt-0">
          {/* Main 3D Sphere */}
          <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary to-[#0a006b] shadow-[0_64px_128px_rgba(79,70,229,0.3)] flex items-center justify-center animate-float">
            <div className="absolute inset-0 rounded-full border-[16px] border-white/10 blur-sm"></div>
            <span
              className="material-symbols-outlined text-surface text-8xl lg:text-9xl drop-shadow-2xl"
              style={{ fontVariationSettings: "'wght' 200" }}
            >
              link
            </span>
            {/* Inner Gloss Overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/20 pointer-events-none"></div>
          </div>

          {/* Floating Link Created Popup */}
          {shortUrl && (
            <div className="absolute top-0 lg:-top-10 right-0 lg:right-10 bg-surface-container-lowest backdrop-blur-xl px-6 py-5 rounded-xl shadow-[0_24px_48px_rgba(79,70,229,0.12)] border border-white/50 flex flex-col gap-2 z-10 animate-in zoom-in-95 duration-300">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">
                  Link created!
                </span>
              </div>
              <div className="flex items-center gap-4 bg-surface-container-low p-2 px-3 rounded-lg border border-outline-variant/30">
                <span className="font-mono text-primary font-bold text-sm select-all">
                  {shortUrl}
                </span>
                <button
                  className={`flex items-center justify-center w-8 h-8 rounded-md transition-all ${isCopied ? "bg-green-100 text-green-600" : "bg-white hover:bg-primary/10 text-outline hover:text-primary shadow-sm"}`}
                  onClick={copyToClipboard}
                  title="Copy to clipboard"
                >
                  <span className="material-symbols-outlined text-sm">
                    {isCopied ? "check" : "content_copy"}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Floating QR Code */}
          <div className="absolute bottom-10 lg:bottom-0 left-0 lg:left-10 bg-white p-4 rounded-2xl shadow-[0_24px_48px_rgba(79,70,229,0.06)] z-10 transform -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-on-surface/5 rounded-lg flex items-center justify-center relative overflow-hidden group">
              {shortUrl ? (
                // Realistic QR if available
                <img
                  alt="QR Code Active"
                  className="w-[90%] h-[90%] opacity-100 mix-blend-multiply"
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${shortUrl}&color=0f172a`}
                />
              ) : (
                <img
                  alt="QR Code"
                  className="w-[90%] h-[90%] opacity-40 mix-blend-luminosity group-hover:opacity-60 transition-opacity"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmhFmHbWqYk0XDGQsDr2g__xBdfKYmsqpGwmbf67wJJbnenfZ_1bLqIs4iM9IbjfORcd2EL9zvr_T9P7AdWd_T4BJ98Qv7M6tyEoibI2hMfIIHNwCWupNuZNdLN4xF8ZaK7zV1vIOF6TmJzsfUpoz_bduI9z5U3hq6X7ZEBkBLPvYAZVyFRxNkk98JzmBtBRgZ289V9Enl7plQjslrrlmojqIz9R9nLZ-Jn-Ssnd89kyjrnBWIFV9RnLr7_gOCDEq-nSV3gFgIbL0"
                />
              )}
            </div>
            <div className="mt-3 text-center">
              <span className="font-mono text-[9px] uppercase tracking-widest text-outline font-semibold">
                Scan to track
              </span>
            </div>
          </div>

          {/* Decorative Mesh Grid Element */}
          <div className="absolute inset-0 -z-10 opacity-40 blur-[80px] bg-primary/20 rounded-full w-full h-full transform scale-150"></div>
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
