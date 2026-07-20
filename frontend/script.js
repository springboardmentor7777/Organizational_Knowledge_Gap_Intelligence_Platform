const authViews = ["view-login", "view-register", "view-forgot", "view-dashboard"];

function switchView(viewId) {
  authViews.forEach((id) => document.getElementById(id).classList.add("hidden"));
  document.getElementById(viewId).classList.remove("hidden");

  if (viewId === "view-dashboard") {
    document.body.classList.add("in-app");
  } else {
    document.body.classList.remove("in-app");
  }
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-nav]");
  if (trigger) {
    switchView(trigger.dataset.nav);
  }
});



document.getElementById("form-login").addEventListener("submit", (event) => {
  event.preventDefault();
  switchView("view-dashboard");
});

document.getElementById("form-register").addEventListener("submit", (event) => {
  event.preventDefault();
  switchView("view-login");
});

document.getElementById("form-forgot").addEventListener("submit", (event) => {
  event.preventDefault();
  switchView("view-login");
});



const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");
const topbarTitle = document.getElementById("topbar-title");

function goToPage(targetId) {
  navItems.forEach((el) => el.classList.remove("is-active"));
  const matchingNav = Array.from(navItems).find((el) => el.dataset.page === targetId);
  if (matchingNav) {
    matchingNav.classList.add("is-active");
    topbarTitle.textContent = matchingNav.querySelector("span").textContent;
  }

  pages.forEach((page) => page.classList.add("hidden"));
  document.getElementById(targetId).classList.remove("hidden");

  document.getElementById("sidebar").classList.remove("is-open");
}

navItems.forEach((item) => {
  item.addEventListener("click", () => goToPage(item.dataset.page));
});

document.addEventListener("click", (event) => {
  const jumpTrigger = event.target.closest("[data-page-jump]");
  if (jumpTrigger) {
    goToPage(jumpTrigger.dataset.pageJump);
  }
});



document.getElementById("sidebar-toggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("is-open");
});



document.addEventListener("DOMContentLoaded", () => {
  switchView("view-login");
});


const editBtn = document.getElementById("edit-profile-btn");

const form = document.getElementById("profile-edit-form");

const saveBtn = document.getElementById("save-profile");

const cancelBtn = document.getElementById("cancel-profile");

const profileName = document.getElementById("profile-name");

const profileRole = document.getElementById("profile-role");

const profileEmail = document.getElementById("profile-email");

editBtn.addEventListener("click", () => {

    form.classList.remove("hidden");

    document.getElementById("edit-name").value =
        profileName.textContent;

    document.getElementById("edit-role").value =
        profileRole.textContent;

    document.getElementById("edit-email").value =
        profileEmail.textContent.replace("✉ ", "");

});

saveBtn.addEventListener("click", () => {

    profileName.textContent =
        document.getElementById("edit-name").value;

    profileRole.textContent =
        document.getElementById("edit-role").value;

    profileEmail.innerHTML =
        '<i class="fa-regular fa-envelope"></i> ' +
        document.getElementById("edit-email").value;

    form.classList.add("hidden");

});

cancelBtn.addEventListener("click", () => {

    form.classList.add("hidden");

});


const DEPARTMENTS = ["Engineering", "Product", "Design", "Sales", "Marketing", "HR"];

const SKILL_CATEGORIES = ["Technical", "Analytical", "Communication", "Leadership", "Compliance", "Innovation"];

const CORE_SKILLS = [
  "Cloud Architecture", "Data Governance", "Stakeholder Communication", "Agile Delivery",
  "Security Fundamentals", "System Design", "Data Analysis", "UX Research"
];

const SKILL_CATEGORY_MAP = {
  "Cloud Architecture": "Technical",
  "Data Governance": "Compliance",
  "Stakeholder Communication": "Communication",
  "Agile Delivery": "Leadership",
  "Security Fundamentals": "Technical",
  "System Design": "Technical",
  "Data Analysis": "Analytical",
  "UX Research": "Analytical"
};

