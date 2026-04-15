/**
 * Error display component with recovery options
 */
export default function ErrorMessage({ error, onRetry, onDismiss }) {
  if (!error) return null

  return (
    <div
      className="p-4 bg-red-50 border-l-4 border-red-400 rounded"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="text-2xl text-red-600" aria-hidden="true">✕</span>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            Something went wrong
          </h3>
          <p className="mt-2 text-sm text-red-700">
            {typeof error === 'string' ? error : error.message || 'An unexpected error occurred'}
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn btn-error btn-sm lg:px-5 lg:py-3 lg:text-sm"
          >
            Try Again
          </button>
        )}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="btn btn-ghost btn-sm lg:px-5 lg:py-3 lg:text-sm"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  )
}
