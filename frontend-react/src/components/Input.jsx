import { forwardRef } from "react";

/**
 * Reusable Input component.
 *
 * @param {string}          label      – visible label text
 * @param {string}          helperText – optional hint below the field
 * @param {string}          error      – error message (also triggers red styling)
 * @param {React.ReactNode} leftIcon   – icon rendered inside the left edge
 * @param {React.ReactNode} rightIcon  – icon rendered inside the right edge
 * @param {"sm"|"md"|"lg"}  size       – controls height & font size
 */

const sizeStyles = {
    sm: "h-8 text-xs",
    md: "h-10 text-sm",
    lg: "h-12 text-base",
};

const Input = forwardRef(
    (
        {
            label,
            helperText,
            error,
            leftIcon,
            rightIcon,
            size = "md",
            className = "",
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id || `input-${label?.replace(/\s+/g, "-").toLowerCase()}`;

        return (
            <div className="flex flex-col gap-1.5">
                {/* Label */}
                {label && (
                    <label
                        htmlFor={inputId}
                        className="text-sm font-medium text-secondary"
                    >
                        {label}
                    </label>
                )}

                {/* Field wrapper */}
                <div className="relative">
                    {/* Left icon */}
                    {leftIcon && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary-400 pointer-events-none">
                            {leftIcon}
                        </span>
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        className={`
              w-full rounded-lg border bg-white
              px-3 font-normal placeholder:text-secondary-300
              transition-all duration-150 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-offset-0
              disabled:opacity-50 disabled:bg-secondary-50 disabled:cursor-not-allowed
              ${error
                                ? "border-danger text-danger focus:ring-danger/30"
                                : "border-secondary-200 text-secondary focus:border-primary focus:ring-primary/30"
                            }
              ${leftIcon ? "pl-10" : ""}
              ${rightIcon ? "pr-10" : ""}
              ${sizeStyles[size]}
              ${className}
            `}
                        {...props}
                    />

                    {/* Right icon */}
                    {rightIcon && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-secondary-400 pointer-events-none">
                            {rightIcon}
                        </span>
                    )}
                </div>

                {/* Helper / Error text */}
                {(helperText || error) && (
                    <p
                        className={`text-xs ${error ? "text-danger" : "text-secondary-400"
                            }`}
                    >
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