const SKILLS_INVENTORY = [
  { employee: "Priya Nair", department: "Engineering", skill: "Cloud Architecture", current: 2, required: 4 },
  { employee: "Priya Nair", department: "Engineering", skill: "System Design", current: 4, required: 4 },
  { employee: "Rahul Verma", department: "Engineering", skill: "Security Fundamentals", current: 2, required: 4 },
  { employee: "Rahul Verma", department: "Engineering", skill: "Cloud Architecture", current: 3, required: 4 },
  { employee: "Arjun Singh", department: "Engineering", skill: "System Design", current: 3, required: 5 },
  { employee: "Arjun Singh", department: "Engineering", skill: "Data Governance", current: 1, required: 3 },
  { employee: "Ananya Iyer", department: "Product", skill: "Stakeholder Communication", current: 3, required: 4 },
  { employee: "Ananya Iyer", department: "Product", skill: "Data Analysis", current: 2, required: 4 },
  { employee: "Divya Menon", department: "Product", skill: "Agile Delivery", current: 4, required: 4 },
  { employee: "Divya Menon", department: "Product", skill: "Stakeholder Communication", current: 3, required: 3 },
  { employee: "Karan Mehta", department: "Design", skill: "UX Research", current: 4, required: 5 },
  { employee: "Karan Mehta", department: "Design", skill: "Stakeholder Communication", current: 2, required: 4 },
  { employee: "Sara Thomas", department: "Sales", skill: "Stakeholder Communication", current: 4, required: 4 },
  { employee: "Sara Thomas", department: "Sales", skill: "Data Analysis", current: 1, required: 3 },
  { employee: "Rohan Gupta", department: "Sales", skill: "Agile Delivery", current: 2, required: 3 },
  { employee: "Rohan Gupta", department: "Sales", skill: "Data Governance", current: 1, required: 3 },
  { employee: "Vikram Rao", department: "Marketing", skill: "Data Analysis", current: 3, required: 4 },
  { employee: "Vikram Rao", department: "Marketing", skill: "UX Research", current: 2, required: 3 },
  { employee: "Neha Kapoor", department: "HR", skill: "Data Governance", current: 2, required: 4 },
  { employee: "Neha Kapoor", department: "HR", skill: "Stakeholder Communication", current: 4, required: 4 }
];

const RECOMMENDATIONS = [
  { icon: "fa-cloud", title: "AWS Solutions Architect — Associate", provider: "AWS Training", difficulty: "Intermediate", duration: "6 weeks", rating: 4.7, description: "Design resilient, high-performing cloud architectures on AWS.", skills: ["Cloud Architecture", "System Design"] },
  { icon: "fa-shield-halved", title: "Security Fundamentals for Engineers", provider: "Coursera", difficulty: "Beginner", duration: "4 weeks", rating: 4.5, description: "Core application and infrastructure security practices for engineering teams.", skills: ["Security Fundamentals"] },
  { icon: "fa-database", title: "Data Governance Foundations", provider: "Udemy", difficulty: "Beginner", duration: "3 weeks", rating: 4.3, description: "Establish policies and controls for trustworthy organizational data.", skills: ["Data Governance", "Compliance"] },
  { icon: "fa-people-arrows", title: "Executive Stakeholder Communication", provider: "LinkedIn Learning", difficulty: "Intermediate", duration: "2 weeks", rating: 4.6, description: "Frameworks for communicating clearly with cross-functional stakeholders.", skills: ["Stakeholder Communication"] },
  { icon: "fa-chart-line", title: "Applied Data Analysis with SQL", provider: "DataCamp", difficulty: "Intermediate", duration: "5 weeks", rating: 4.4, description: "Practical querying and analysis techniques for day-to-day decisions.", skills: ["Data Analysis"] },
  { icon: "fa-diagram-project", title: "Agile Delivery in Practice", provider: "Scrum.org", difficulty: "Beginner", duration: "3 weeks", rating: 4.2, description: "Run effective sprints, backlogs, and retrospectives.", skills: ["Agile Delivery"] },
  { icon: "fa-magnifying-glass", title: "UX Research Methods", provider: "Coursera", difficulty: "Intermediate", duration: "4 weeks", rating: 4.8, description: "Plan and run user interviews, usability tests, and synthesis.", skills: ["UX Research"] },
  { icon: "fa-server", title: "System Design Interview Prep", provider: "Educative", difficulty: "Advanced", duration: "6 weeks", rating: 4.7, description: "Design large-scale distributed systems with real-world trade-offs.", skills: ["System Design", "Cloud Architecture"] }
];

