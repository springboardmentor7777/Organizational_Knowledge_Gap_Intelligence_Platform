import { useState } from "react";
import Badge from "../components/Badge";
import Card from "../components/Card";

/* ── Mock data ── */
const competencies = [
    { id: 1, skill: "Data Literacy", category: "Analytics", required: "Advanced", current: "Intermediate" },
    { id: 2, skill: "React.js", category: "Frontend", required: "Expert", current: "Expert" },
    { id: 3, skill: "UI/UX Design", category: "Design", required: "Advanced", current: "Beginner" },
    { id: 4, skill: "Python", category: "Backend", required: "Advanced", current: "Advanced" },
    { id: 5, skill: "Agile / Scrum", category: "Management", required: "Advanced", current: "Intermediate" },
    { id: 6, skill: "Cybersecurity", category: "Security", required: "Intermediate", current: "Beginner" },
    { id: 7, skill: "Machine Learning", category: "Analytics", required: "Advanced", current: "Intermediate" },
    { id: 8, skill: "Communication", category: "Soft Skills", required: "Expert", current: "Expert" },
    { id: 9, skill: "SQL", category: "Backend", required: "Advanced", current: "Advanced" },
    { id: 10, skill: "Leadership", category: "Management", required: "Expert", current: "Advanced" },
    { id: 11, skill: "Conflict Resolution", category: "Soft Skills", required: "Advanced", current: "Advanced" },
    { id: 12, skill: "TypeScript", category: "Frontend", required: "Expert", current: "Advanced" },
    { id: 13, skill: "AI & Automation", category: "Analytics", required: "Intermediate", current: "Beginner" },
    { id: 14, skill: "Figma", category: "Design", required: "Intermediate", current: "Intermediate" },
    { id: 15, skill: "Tailwind CSS", category: "Frontend", required: "Advanced", current: "Expert" },
    { id: 16, skill: "Node.js", category: "Backend", required: "Advanced", current: "Advanced" },
];

/* ── Level ordering for comparison ── */
const levelOrder = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 };

const getStatus = (required, current) => {
    const diff = levelOrder[current] - levelOrder[required];
    if (diff >= 0) return { label: "Met", variant: "success", dot: true };
    if (diff === -1) return { label: "In Progress", variant: "warning", dot: true };
    return { label: "Gap", variant: "danger", dot: true };
};

const levelVariant = { Beginner: "secondary", Intermediate: "warning", Advanced: "info", Expert: "success" };

const statusFilters = ["All", "Met", "In Progress", "Gap"];

