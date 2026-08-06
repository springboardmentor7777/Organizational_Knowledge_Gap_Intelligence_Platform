import { useState } from "react";
import Badge from "../components/Badge";
import Card from "../components/Card";

/* ── Mock skill data ── */
const allSkills = [
    { id: 1, name: "Data Literacy", category: "Analytics", proficiency: "Advanced", level: 85 },
    { id: 2, name: "React.js", category: "Frontend", proficiency: "Expert", level: 95 },
    { id: 3, name: "UI/UX Design", category: "Design", proficiency: "Intermediate", level: 60 },
    { id: 4, name: "Python", category: "Backend", proficiency: "Advanced", level: 80 },
    { id: 5, name: "Agile / Scrum", category: "Management", proficiency: "Intermediate", level: 65 },
    { id: 6, name: "Cybersecurity", category: "Security", proficiency: "Beginner", level: 30 },
    { id: 7, name: "Machine Learning", category: "Analytics", proficiency: "Intermediate", level: 55 },
    { id: 8, name: "Node.js", category: "Backend", proficiency: "Advanced", level: 78 },
    { id: 9, name: "Communication", category: "Soft Skills", proficiency: "Expert", level: 92 },
    { id: 10, name: "SQL", category: "Backend", proficiency: "Advanced", level: 83 },
    { id: 11, name: "Figma", category: "Design", proficiency: "Intermediate", level: 58 },
    { id: 12, name: "Conflict Resolution", category: "Soft Skills", proficiency: "Advanced", level: 76 },
    { id: 13, name: "TypeScript", category: "Frontend", proficiency: "Advanced", level: 82 },
    { id: 14, name: "AI & Automation", category: "Analytics", proficiency: "Beginner", level: 25 },
    { id: 15, name: "Leadership", category: "Management", proficiency: "Advanced", level: 88 },
    { id: 16, name: "Tailwind CSS", category: "Frontend", proficiency: "Expert", level: 96 },
];

/* ── Config maps ── */
const proficiencyConfig = {
    Beginner: { badge: "danger", bar: "bg-danger" },
    Intermediate: { badge: "warning", bar: "bg-warning" },
    Advanced: { badge: "info", bar: "bg-primary" },
    Expert: { badge: "success", bar: "bg-success" },
};

const categoryConfig = {
    Analytics: "primary",
    Frontend: "info",
    Backend: "secondary",
    Design: "warning",
    Management: "success",
    Security: "danger",
    "Soft Skills": "primary",
};

/* ── All unique categories for filter tabs ── */
const categories = ["All", ...Array.from(new Set(allSkills.map((s) => s.category))).sort()];

/* ── Proficiency levels for filter ── */
const proficiencyLevels = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];

/* ── Skill Card ── */
const SkillCard = ({ skill }) => {
    const { badge, bar } = proficiencyConfig[skill.proficiency] ?? { badge: "secondary", bar: "bg-secondary" };

    return (
        <div className="bg-white rounded-xl border border-secondary-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 flex flex-col gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            {/* Top row: name + category badge */}
            <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-secondary leading-snug">{skill.name}</h3>
                <Badge variant={categoryConfig[skill.category] ?? "secondary"} size="sm" className="shrink-0">
                    {skill.category}
                </Badge>
            </div>

            {/* Proficiency level */}
            <div className="flex items-center justify-between">
                <span className="text-xs text-secondary-400 font-medium">Proficiency</span>
                <Badge variant={badge} size="sm" dot>{skill.proficiency}</Badge>
            </div>

            {/* Progress bar */}
            <div>
                <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs text-secondary-400">Skill Level</span>
                    <span className="text-xs font-semibold text-secondary">{skill.level}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary-100 overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${bar}`}
                        style={{ width: `${skill.level}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

/* ── Main component ── */
const SkillInventory = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeProficiency, setActiveProficiency] = useState("All");
    const [search, setSearch] = useState("");

    const filtered = allSkills.filter((s) => {
        const matchCat = activeCategory === "All" || s.category === activeCategory;
        const matchProf = activeProficiency === "All" || s.proficiency === activeProficiency;
        const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchProf && matchSearch;
    });

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-secondary">Skill Inventory</h1>
                    <p className="mt-0.5 text-sm text-secondary-400">Browse and filter all tracked competencies across the organisation.</p>
                </div>
                <span className="text-xs font-medium text-secondary-400 bg-secondary-100 rounded-full px-3 py-1.5 self-start sm:self-center">
                    {filtered.length} of {allSkills.length} skills
                </span>
            </div>

            {/* Filters */}
            <Card noPadding>
                <div className="px-5 pt-4 pb-3 space-y-4">
                    {/* Search */}
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary-400 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search skills…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full h-9 pl-9 pr-3 text-sm rounded-lg bg-secondary-50 border border-secondary-200 text-secondary placeholder:text-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        />
                    </div>

                    {/* Category tabs */}
                    <div>
                        <p className="text-[11px] font-semibold text-secondary-400 uppercase tracking-wider mb-2">Category</p>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors cursor-pointer ${activeCategory === cat
                                            ? "bg-primary text-white border-primary"
                                            : "bg-white text-secondary-500 border-secondary-200 hover:border-primary hover:text-primary"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Proficiency tabs */}
                    <div>
                        <p className="text-[11px] font-semibold text-secondary-400 uppercase tracking-wider mb-2">Proficiency</p>
                        <div className="flex flex-wrap gap-2">
                            {proficiencyLevels.map((lvl) => (
                                <button
                                    key={lvl}
                                    onClick={() => setActiveProficiency(lvl)}
                                    className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors cursor-pointer ${activeProficiency === lvl
                                            ? "bg-secondary text-white border-secondary"
                                            : "bg-white text-secondary-500 border-secondary-200 hover:border-secondary hover:text-secondary"
                                        }`}
                                >
                                    {lvl}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>

            {/* Skills grid */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filtered.map((skill) => (
                        <SkillCard key={skill.id} skill={skill} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-14 h-14 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-7 h-7 text-secondary-400">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <p className="text-sm font-medium text-secondary">No skills found</p>
                    <p className="text-xs text-secondary-400 mt-1">Try adjusting your search or filter criteria.</p>
                </div>
            )}
        </div>
    );
};

export default SkillInventory;
