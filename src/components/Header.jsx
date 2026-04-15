import { Link, useNavigate } from 'react-router-dom'
import { ACCESSIBILITY, ROUTES } from '../constants'

/**
 * Accessible header component with skip links and navigation
 */
export default function Header() {
  const navigate = useNavigate()

  return (
    <>
      {/* Skip to main content link - invisible but keyboard accessible */}
      <a
        href={`#${ACCESSIBILITY.MAIN_CONTENT_ID}`}
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-indigo-600 focus:text-white focus:p-2"
      >
        Skip to main content
      </a>

      <nav
        className="sticky top-0 z-40 bg-base-100/95 backdrop-blur-xl border-b border-slate-200/60 shadow-sm"
        aria-label={ACCESSIBILITY.NAVIGATION_LABEL}
      >
        <div className="navbar max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="navbar-start">
            <button
              onClick={() => navigate(ROUTES.HOME)}
              className="btn btn-ghost btn-lg normal-case text-2xl lg:text-3xl font-bold text-slate-950 px-2"
              aria-label="CYOA Maker - Go to home"
            >
              🎭 CYOA Maker
            </button>
          </div>

          <div className="navbar-center hidden lg:flex">
            <div className="menu menu-horizontal px-1 gap-2">
              <Link
                to="/"
                className="btn btn-ghost btn-sm lg:px-4 lg:py-3 lg:text-base"
              >
                Home
              </Link>
              <Link
                to="/author"
                className="btn btn-ghost btn-sm lg:px-4 lg:py-3 lg:text-base"
              >
                Create Story
              </Link>
              <Link
                to="/"
                className="btn btn-ghost btn-sm lg:px-4 lg:py-3 lg:text-base"
              >
                Browse Stories
              </Link>
            </div>
          </div>

          <div className="navbar-end">
            <button
              onClick={() => navigate(ROUTES.AUTHOR)}
              className="btn btn-primary btn-lg lg:px-8 lg:py-4 lg:text-lg xl:px-10 xl:py-5"
              aria-label="Create a new story"
            >
              ✍️ Create Story
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

// Utility class for screen reader only content
export const screenReaderOnly = "sr-only"
