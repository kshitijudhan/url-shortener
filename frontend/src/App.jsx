import { useState } from "react";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [hasCopied, setHasCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/urls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        originalUrl,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setShortUrl(data.shortUrl);
          setHasCopied(false);
        } else {
          console.log("Please try again");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setHasCopied(true);
  };

  return (
    <>
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between py-4 px-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <i className="fa-solid fa-link text-white text-lg"></i>
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
            URL Shortener
          </span>
        </div>
        <div className="text-xs sm:text-sm text-slate-400 font-medium flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Fast & Secure
        </div>
      </header>

      {/* Main Center Box Container (Equally spaced four sides) */}
      <main className="flex-1 flex items-center justify-center my-auto py-8">
        <div className="w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-950/50 transition-all duration-300">
          {/* Card Header Text */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Shorten Your Link
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
              Paste your long URL below to create a clean, trackable short link
              in seconds.
            </p>
          </div>

          {/* Input & Action Controls Form */}
          <form
            id="shortenerForm"
            className="space-y-5"
            onSubmit={handleSubmit}
          >
            {/* Input for Long URL */}
            <div className="space-y-1.5">
              <label
                htmlFor="longUrl"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300"
              >
                Original URL
              </label>
              <div className="relative flex items-center">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i className="fa-solid fa-globe"></i>
                </div>
                <input
                  type="url"
                  id="longUrl"
                  required
                  placeholder="Paste your long URL here..."
                  className="w-full pl-10 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all shadow-inner"
                  onChange={(e) => setOriginalUrl(e.target.value)}
                />
              </div>
            </div>

            {/* Generate / Shorten Button */}
            <button
              type="submit"
              id="generateBtn"
              className="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-glow transition-all duration-200 flex items-center justify-center space-x-2 text-sm cursor-pointer"
            >
              <span>Shorten URL</span>
              <i className="fa-solid fa-wand-magic-sparkles text-xs"></i>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 rounded-full font-medium">
                Result
              </span>
            </div>
          </div>

          {/* Output Input Field & Copy Button */}
          <div className="space-y-1.5">
            <label
              htmlFor="shortUrl"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300"
            >
              Shortened URL
            </label>
            <div className="relative flex items-center gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i className="fa-solid fa-link"></i>
                </div>
                <input
                  type="text"
                  value={shortUrl}
                  id="shortUrl"
                  readOnly
                  placeholder="https://short.url"
                  className="w-full pl-10 pr-4 py-3.5 bg-slate-100 dark:bg-slate-950/80 text-indigo-600 dark:text-indigo-400 font-medium rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none text-sm select-all cursor-default"
                />
              </div>
              <button
                type="button"
                id="copyBtn"
                onClick={handleCopy}
                disabled={!shortUrl}
                className="py-3.5 px-4 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-1.5 text-sm min-w-[90px]"
              >
                <i className="fa-regular fa-copy" id="copyIcon"></i>
                <span id="copyText">{hasCopied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Toast / Status Message */}
          <div
            id="toastMessage"
            className={`${hasCopied ? "opacity-100" : "opacity-0"} transition-opacity duration-300 mt-4 text-center text-xs text-emerald-500 font-medium flex items-center justify-center gap-1.5`}
          >
            <i className="fa-solid fa-circle-check"></i>
            <span id="toastText">Link copied to clipboard!</span>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="w-full max-w-4xl mx-auto text-center py-4 text-xs text-slate-500 dark:text-slate-400">
        &copy; 2026 URL Shortener. Crafted with precision for smooth user
        experience.
      </footer>
    </>
  );
}

export default App;
