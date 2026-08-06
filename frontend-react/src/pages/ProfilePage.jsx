import Badge from "../components/Badge";
import Card from "../components/Card";

/* ── Static mock data ── */
const employee = {
    name: "Jane Doe",
    role: "HR Manager",
    department: "Human Resources",
    email: "jane.doe@company.com",
    phone: "+1 (555) 012-3456",
    location: "New York, NY",
    joinDate: "March 14, 2019",
    manager: "Robert Chen",
    employeeId: "EMP-00142",
    bio: "Passionate HR professional with 7+ years of experience driving talent development, employee engagement, and organisational culture initiatives across Fortune 500 environments.",

    skills: ["Talent Acquisition", "People Analytics", "HRIS", "Onboarding", "Compliance", "Conflict Resolution", "Performance Management", "D&I Programs"],

    experience: [
        { title: "HR Manager", company: "Acme Corp", period: "Mar 2019 – Present", desc: "Lead a team of 8 HR specialists managing 1,200+ employees across 4 offices." },
        { title: "HR Business Partner", company: "GlobalTech Inc.", period: "Jan 2016 – Feb 2019", desc: "Partnered with engineering and product divisions on workforce planning and OKR alignment." },
        { title: "HR Coordinator", company: "BrightPath Solutions", period: "Jun 2013 – Dec 2015", desc: "Managed end-to-end recruitment, on-boarding, and employee relations for a 300-person firm." },
    ],

    certifications: [
        { name: "SHRM-CP", issuer: "Society for Human Resource Management", year: "2021" },
        { name: "PHRi", issuer: "HR Certification Institute (HRCI)", year: "2019" },
        { name: "Lean Six Sigma – Green Belt", issuer: "ASQ", year: "2017" },
    ],
};

/* ── Helpers ── */
const Field = ({ label, value }) => (
    <div>
        <p className="text-xs font-medium text-secondary-400 uppercase tracking-wide">{label}</p>
        <p className="mt-0.5 text-sm text-secondary font-medium">{value}</p>
    </div>
);

const SectionHeading = ({ children }) => (
    <h2 className="text-base font-semibold text-secondary mb-4 pb-2 border-b border-secondary-100">
        {children}
    </h2>
);

const ProfilePage = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-6">

            {/* ── Hero card ── */}
            <Card className="overflow-hidden">
                {/* Banner */}
                <div className="h-24 bg-gradient-to-r from-primary via-primary-700 to-secondary-900 -mx-6 -mt-5 rounded-t-xl" />

                {/* Avatar + headline */}
                <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10 px-0">
                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-700 border-4 border-white shadow-md flex items-center justify-center text-white text-2xl font-bold select-none shrink-0">
                        JD
                    </div>

                    <div className="flex-1 pb-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="text-xl font-bold text-secondary">{employee.name}</h1>
                            <Badge variant="primary" size="md">{employee.role}</Badge>
                        </div>
                        <p className="mt-0.5 text-sm text-secondary-400">{employee.department} · {employee.location}</p>
                    </div>

                    <div className="shrink-0 pb-1">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary-400 bg-secondary-50 border border-secondary-200 rounded-full px-3 py-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-success" />
                            Active Employee
                        </span>
                    </div>
                </div>

                {/* Bio */}
                {employee.bio && (
                    <p className="mt-5 text-sm text-secondary-500 leading-relaxed">{employee.bio}</p>
                )}
            </Card>

            {/* ── Personal Info ── */}
            <Card>
                <SectionHeading>Personal Information</SectionHeading>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5">
                    <Field label="Full Name" value={employee.name} />
                    <Field label="Employee ID" value={employee.employeeId} />
                    <Field label="Email" value={employee.email} />
                    <Field label="Phone" value={employee.phone} />
                    <Field label="Location" value={employee.location} />
                    <Field label="Joined" value={employee.joinDate} />
                </div>
            </Card>

            {/* ── Department & Role ── */}
            <Card>
                <SectionHeading>Department & Role</SectionHeading>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5">
                    <Field label="Department" value={employee.department} />
                    <Field label="Job Title" value={employee.role} />
                    <Field label="Reporting Manager" value={employee.manager} />
                </div>
            </Card>

            {/* ── Skills ── */}
            <Card>
                <SectionHeading>Skills</SectionHeading>
                <div className="flex flex-wrap gap-2">
                    {employee.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" size="md">{skill}</Badge>
                    ))}
                </div>
            </Card>

            {/* ── Experience ── */}
            <Card>
                <SectionHeading>Experience</SectionHeading>
                <div className="relative space-y-6 pl-5 before:absolute before:top-1 before:left-[7px] before:bottom-1 before:w-px before:bg-secondary-200">
                    {employee.experience.map((exp, i) => (
                        <div key={i} className="relative">
                            {/* Timeline dot */}
                            <span className="absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full border-2 border-primary bg-white" />

                            <p className="text-sm font-semibold text-secondary">{exp.title}</p>
                            <p className="text-xs font-medium text-primary mt-0.5">{exp.company}</p>
                            <p className="text-xs text-secondary-400 mt-0.5">{exp.period}</p>
                            <p className="text-sm text-secondary-500 mt-1.5 leading-relaxed">{exp.desc}</p>
                        </div>
                    ))}
                </div>
            </Card>

            {/* ── Certifications ── */}
            <Card>
                <SectionHeading>Certifications</SectionHeading>
                <div className="space-y-3">
                    {employee.certifications.map((cert, i) => (
                        <div key={i} className="flex items-center justify-between py-3 px-4 rounded-lg bg-secondary-50 border border-secondary-100">
                            <div className="flex items-center gap-3">
                                {/* Badge icon */}
                                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary">
                                        <path fillRule="evenodd" d="M10 1a.75.75 0 01.671.415l1.93 3.91 4.31.627a.75.75 0 01.416 1.279l-3.12 3.042.737 4.296a.75.75 0 01-1.088.791L10 13.347l-3.856 2.027a.75.75 0 01-1.088-.79l.737-4.297-3.12-3.042a.75.75 0 01.416-1.28l4.31-.626L9.33 1.415A.75.75 0 0110 1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-secondary">{cert.name}</p>
                                    <p className="text-xs text-secondary-400">{cert.issuer}</p>
                                </div>
                            </div>
                            <Badge variant="success" size="sm" dot>{cert.year}</Badge>
                        </div>
                    ))}
                </div>
            </Card>

        </div>
    );
};

export default ProfilePage;