const LEARNING_PATH = [
  { course: "Security Fundamentals for Engineers", duration: "4 weeks", status: "complete", progress: 100 },
  { course: "Data Governance Foundations", duration: "3 weeks", status: "complete", progress: 100 },
  { course: "Agile Delivery in Practice", duration: "3 weeks", status: "complete", progress: 100 },
  { course: "Applied Data Analysis with SQL", duration: "5 weeks", status: "complete", progress: 100 },
  { course: "AWS Solutions Architect — Associate", duration: "6 weeks", status: "active", progress: 68 },
  { course: "System Design Interview Prep", duration: "6 weeks", status: "pending", progress: 0 },
  { course: "Executive Stakeholder Communication", duration: "2 weeks", status: "pending", progress: 0 }
];

const CATALOG = [
  { icon: "fa-cloud", title: "AWS Solutions Architect — Associate", provider: "AWS Training", rating: 4.7, duration: "6 weeks", level: "Intermediate", category: "Cloud", difficulty: "Intermediate" },
  { icon: "fa-shield-halved", title: "Security Fundamentals for Engineers", provider: "Coursera", rating: 4.5, duration: "4 weeks", level: "Beginner", category: "Security", difficulty: "Beginner" },
  { icon: "fa-database", title: "Data Governance Foundations", provider: "Udemy", rating: 4.3, duration: "3 weeks", level: "Beginner", category: "Data", difficulty: "Beginner" },
  { icon: "fa-people-arrows", title: "Executive Stakeholder Communication", provider: "LinkedIn Learning", rating: 4.6, duration: "2 weeks", level: "Intermediate", category: "Communication", difficulty: "Intermediate" },
  { icon: "fa-chart-line", title: "Applied Data Analysis with SQL", provider: "DataCamp", rating: 4.4, duration: "5 weeks", level: "Intermediate", category: "Data", difficulty: "Intermediate" },
  { icon: "fa-diagram-project", title: "Agile Delivery in Practice", provider: "Scrum.org", rating: 4.2, duration: "3 weeks", level: "Beginner", category: "Leadership", difficulty: "Beginner" },
  { icon: "fa-magnifying-glass", title: "UX Research Methods", provider: "Coursera", rating: 4.8, duration: "4 weeks", level: "Intermediate", category: "Design", difficulty: "Intermediate" },
  { icon: "fa-server", title: "System Design Interview Prep", provider: "Educative", rating: 4.7, duration: "6 weeks", level: "Advanced", category: "Cloud", difficulty: "Advanced" },
  { icon: "fa-code", title: "Kubernetes Fundamentals", provider: "Linux Foundation", rating: 4.5, duration: "5 weeks", level: "Intermediate", category: "Cloud", difficulty: "Intermediate" },
  { icon: "fa-lock", title: "Compliance & Data Privacy Essentials", provider: "Udemy", rating: 4.1, duration: "2 weeks", level: "Beginner", category: "Security", difficulty: "Beginner" },
  { icon: "fa-comments", title: "Negotiation Skills for Managers", provider: "LinkedIn Learning", rating: 4.4, duration: "2 weeks", level: "Intermediate", category: "Leadership", difficulty: "Intermediate" },
  { icon: "fa-palette", title: "Advanced Product Design Systems", provider: "Coursera", rating: 4.6, duration: "5 weeks", level: "Advanced", category: "Design", difficulty: "Advanced" }
];

