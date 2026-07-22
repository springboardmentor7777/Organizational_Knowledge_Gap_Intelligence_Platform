/**
 * LoadingScreen
 * Displayed while async data is being fetched.
 */
export default function LoadingScreen({ message = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-gray-400">
      <div className="w-9 h-9 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
