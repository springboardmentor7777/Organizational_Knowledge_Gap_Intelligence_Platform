/**
 * Button — reusable design-system button component.
 * Variants: primary | secondary | outline | danger | ghost | success
 * Sizes: sm | md | lg
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const VARIANT_MAP = {
    primary:   'btn-primary',
    secondary: 'btn-secondary',
    outline:   'btn-outline',
    danger:    'btn-danger',
    ghost:     'btn-ghost',
    success:   'btn-success',
  };

  const SIZE_MAP = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  };

  const base = VARIANT_MAP[variant] ?? 'btn-primary';
  const sizeCls = SIZE_MAP[size] ?? 'btn-md';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${sizeCls} ${className}`}
      {...props}
    >
      {loading && (
        <span className="loading-spinner w-4 h-4" aria-hidden="true" />
      )}
      {children}
    </button>
  );
}