const REPORTS = [
  { icon: "fa-magnifying-glass-chart", title: "Skill Gap Report", desc: "Organization-wide summary of current skill gaps by department and priority." },
  { icon: "fa-building", title: "Department Report", desc: "Headcount, skill coverage, and training status broken down by department." },
  { icon: "fa-graduation-cap", title: "Learning Progress Report", desc: "Completion rates and time-in-progress across every active learning path." },
  { icon: "fa-user-check", title: "Employee Performance Report", desc: "Individual skill growth and assessment outcomes over the last quarter." }
];

function populateSelect(select, values) {
  values.forEach((value) => {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = value;
    select.appendChild(opt);
  });
}

function gapPercentFor(row) {
  if (row.required === 0) return 0;
  return Math.max(0, Math.round(((row.required - row.current) / row.required) * 100));
}

function priorityFor(gapPercent) {
  if (gapPercent >= 40) return "High";
  if (gapPercent >= 15) return "Medium";
  return "Low";
}

function pillClassForPriority(priority) {
  if (priority === "High") return "pill--high";
  if (priority === "Medium") return "pill--medium";
  return "pill--low";
}

function heatClassForPercent(percent) {
  if (percent < 50) return "heat-0";
  if (percent < 65) return "heat-1";
  if (percent < 80) return "heat-2";
  if (percent < 90) return "heat-3";
  return "heat-4";
}

const skillsSearchEl = document.getElementById("skills-search");
const skillsDeptFilterEl = document.getElementById("skills-dept-filter");
const skillsCategoryFilterEl = document.getElementById("skills-category-filter");
const skillsTableBody = document.getElementById("skills-table-body");
const skillsEmptyEl = document.getElementById("skills-empty");

function statusForSkillRow(row) {
  if (row.current >= row.required) return { label: "Proficient", cls: "pill--low" };
  const gap = gapPercentFor(row);
  if (gap < 25) return { label: "Developing", cls: "pill--medium" };
  return { label: "Needs Training", cls: "pill--high" };
}

function renderSkillsTable() {
  const term = skillsSearchEl.value.trim().toLowerCase();
  const dept = skillsDeptFilterEl.value;
  const category = skillsCategoryFilterEl.value;

  const filtered = SKILLS_INVENTORY.filter((row) => {
    const matchesTerm = !term || row.employee.toLowerCase().includes(term) || row.skill.toLowerCase().includes(term);
    const matchesDept = !dept || row.department === dept;
    const matchesCategory = !category || SKILL_CATEGORY_MAP[row.skill] === category;
    return matchesTerm && matchesDept && matchesCategory;
  });

  skillsTableBody.innerHTML = filtered.map((row) => {
    const status = statusForSkillRow(row);
    return `
      <tr>
        <td class="cell-strong">${row.employee}</td>
        <td>${row.department}</td>
        <td>${row.skill}</td>
        <td>${row.current} / 5</td>
        <td>${row.required} / 5</td>
        <td><span class="pill ${status.cls}">${status.label}</span></td>
        <td><button type="button" class="table-action-btn">View</button></td>
      </tr>`;
  }).join("");

  skillsEmptyEl.classList.toggle("hidden", filtered.length > 0);
}

populateSelect(skillsDeptFilterEl, DEPARTMENTS);
populateSelect(skillsCategoryFilterEl, SKILL_CATEGORIES);
[skillsSearchEl, skillsDeptFilterEl, skillsCategoryFilterEl].forEach((el) => {
  el.addEventListener("input", renderSkillsTable);
  el.addEventListener("change", renderSkillsTable);
});
renderSkillsTable();

