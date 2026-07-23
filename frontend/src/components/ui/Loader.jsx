/**
 * Loader — design-system spinner component.
 * Sizes: sm | md | lg
 */
export default function Loader({ size = 'md', className = '' }) {
  const SIZE_MAP = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-[3px]',
    lg: 'w-12 h-12 border-4',
  };

  const sizeCls = SIZE_MAP[size] ?? SIZE_MAP.md;

  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block rounded-full border-slate-200 border-t-blue-600 animate-spinSlow ${sizeCls} ${className}`}
    />
  );
}
