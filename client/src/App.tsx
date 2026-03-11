import { useState, useRef } from 'react'

function App() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isCopied, setIsCopied] = useState(false)
  
  const resultRef = useRef<HTMLDivElement>(null)

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setIsLoading(true)
    setError(null)
    setShortUrl(null)
    setIsCopied(false)

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      
      const response = await fetch(`${baseUrl}/api/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to shorten URL')
      }

      setShortUrl(result.data.short_url)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2500)
    }
  }
  
  const handleReset = () => {
    setUrl('')
    setShortUrl(null)
    setError(null)
    setIsCopied(false)
  }

  return (
    <div className="min-h-screen bg-[#f7f9fa] text-gray-800 font-sans flex flex-col">
      {/* Navbar Minimalist */}
      <header className="w-full bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center">
          <span className="text-3xl font-extrabold text-blue-600 tracking-tight">ShortURL</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col">
        
        {!shortUrl ? (
          // --- INPUT VIEW ---
          <div className="flex flex-col items-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4 text-center">
              Paste the URL to be shortened
            </h1>
            <p className="text-lg text-gray-600 text-center mb-10">
              ShortURL is a free tool to shorten URLs and generate short links.
            </p>

            <div className="w-full bg-white rounded-md shadow-sm border border-gray-200 p-4 md:p-8">
              <form onSubmit={handleShorten} className="flex flex-col sm:flex-row shadow-sm">
                <input 
                  type="url" 
                  placeholder="Enter the link here" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="flex-1 px-4 py-4 text-lg border border-gray-300 rounded-lg sm:rounded-r-none focus:outline-none focus:border-blue-500 placeholder:text-gray-400"
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !url}
                  className="mt-2 sm:mt-0 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg sm:rounded-l-none transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Shortening...' : 'Shorten URL'}
                </button>
              </form>
              <p className="text-center text-gray-500 text-sm mt-4">
                ShortURL is a free tool to shorten a URL or reduce a link.
              </p>

              {error && (
                <div className="mt-6 text-red-600 bg-red-50 p-3 rounded border border-red-200 text-center font-medium">
                  {error}
                </div>
              )}
            </div>
          </div>
        ) : (
          // --- RESULT VIEW ---
          <div className="flex flex-col" ref={resultRef}>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
              Your shortened URL
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Copy the short link and share it in messages, texts, posts, websites and other locations.
            </p>

            <div className="w-full bg-white rounded-md shadow-sm border border-gray-200 p-6 md:p-10">
              <div className="flex flex-col sm:flex-row shadow-sm mb-6">
                <input 
                  type="text" 
                  readOnly
                  value={shortUrl}
                  className="flex-1 px-4 py-3 text-lg border border-gray-300 rounded-lg sm:rounded-r-none bg-white text-gray-800 focus:outline-none"
                />
                <button 
                  onClick={copyToClipboard}
                  className={`mt-2 sm:mt-0 px-8 py-3 font-bold text-lg rounded-lg sm:rounded-l-none transition-colors ${
                    isCopied 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isCopied ? 'Copied URL!' : 'Copy URL'}
                </button>
              </div>

              <div className="mb-8">
                <p className="text-gray-700">
                  Long URL: <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{url}</a>
                </p>
              </div>

              <div>
                <button 
                  onClick={handleReset}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded text-sm transition-colors"
                >
                  Shorten another URL
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Simple Footer */}
      <footer className="w-full bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>© 2026 URL Shortening Service.</span>
        </div>
      </footer>
    </div>
  )
}

export default App