const gapSearchEl = document.getElementById("gap-search");
const gapDeptFilterEl = document.getElementById("gap-dept-filter");
const gapSkillFilterEl = document.getElementById("gap-skill-filter");
const gapTableBody = document.getElementById("gap-table-body");
const gapEmptyEl = document.getElementById("gap-empty");
const gapCountHigh = document.getElementById("gap-count-high");
const gapCountMedium = document.getElementById("gap-count-medium");
const gapCountLow = document.getElementById("gap-count-low");

function statusForGapPriority(priority, gapPercent) {
  if (gapPercent === 0) return { label: "Resolved", cls: "pill--complete" };
  if (priority === "High") return { label: "Not Started", cls: "pill--high" };
  if (priority === "Medium") return { label: "In Progress", cls: "pill--medium" };
  return { label: "On Track", cls: "pill--low" };
}

function renderGapTable() {
  const term = gapSearchEl.value.trim().toLowerCase();
  const dept = gapDeptFilterEl.value;
  const skill = gapSkillFilterEl.value;

  const filtered = SKILLS_INVENTORY.filter((row) => {
    const matchesTerm = !term || row.employee.toLowerCase().includes(term);
    const matchesDept = !dept || row.department === dept;
    const matchesSkill = !skill || row.skill === skill;
    return matchesTerm && matchesDept && matchesSkill;
  });

  let high = 0, medium = 0, low = 0;

  gapTableBody.innerHTML = filtered.map((row) => {
    const gapPercent = gapPercentFor(row);
    const priority = priorityFor(gapPercent);
    if (priority === "High") high++; else if (priority === "Medium") medium++; else low++;
    const status = statusForGapPriority(priority, gapPercent);

    return `
      <tr>
        <td class="cell-strong">${row.employee}</td>
        <td>${row.skill}</td>
        <td>${row.current} / 5</td>
        <td>${row.required} / 5</td>
        <td>
          <div class="mini-progress">
            <div class="progress-track"><div class="progress-fill" style="width:${gapPercent}%"></div></div>
            <span>${gapPercent}%</span>
          </div>
        </td>
        <td><span class="pill ${pillClassForPriority(priority)}">${priority}</span></td>
        <td><span class="pill ${status.cls}">${status.label}</span></td>
      </tr>`;
  }).join("");

  gapCountHigh.textContent = high;
  gapCountMedium.textContent = medium;
  gapCountLow.textContent = low;
  gapEmptyEl.classList.toggle("hidden", filtered.length > 0);
}

populateSelect(gapDeptFilterEl, DEPARTMENTS);
populateSelect(gapSkillFilterEl, CORE_SKILLS);
[gapSearchEl, gapDeptFilterEl, gapSkillFilterEl].forEach((el) => {
  el.addEventListener("input", renderGapTable);
  el.addEventListener("change", renderGapTable);
});
renderGapTable();


const heatmapDeptFilterEl = document.getElementById("heatmap-dept-filter");
const departmentHeatmapGrid = document.getElementById("department-heatmap-grid");
const skillHeatmapGrid = document.getElementById("skill-heatmap-grid");

const DEPT_HEATMAP_DATA = {
  Engineering: { Technical: 82, Analytical: 70, Communication: 58, Leadership: 55, Compliance: 61, Innovation: 74 },
  Product: { Technical: 60, Analytical: 78, Communication: 80, Leadership: 68, Compliance: 57, Innovation: 71 },
  Design: { Technical: 52, Analytical: 66, Communication: 74, Leadership: 60, Compliance: 48, Innovation: 83 },
  Sales: { Technical: 40, Analytical: 62, Communication: 88, Leadership: 65, Compliance: 55, Innovation: 58 },
  Marketing: { Technical: 45, Analytical: 73, Communication: 79, Leadership: 62, Compliance: 50, Innovation: 76 },
  HR: { Technical: 38, Analytical: 55, Communication: 84, Leadership: 71, Compliance: 80, Innovation: 49 }
};

