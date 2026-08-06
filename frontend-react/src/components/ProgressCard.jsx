import Badge from "./Badge";

/**
 * ProgressCard — displays a named progress item with a labelled progress bar.
 *
 * Props:
 *  title        {string}   – Card title (e.g. programme or goal name)
 *  subtitle     {string}   – Optional description below the title
 *  percent      {number}   – 0–100 completion percentage
 *  completed    {number}   – Optional completed count  (e.g. 44)
 *  total        {number}   – Optional total count (e.g. 85)
 *  status       {string}   – Optional badge label ("On Track" | "At Risk" | "Completed" | …)
 *  statusVariant{string}   – Badge variant for status badge
 *  barColor     {string}   – Tailwind bg class for bar fill (defaults to "bg-primary")
 *  footer       {ReactNode}– Optional content below the bar
 *  className    {string}   – Extra Tailwind classes
 */

const ProgressCard = ({
    title = "Programme",
    subtitle,
    percent = 0,
    completed,
    total,
    status,
    statusVariant = "primary",
    barColor = "bg-primary",
    footer,
    className = "",
}) => {
    const clampedPct = Math.min(100, Math.max(0, percent));

    /* Auto-derive a sensible bar colour when none supplied, based on percent */
    const autoColor =
        barColor === "bg-primary"
            ? clampedPct >= 75
                ? "bg-success"
                : clampedPct >= 40
                    ? "bg-primary"
                    : "bg-warning"
            : barColor;

    return (
        <div
            className={`
        bg-white rounded-xl border border-secondary-200
        shadow-[0_1px_3px_rgba(0,0,0,0.04)]
        p-5 flex flex-col gap-4
        ${className}
      `}
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-secondary truncate">{title}</p>
                    {subtitle && (
                        <p className="text-xs text-secondary-400 mt-0.5 line-clamp-2">{subtitle}</p>
                    )}
                </div>
                {status && (
                    <Badge variant={statusVariant} size="sm" dot className="shrink-0">{status}</Badge>
                )}
            </div>

            {/* Progress section */}
            <div>
                {/* Bar */}
                <div className="h-2.5 rounded-full bg-secondary-100 overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${autoColor}`}
                        style={{ width: `${clampedPct}%` }}
                    />
                </div>

                {/* Labels below bar */}
                <div className="flex items-center justify-between mt-2">
                    {/* Count label */}
                    {completed !== undefined && total !== undefined ? (
                        <span className="text-xs text-secondary-400">
                            <span className="font-semibold text-secondary">{completed}</span> / {total} completed
                        </span>
                    ) : (
                        <span className="text-xs text-secondary-400">{clampedPct}% complete</span>
                    )}

                    {/* Percent badge */}
                    <span
                        className={`text-xs font-bold tabular-nums ${clampedPct === 100 ? "text-success" : "text-secondary"
                            }`}
                    >
                        {clampedPct}%
                    </span>
                </div>
            </div>

            {/* Optional footer slot */}
            {footer && (
                <div className="pt-1 border-t border-secondary-100">{footer}</div>
            )}
        </div>
    );
};

export default ProgressCard;
