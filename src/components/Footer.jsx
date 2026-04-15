/**
 * Accessible footer component
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-50 text-slate-700 py-10 mt-12 border-t border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">About</h3>
            <p className="text-sm text-slate-600">
              Create and explore interactive branching stories with CYOA Maker. 
              Share your adventures with the world.
            </p>
          </div>

          {/* Accessibility */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Accessibility</h3>
            <p className="text-sm text-slate-600">
              This site is designed to be accessible to all users. 
              <a
                href="/"
                className="text-indigo-400 hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-1"
              >
                {' '}Learn more
              </a>
            </p>
          </div>
        </div>

        <hr className="border-gray-700 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-slate-500">
          <p>&copy; {currentYear} CYOA Maker. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/" className="text-slate-500 hover:text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500">
              Privacy
            </a>
            <a href="/" className="text-slate-500 hover:text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