const SKILL_HEATMAP_DATA = {
  "Cloud Architecture": { Engineering: 78, Product: 45, Design: 30, Sales: 20, Marketing: 25, HR: 18 },
  "Data Governance": { Engineering: 60, Product: 55, Design: 35, Sales: 40, Marketing: 42, HR: 68 },
  "Stakeholder Communication": { Engineering: 58, Product: 80, Design: 74, Sales: 88, Marketing: 79, HR: 84 },
  "Agile Delivery": { Engineering: 75, Product: 82, Design: 65, Sales: 50, Marketing: 55, HR: 48 },
  "Security Fundamentals": { Engineering: 70, Product: 48, Design: 32, Sales: 28, Marketing: 30, HR: 44 },
  "System Design": { Engineering: 85, Product: 50, Design: 40, Sales: 22, Marketing: 26, HR: 20 },
  "Data Analysis": { Engineering: 66, Product: 76, Design: 55, Sales: 60, Marketing: 71, HR: 50 },
  "UX Research": { Engineering: 40, Product: 68, Design: 88, Sales: 35, Marketing: 60, HR: 33 }
};

function renderHeatmap(container, rowLabels, colLabels, dataObject) {
  container.style.gridTemplateColumns = `150px repeat(${colLabels.length}, 1fr)`;

  const headerCells = [`<div></div>`].concat(
    colLabels.map((label) => `<div class="heatmap-col-label">${label}</div>`)
  );

  const bodyRows = rowLabels.map((rowLabel) => {
    const cells = colLabels.map((colLabel) => {
      const value = dataObject[rowLabel][colLabel];
      return `<div class="heatmap-cell ${heatClassForPercent(value)}" title="${rowLabel} — ${colLabel}: ${value}%">${value}%</div>`;
    }).join("");
    return `<div class="heatmap-row-label">${rowLabel}</div>${cells}`;
  }).join("");

  container.innerHTML = headerCells.join("") + bodyRows;
}

function renderDepartmentHeatmap() {
  const dept = heatmapDeptFilterEl.value;
  const rows = dept ? [dept] : DEPARTMENTS;
  renderHeatmap(departmentHeatmapGrid, rows, SKILL_CATEGORIES, DEPT_HEATMAP_DATA);
}

function renderSkillHeatmap() {
  renderHeatmap(skillHeatmapGrid, CORE_SKILLS, DEPARTMENTS, SKILL_HEATMAP_DATA);
}

populateSelect(heatmapDeptFilterEl, DEPARTMENTS);
heatmapDeptFilterEl.addEventListener("change", renderDepartmentHeatmap);
renderDepartmentHeatmap();
renderSkillHeatmap();

const recommendationsGrid = document.getElementById("recommendations-grid");

function renderRecommendations() {
  recommendationsGrid.innerHTML = RECOMMENDATIONS.map((rec) => `
    <div class="rec-card">
      <div class="rec-card-head">
        <div class="rec-icon"><i class="fa-solid ${rec.icon}"></i></div>
        <div>
          <p class="rec-title">${rec.title}</p>
          <p class="rec-provider">${rec.provider}</p>
        </div>
      </div>
      <div class="rec-meta">
        <span class="pill pill--neutral">${rec.difficulty}</span>
        <span class="pill pill--neutral"><i class="fa-regular fa-clock"></i>&nbsp; ${rec.duration}</span>
        <span class="rec-rating"><i class="fa-solid fa-star"></i> ${rec.rating.toFixed(1)}</span>
      </div>
      <p class="rec-desc">${rec.description}</p>
      <div class="rec-skills">
        ${rec.skills.map((s) => `<span class="skill-badge">${s}</span>`).join("")}
      </div>
      <div class="rec-actions">
        <button type="button" class="btn-secondary">View Details</button>
        <button type="button" class="btn-primary">Start Learning</button>
      </div>
    </div>
  `).join("");
}

