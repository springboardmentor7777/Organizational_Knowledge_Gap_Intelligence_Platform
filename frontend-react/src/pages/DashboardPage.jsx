import Badge from "../components/Badge";
import Card from "../components/Card";

/* ── Static mock data ── */
const summaryCards = [
    {
        label: "Total Employees",
        value: "240",
        trend: "+5%",
        trendUp: true,
        trendLabel: "from last month",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18a4 4 0 00-8 0h8zM2 18a3 3 0 016 0H2z" />
            </svg>
        ),
        color: "bg-primary-50 text-primary",
    },
    {
        label: "Active Trainings",
        value: "12",
        trend: "+3",
        trendUp: true,
        trendLabel: "new this week",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5 8.445v4.722a1 1 0 00.553.894l4 2a1 1 0 00.894 0l4-2A1 1 0 0015 13.167V8.445l2.394-1.025a1 1 0 000-1.84l-7-3z" />
            </svg>
        ),
        color: "bg-emerald-50 text-emerald-600",
    },
    {
        label: "Open Mentorships",
        value: "45",
        trend: "-2",
        trendUp: false,
        trendLabel: "from last month",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
        ),
        color: "bg-violet-50 text-violet-600",
    },
    {
        label: "Avg. Assessment Score",
        value: "85%",
        trend: "+2%",
        trendUp: true,
        trendLabel: "from last quarter",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
        ),
        color: "bg-amber-50 text-amber-600",
    },
];

const activities = [
    { user: "Sarah K.", action: "completed Compliance Training", time: "5 min ago", badge: "success" },
    { user: "Michael T.", action: "submitted a leave request", time: "22 min ago", badge: "warning" },
    { user: "New pairing", action: "created between Priya S. & James L.", time: "1 hr ago", badge: "info" },
    { user: "Q3 Assessment", action: "results published for Engineering", time: "2 hrs ago", badge: "primary" },
    { user: "David R.", action: "enrolled in Leadership Path", time: "3 hrs ago", badge: "success" },
    { user: "System", action: "payroll report generated for August", time: "5 hrs ago", badge: "secondary" },
];

const trainingItems = [
    { label: "Compliance & Ethics", pct: 78, total: 240, done: 187 },
    { label: "Leadership Development", pct: 52, total: 85, done: 44 },
    { label: "Technical Upskilling", pct: 91, total: 120, done: 109 },
    { label: "DEI Awareness", pct: 64, total: 240, done: 154 },
];

const knowledgeGaps = [
    { skill: "Data Literacy", gap: 68 },
    { skill: "AI & Automation", gap: 82 },
    { skill: "Cybersecurity", gap: 55 },
    { skill: "Agile / Scrum", gap: 43 },
    { skill: "Communication", gap: 30 },
];

/* ── Sub-components ── */
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

const DashboardPage = () => {
    return (
        <div className="space-y-6">
            {/* ── Page header ── */}
            <div>
                <h1 className="text-2xl font-bold text-secondary">Dashboard</h1>
                <p className="mt-0.5 text-sm text-secondary-400">Here&apos;s what&apos;s happening across your organisation today.</p>
            </div>

            {/* ── Summary cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {summaryCards.map((card) => (
                    <div
                        key={card.label}
                        className="bg-white rounded-xl border border-secondary-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 flex items-start gap-4"
                    >
                        <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${card.color}`}>
                            {card.icon}
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-secondary-400 truncate">{card.label}</p>
                            <p className="text-2xl font-bold text-secondary mt-0.5">{card.value}</p>
                            <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${card.trendUp ? "text-emerald-600" : "text-danger"}`}>
                                <TrendArrow up={card.trendUp} />
                                <span>{card.trend} <span className="font-normal text-secondary-400">{card.trendLabel}</span></span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Main grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left column — Charts */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Knowledge Gap Chart */}
                    <Card
                        title="Knowledge Gap Analysis"
                        subtitle="Skill coverage vs organisational demand"
                        actions={<Badge variant="warning" dot>Needs Attention</Badge>}
                    >
                        <div className="space-y-4 mt-1">
                            {knowledgeGaps.map(({ skill, gap }) => (
                                <div key={skill}>
                                    <div className="flex justify-between items-center mb-1.5">
                                        <span className="text-sm text-secondary font-medium">{skill}</span>
                                        <span className="text-xs text-secondary-400">{gap}% gap</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-secondary-100 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${gap >= 70 ? "bg-danger" : gap >= 50 ? "bg-warning" : "bg-success"
                                                }`}
                                            style={{ width: `${gap}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-xs text-secondary-300 text-right">* Based on Q3 skills assessment data</p>
                    </Card>

                    {/* Training Progress */}
                    <Card
                        title="Training Progress"
                        subtitle="Completion rates by programme"
                        actions={<Badge variant="primary">August 2026</Badge>}
                    >
                        <div className="space-y-5 mt-1">
                            {trainingItems.map(({ label, pct, total, done }) => (
                                <div key={label}>
                                    <div className="flex justify-between items-end mb-1.5">
                                        <span className="text-sm font-medium text-secondary">{label}</span>
                                        <span className="text-xs text-secondary-400">{done}/{total} completed</span>
                                    </div>
                                    <div className="h-2.5 rounded-full bg-secondary-100 overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-primary transition-all duration-500"
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-secondary-400 mt-1">{pct}%</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                </div>

                {/* Right column — Recent Activity */}
                <div className="lg:col-span-1">
                    <Card title="Recent Activity" subtitle="Latest events across the platform" className="h-full">
                        <ul className="space-y-4 mt-1">
                            {activities.map((a, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    {/* Dot */}
                                    <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                                    <div>
                                        <p className="text-sm text-secondary">
                                            <span className="font-semibold">{a.user}</span>{" "}
                                            {a.action}.
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-secondary-400">{a.time}</span>
                                            <Badge variant={a.badge} size="sm">{a.badge}</Badge>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>

            </div>
        </div>
    );
};

export default DashboardPage;
