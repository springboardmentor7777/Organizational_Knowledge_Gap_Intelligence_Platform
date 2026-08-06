/**
 * Reusable Card component with optional header, footer and padding control.
 *
 * @param {React.ReactNode} children  – card body
 * @param {string}          title     – optional header title
 * @param {string}          subtitle  – optional subtitle under the title
 * @param {React.ReactNode} actions   – optional top-right action area (buttons, icons, etc.)
 * @param {React.ReactNode} footer    – optional footer section
 * @param {boolean}         noPadding – remove body padding (useful when body is a table / list)
 */
const Card = ({
    children,
    title,
    subtitle,
    actions,
    footer,
    noPadding = false,
    className = "",
    ...props
}) => {
    return (
        <div
            className={`
        bg-surface-card rounded-xl border border-secondary-200
        shadow-[0_1px_3px_rgba(0,0,0,0.04)]
        transition-shadow duration-200
        ${className}
      `}
            {...props}
        >
            {/* ── Header ── */}
            {(title || actions) && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-secondary-100">
                    <div>
                        {title && (
                            <h3 className="text-base font-semibold text-secondary">
                                {title}
                            </h3>
                        )}
                        {subtitle && (
                            <p className="mt-0.5 text-sm text-secondary-400">{subtitle}</p>
                        )}
                    </div>

                    {actions && <div className="flex items-center gap-2">{actions}</div>}
                </div>
            )}

            {/* ── Body ── */}
            <div className={noPadding ? "" : "px-6 py-5"}>{children}</div>

            {/* ── Footer ── */}
            {footer && (
                <div className="flex items-center px-6 py-3 border-t border-secondary-100 bg-secondary-50/50 rounded-b-xl">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;