renderRecommendations();

const learningPathTimeline = document.getElementById("learning-path-timeline");
const overallPathLabel = document.getElementById("overall-path-label");
const overallPathPercent = document.getElementById("overall-path-percent");
const overallPathFill = document.getElementById("overall-path-fill");

function renderLearningPath() {
  const completedCount = LEARNING_PATH.filter((s) => s.status === "complete").length;
  const overallPercent = Math.round(
    LEARNING_PATH.reduce((sum, s) => sum + s.progress, 0) / LEARNING_PATH.length
  );

  overallPathLabel.textContent = `${completedCount} of ${LEARNING_PATH.length} steps complete`;
  overallPathPercent.textContent = `${overallPercent}%`;
  overallPathFill.style.width = `${overallPercent}%`;

  learningPathTimeline.innerHTML = LEARNING_PATH.map((step) => {
    const markerClass = step.status === "complete" ? "is-complete" : step.status === "active" ? "is-active" : "is-pending";
    const markerIcon = step.status === "complete" ? "fa-check" : step.status === "active" ? "fa-play" : "fa-clock";
    const statusPill = step.status === "complete" ? '<span class="pill pill--complete">Complete</span>'
      : step.status === "active" ? '<span class="pill pill--medium">In Progress</span>'
      : '<span class="pill pill--neutral">Pending</span>';

    return `
      <div class="timeline-item">
        <div class="timeline-track">
          <div class="timeline-marker ${markerClass}"><i class="fa-solid ${markerIcon}"></i></div>
          <div class="timeline-connector"></div>
        </div>
        <div class="timeline-content">
          <div class="timeline-content-top">
            <div>
              <p class="timeline-course">${step.course}</p>
              <p class="timeline-duration">${step.duration}</p>
            </div>
            ${statusPill}
          </div>
          <div class="progress-track"><div class="progress-fill" style="width:${step.progress}%"></div></div>
        </div>
      </div>`;
  }).join("");
}

renderLearningPath();

const catalogSearchEl = document.getElementById("catalog-search");
const catalogCategoryFilterEl = document.getElementById("catalog-category-filter");
const catalogDifficultyFilterEl = document.getElementById("catalog-difficulty-filter");
const catalogGrid = document.getElementById("catalog-grid");
const catalogEmptyEl = document.getElementById("catalog-empty");

function renderCatalog() {
  const term = catalogSearchEl.value.trim().toLowerCase();
  const category = catalogCategoryFilterEl.value;
  const difficulty = catalogDifficultyFilterEl.value;

  const filtered = CATALOG.filter((course) => {
    const matchesTerm = !term || course.title.toLowerCase().includes(term) || course.provider.toLowerCase().includes(term);
    const matchesCategory = !category || course.category === category;
    const matchesDifficulty = !difficulty || course.difficulty === difficulty;
    return matchesTerm && matchesCategory && matchesDifficulty;
  });

  catalogGrid.innerHTML = filtered.map((course) => `
    <div class="course-card">
      <div class="course-icon"><i class="fa-solid ${course.icon}"></i></div>
      <p class="course-title">${course.title}</p>
      <p class="course-provider">${course.provider}</p>
      <div class="course-meta">
        <span class="rec-rating"><i class="fa-solid fa-star"></i> ${course.rating.toFixed(1)}</span>
        <span class="pill pill--neutral"><i class="fa-regular fa-clock"></i>&nbsp; ${course.duration}</span>
        <span class="pill pill--neutral">${course.level}</span>
      </div>
      <button type="button" class="btn-primary course-enroll">Enroll</button>
    </div>
  `).join("");

  catalogEmptyEl.classList.toggle("hidden", filtered.length > 0);
}

