import { useState } from "react";
import { FiLink, FiArrowRight, FiCopy, FiCheck } from "react-icons/fi";
import { Hero } from "./components/Hero";
import { VisualScene } from "./components/VisualScene";
import { SuccessCard } from "./components/SuccessCard";

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Failed to shorten URL");

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
    <div className="bg-surface grid-bg font-sans text-on-surface min-h-screen flex flex-col relative w-full overflow-x-hidden">
      <main className="max-w-7xl mx-auto px-8 pt-24 md:pt-32 pb-20 flex flex-col md:flex-row items-center gap-16 md:gap-24 lg:gap-32 w-full flex-1">
        {/* Left Side: Content */}
        <div className="flex-1 space-y-8 z-10 w-full">
          <Hero />

          <div className="relative group w-full max-w-2xl pt-4">
            <form
              onSubmit={handleShorten}
              className="flex flex-col sm:flex-row items-center bg-surface-container-lowest sm:rounded-full rounded-2xl p-2 shadow-[0_8px_32px_rgba(79,70,229,0.06)] border border-outline-variant/30 focus-within:ring-2 focus-within:ring-primary/30 transition-all duration-300 gap-2"
            >
              <div className="hidden sm:block pl-4 text-outline/60">
                <FiLink className="w-5 h-5" />
              </div>
              <input
                className="flex-1 w-full bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-outline/30 font-medium px-4 sm:px-2 py-3 outline-none"
                placeholder="Paste your long link here..."
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={isLoading || !url}
                className="w-full sm:w-auto bg-gradient-to-br from-primary to-[#3430a3] text-on-primary px-8 py-3.5 rounded-xl sm:rounded-full font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-70"
              >
                {isLoading ? "Shortening..." : "Shorten"}
                {!isLoading && <FiArrowRight className="w-5 h-5" />}
              </button>
            </form>

            {error && (
              <div className="mt-4 text-error bg-error-container/20 px-4 py-3 rounded-lg border border-error/20 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}

            {/* Success Card Component */}
            {shortUrl && (
              <SuccessCard
                shortUrl={shortUrl}
                copyToClipboard={copyToClipboard}
                isCopied={isCopied}
              />
            )}
          </div>

          <div className="flex items-center gap-2 pt-2  ">
            <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse"></div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-on-surface-variant font-bold leading-relaxed whitespace-nowrap">
              Zero registration. <span className="text-primary/40 mx-1">/</span> Instant shortening. <span className="text-primary/40 mx-1">/</span> Permanent link access.
            </p>
          </div>
        </div>

        {/* Right Side: Visual Scene */}
        <VisualScene />
      </main>

      <footer className="w-full py-12 opacity-40">
        <div className="max-w-7xl mx-auto px-8 flex justify-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-on-surface-variant font-bold text-center">
            © 2026 Developed by Pachara Nokroy
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
