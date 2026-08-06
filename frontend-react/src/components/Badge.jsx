const variantStyles = {
    primary:
        "bg-primary-100 text-primary-700 ring-primary-200",
    secondary:
        "bg-secondary-100 text-secondary-700 ring-secondary-200",
    success:
        "bg-emerald-50 text-emerald-700 ring-emerald-200",
    warning:
        "bg-amber-50 text-amber-700 ring-amber-200",
    danger:
        "bg-red-50 text-red-700 ring-red-200",
    info:
        "bg-cyan-50 text-cyan-700 ring-cyan-200",
};

const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-0.5 text-xs",
    lg: "px-3 py-1 text-sm",
};

/**
 * Reusable Badge / Tag component.
 *
 * @param {"primary"|"secondary"|"success"|"warning"|"danger"|"info"} variant
 * @param {"sm"|"md"|"lg"} size
 * @param {boolean} dot – show a coloured dot before the label
 * @param {React.ReactNode} children – badge label
 */
const Badge = ({
    children,
    variant = "primary",
    size = "md",
    dot = false,
    className = "",
    ...props
}) => {
    return (
        <span
            className={`
        inline-flex items-center gap-1.5 font-medium rounded-full
        ring-1 ring-inset select-none
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
            {...props}
        >
            {dot && (
                <span
                    className="h-1.5 w-1.5 rounded-full bg-current opacity-70"
                    aria-hidden="true"
                />
            )}
            {children}
        </span>
    );
};

export default Badge;