populateSelect(catalogCategoryFilterEl, [...new Set(CATALOG.map((c) => c.category))]);
populateSelect(catalogDifficultyFilterEl, [...new Set(CATALOG.map((c) => c.difficulty))]);
[catalogSearchEl, catalogCategoryFilterEl, catalogDifficultyFilterEl].forEach((el) => {
  el.addEventListener("input", renderCatalog);
  el.addEventListener("change", renderCatalog);
});
renderCatalog();

const reportsGrid = document.getElementById("reports-grid");

function renderReports() {
  reportsGrid.innerHTML = REPORTS.map((report) => `
    <div class="report-card">
      <div class="report-icon"><i class="fa-solid ${report.icon}"></i></div>
      <p class="report-title">${report.title}</p>
      <p class="report-desc">${report.desc}</p>
      <div class="report-actions">
        <button type="button" class="btn-secondary" title="Connects once the Reporting service is live">View</button>
        <button type="button" class="btn-secondary" title="Connects once the Reporting service is live"><i class="fa-solid fa-file-pdf"></i> PDF</button>
        <button type="button" class="btn-secondary" title="Connects once the Reporting service is live"><i class="fa-solid fa-file-excel"></i> Excel</button>
      </div>
    </div>
  `).join("");
}

renderReports();

function renderDashboardExtras() {
  const recentRecsEl = document.getElementById("dashboard-recent-recs");
  if (recentRecsEl) {
    recentRecsEl.innerHTML = RECOMMENDATIONS.slice(0, 3).map((rec) => `
      <li>
        <div class="activity-icon"><i class="fa-solid ${rec.icon}"></i></div>
        <div>
          <p><strong>${rec.title}</strong> recommended · ${rec.provider}</p>
          <span class="activity-time">${rec.duration} · ${rec.difficulty}</span>
        </div>
      </li>`).join("");
  }

  const deptPerfEl = document.getElementById("dashboard-dept-performance");
  if (deptPerfEl) {
    deptPerfEl.innerHTML = DEPARTMENTS.map((dept) => {
      const scores = Object.values(DEPT_HEATMAP_DATA[dept]);
      const avg = Math.round(scores.reduce((sum, v) => sum + v, 0) / scores.length);
      return `
        <div class="dept-perf-row">
          <div class="dept-perf-top"><strong>${dept}</strong><span>${avg}%</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:${avg}%"></div></div>
        </div>`;
    }).join("");
  }

  const learningOverviewEl = document.getElementById("dashboard-learning-overview");
  if (learningOverviewEl) {
    const relevantSteps = LEARNING_PATH.filter((s) => s.status !== "pending").slice(-3);
    learningOverviewEl.innerHTML = relevantSteps.map((step) => `
      <div class="progress-row">
        <div class="progress-label"><span>${step.course}</span><span>${step.progress}%</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${step.progress}%"></div></div>
      </div>`).join("");
  }
}

renderDashboardExtras();

function renderProfileExtras() {
  const recommendedCoursesEl = document.getElementById("profile-recommended-courses");
  if (recommendedCoursesEl) {
    recommendedCoursesEl.innerHTML = RECOMMENDATIONS.slice(0, 4).map((rec) =>
      `<span class="skill-badge">${rec.title}</span>`
    ).join("");
  }

  const upcomingPathEl = document.getElementById("profile-upcoming-path");
  if (upcomingPathEl) {
    const upcoming = LEARNING_PATH.filter((s) => s.status !== "complete");
    upcomingPathEl.innerHTML = upcoming.map((step) => `
      <li>
        <span class="mini-path-dot"></span>
        <span>${step.course}</span>
        <span class="mini-path-date">${step.duration}</span>
      </li>`).join("");
  }
}

renderProfileExtras();


const settingsSaveBtn = document.getElementById("settings-save");
if (settingsSaveBtn) {
  settingsSaveBtn.addEventListener("click", () => {
    const originalText = settingsSaveBtn.textContent;
    settingsSaveBtn.textContent = "Saved";
    setTimeout(() => { settingsSaveBtn.textContent = originalText; }, 1500);
  });
}
