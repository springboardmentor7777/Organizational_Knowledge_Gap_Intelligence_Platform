import Badge from "./Badge";

/**
 * SkillCard — displays a single skill entry with category, proficiency, and progress.
 *
 * Props:
 *  name        {string}   – Skill name (e.g. "React.js")
 *  category    {string}   – Skill category (e.g. "Frontend")
 *  proficiency {string}   – "Beginner" | "Intermediate" | "Advanced" | "Expert"
 *  level       {number}   – 0–100 numeric proficiency percentage
 *  categoryVariant {string} – Badge variant for category (defaults to "secondary")
 *  onClick     {function} – Optional click handler for the whole card
 *  className   {string}   – Extra Tailwind classes
 */

const proficiencyConfig = {
    Beginner: { badge: "danger", bar: "bg-danger" },
    Intermediate: { badge: "warning", bar: "bg-warning" },
    Advanced: { badge: "info", bar: "bg-primary" },
    Expert: { badge: "success", bar: "bg-success" },
};

const SkillCard = ({
    name = "Skill",
    category = "General",
    proficiency = "Beginner",
    level = 0,
    categoryVariant = "secondary",
    onClick,
    className = "",
}) => {
    const { badge, bar } = proficiencyConfig[proficiency] ?? proficiencyConfig.Beginner;
    const clampedLevel = Math.min(100, Math.max(0, level));

    return (
        <div
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
            className={`
        bg-white rounded-xl border border-secondary-200
        shadow-[0_1px_3px_rgba(0,0,0,0.04)]
        hover:shadow-md hover:-translate-y-0.5
        transition-all duration-200
        p-5 flex flex-col gap-4
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
        >
            {/* Name + category */}
            <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-secondary leading-snug">{name}</h3>
                <Badge variant={categoryVariant} size="sm" className="shrink-0">{category}</Badge>
            </div>

            {/* Proficiency */}
            <div className="flex items-center justify-between">
                <span className="text-xs text-secondary-400 font-medium">Proficiency</span>
                <Badge variant={badge} size="sm" dot>{proficiency}</Badge>
            </div>

            {/* Progress bar */}
            <div>
                <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs text-secondary-400">Skill Level</span>
                    <span className="text-xs font-semibold text-secondary tabular-nums">{clampedLevel}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary-100 overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${bar}`}
                        style={{ width: `${clampedLevel}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SkillCard;
