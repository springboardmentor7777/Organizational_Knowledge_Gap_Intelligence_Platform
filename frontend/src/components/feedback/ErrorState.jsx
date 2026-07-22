/**
 * ErrorState
 * Displayed when a data fetch fails.
 * Accepts an optional onRetry callback.
 */
export default function ErrorState({
  message = 'Something went wrong. Please try again.',
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-5xl mb-4">⚠️</div>
      <h3 className="text-base font-semibold text-gray-700 mb-1">Error</h3>
      <p className="text-sm text-gray-500 max-w-xs mb-5">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
