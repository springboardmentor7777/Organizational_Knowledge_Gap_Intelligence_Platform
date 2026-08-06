/**
 * SummaryCard — top-level metric display card.
 *
 * Props:
 *  label       {string}           – Metric label (e.g. "Total Employees")
 *  value       {string|number}    – Primary display value (e.g. "240" or "85%")
 *  trend       {string}           – Trend text (e.g. "+5%")
 *  trendUp     {boolean}          – true = green arrow up, false = red arrow down
 *  trendLabel  {string}           – Context after trend (e.g. "from last month")
 *  icon        {ReactNode}        – SVG icon element
 *  iconClass   {string}           – Tailwind bg + text classes for the icon box
 */

const TrendArrow = ({ up }) =>
    up ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
        </svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
        </svg>
    );

const SummaryCard = ({
    label = "Metric",
    value = "—",
    trend,
    trendUp = true,
    trendLabel = "",
    icon,
    iconClass = "bg-primary-50 text-primary",
    className = "",
}) => {
    return (
        <div
            className={`
        bg-white rounded-xl border border-secondary-200
        shadow-[0_1px_3px_rgba(0,0,0,0.04)]
        hover:shadow-md hover:-translate-y-0.5
        transition-all duration-200
        p-5 flex items-start gap-4
        ${className}
      `}
        >
            {/* Icon box */}
            {icon && (
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${iconClass}`}>
                    {icon}
                </div>
            )}

            {/* Content */}
            <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-secondary-400 truncate">{label}</p>
                <p className="text-2xl font-bold text-secondary mt-0.5 tabular-nums">{value}</p>

                {/* Trend */}
                {trend !== undefined && (
                    <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${trendUp ? "text-success" : "text-danger"}`}>
                        <TrendArrow up={trendUp} />
                        <span>
                            {trend}
                            {trendLabel && (
                                <span className="font-normal text-secondary-400 ml-1">{trendLabel}</span>
                            )}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SummaryCard;
