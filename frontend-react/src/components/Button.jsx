import { forwardRef } from "react";

const variantStyles = {
    primary:
        "bg-primary text-white hover:bg-primary-700 focus-visible:ring-primary/40 shadow-sm",
    secondary:
        "bg-secondary text-white hover:bg-secondary-700 focus-visible:ring-secondary/40 shadow-sm",
    outline:
        "border border-secondary-200 text-secondary hover:bg-secondary-50 focus-visible:ring-primary/30",
    ghost:
        "text-secondary-500 hover:bg-secondary-100 hover:text-secondary focus-visible:ring-primary/30",
    danger:
        "bg-danger text-white hover:bg-red-700 focus-visible:ring-danger/40 shadow-sm",
};

const sizeStyles = {
    sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
    md: "h-10 px-4 text-sm gap-2 rounded-lg",
    lg: "h-12 px-6 text-base gap-2.5 rounded-lg",
};

/**
 * Reusable Button component.
 *
 * @param {"primary"|"secondary"|"outline"|"ghost"|"danger"} variant
 * @param {"sm"|"md"|"lg"} size
 * @param {boolean} isLoading – shows a spinner and disables the button
 * @param {React.ReactNode} leftIcon – optional icon before text
 * @param {React.ReactNode} rightIcon – optional icon after text
 */
const Button = forwardRef(
    (
        {
            children,
            variant = "primary",
            size = "md",
            isLoading = false,
            disabled = false,
            leftIcon,
            rightIcon,
            className = "",
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={`
          inline-flex items-center justify-center font-medium
          transition-all duration-150 ease-in-out
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          disabled:opacity-50 disabled:pointer-events-none
          select-none cursor-pointer
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
                {...props}
            >
                {/* Loading spinner */}
                {isLoading && (
                    <svg
                        className="animate-spin -ml-0.5 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                    </svg>
                )}

                {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
                {children}
                {!isLoading && rightIcon && (
                    <span className="shrink-0">{rightIcon}</span>
                )}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;
