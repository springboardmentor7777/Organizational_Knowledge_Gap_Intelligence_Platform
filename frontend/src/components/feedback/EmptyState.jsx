/**
 * EmptyState
 * Displayed when a list has no items to show,
 * either because the data is empty or a filter returned no results.
 */
export default function EmptyState({
  title = 'No results found',
  message,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-5xl mb-4">📭</div>
      <h3 className="text-base font-semibold text-gray-700 mb-1">{title}</h3>
      {message && (
        <p className="text-sm text-gray-400 max-w-xs">{message}</p>
      )}
    </div>
  );
}