/* ── Sortable column header ── */
const Th = ({ label, col, sortCol, sortDir, onSort }) => (
    <th
        scope="col"
        onClick={() => onSort(col)}
        className="px-4 py-3 text-left text-xs font-semibold text-secondary-400 uppercase tracking-wider cursor-pointer select-none hover:text-primary transition-colors whitespace-nowrap"
    >
        <span className="inline-flex items-center gap-1">
            {label}
            <span className="text-secondary-300">
                {sortCol === col ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
            </span>
        </span>
    </th>
);

const Competency = () => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortCol, setSortCol] = useState("skill");
    const [sortDir, setSortDir] = useState("asc");

    const handleSort = (col) => {
        if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        else { setSortCol(col); setSortDir("asc"); }
    };

    const enriched = competencies.map((c) => ({ ...c, status: getStatus(c.required, c.current) }));

    const filtered = enriched
        .filter((c) => {
            const matchSearch = c.skill.toLowerCase().includes(search.toLowerCase()) ||
                c.category.toLowerCase().includes(search.toLowerCase());
            const matchStatus = statusFilter === "All" || c.status.label === statusFilter;
            return matchSearch && matchStatus;
        })
        .sort((a, b) => {
            let aVal = a[sortCol] ?? a.status.label;
            let bVal = b[sortCol] ?? b.status.label;
            if (sortCol === "required" || sortCol === "current")
                return sortDir === "asc"
                    ? levelOrder[aVal] - levelOrder[bVal]
                    : levelOrder[bVal] - levelOrder[aVal];
            return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        });

    const counts = { Met: 0, "In Progress": 0, Gap: 0 };
    enriched.forEach((c) => counts[c.status.label]++);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-secondary">Competency Matrix</h1>
                <p className="mt-0.5 text-sm text-secondary-400">
                    Track required vs current skill levels across the organisation.
                </p>
            </div>

            {/* Summary pills */}
            <div className="flex flex-wrap gap-3">
                {[
                    { label: "Met", count: counts["Met"], variant: "success" },
                    { label: "In Progress", count: counts["In Progress"], variant: "warning" },
                    { label: "Gap", count: counts["Gap"], variant: "danger" },
                ].map(({ label, count, variant }) => (
                    <div key={label} className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-secondary-200 shadow-sm">
                        <Badge variant={variant} size="sm" dot>{label}</Badge>
                        <span className="text-sm font-bold text-secondary">{count}</span>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <Card noPadding>
                <div className="flex flex-col sm:flex-row gap-3 px-4 py-3">
                    {/* Search */}
                    <div className="relative flex-1">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary-400 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search by skill or category…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full h-9 pl-9 pr-3 text-sm rounded-lg bg-secondary-50 border border-secondary-200 text-secondary placeholder:text-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        />
                    </div>

                    {/* Status filter */}
                    <div className="flex gap-2 flex-wrap">
                        {statusFilters.map((s) => (
                            <button
                                key={s}
                                onClick={() => setStatusFilter(s)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${statusFilter === s
                                        ? "bg-primary text-white border-primary"
                                        : "bg-white text-secondary-500 border-secondary-200 hover:border-primary hover:text-primary"
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Table */}
            <Card noPadding>
                {/* Scrollable wrapper for responsive */}
                <div className="overflow-x-auto rounded-xl">
                    <table className="min-w-full">
                        <thead className="bg-secondary-50 border-b border-secondary-200">
                            <tr>
                                <Th label="Skill" col="skill" sortCol={sortCol} sortDir={sortDir} onSort={handleSort} />
                                <Th label="Category" col="category" sortCol={sortCol} sortDir={sortDir} onSort={handleSort} />
                                <Th label="Required Level" col="required" sortCol={sortCol} sortDir={sortDir} onSort={handleSort} />
                                <Th label="Current Level" col="current" sortCol={sortCol} sortDir={sortDir} onSort={handleSort} />
                                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-secondary-400 uppercase tracking-wider whitespace-nowrap">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-secondary-100">
                            {filtered.length > 0 ? (
                                filtered.map((row) => (
                                    <tr key={row.id} className="hover:bg-secondary-50/60 transition-colors group">
                                        <td className="px-4 py-3.5">
                                            <span className="text-sm font-semibold text-secondary group-hover:text-primary transition-colors">
                                                {row.skill}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <span className="text-sm text-secondary-500">{row.category}</span>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <Badge variant={levelVariant[row.required]} size="md">{row.required}</Badge>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <Badge variant={levelVariant[row.current]} size="md">{row.current}</Badge>
                                                {/* Gap indicator */}
                                                {levelOrder[row.current] < levelOrder[row.required] && (
                                                    <span className="text-[10px] font-semibold text-danger">
                                                        -{levelOrder[row.required] - levelOrder[row.current]}
                                                    </span>
                                                )}
                                                {levelOrder[row.current] > levelOrder[row.required] && (
                                                    <span className="text-[10px] font-semibold text-success">
                                                        +{levelOrder[row.current] - levelOrder[row.required]}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <Badge variant={row.status.variant} size="md" dot>{row.status.label}</Badge>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-4 py-16 text-center">
                                        <p className="text-sm text-secondary-400">No competencies match your filters.</p>
                                        <button
                                            onClick={() => { setSearch(""); setStatusFilter("All"); }}
                                            className="mt-2 text-xs text-primary hover:underline cursor-pointer"
                                        >
                                            Clear filters
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Footer row */}
                    {filtered.length > 0 && (
                        <div className="flex items-center justify-between px-4 py-2.5 border-t border-secondary-100 bg-secondary-50/50">
                            <span className="text-xs text-secondary-400">
                                Showing {filtered.length} of {competencies.length} competencies
                            </span>
                            <span className="text-xs text-secondary-300">Click column headers to sort</span>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default Competency;
