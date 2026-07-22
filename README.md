# Organizational Knowledge Gap Intelligence Platform (OrgKnow)

An Enterprise Full-Stack Platform designed to identify expertise gaps across departments, recommend targeted training programs (AI-driven), and measure workforce learning effectiveness.

---

## 🎯 Milestone 2: Week 3 & 4 — Gap Analysis Engine & Training Recommendation System

### 📌 Overview & Scope
Milestone 2 delivers the core intelligence capabilities of the platform:
1. **Automated Multi-Dimensional Knowledge Gap Analysis**
2. **Cross-Department Heatmap & Severity Risk Flagging**
3. **AI/LLM-Driven Training Recommendation Engine**
4. **Milestone-Based Learning Paths & Custom Path Builder**
5. **Integrated Catalog (External LMS & Internal Training)**

---

## ✨ Features Implemented in Milestone 2

### 1. 🧠 Multi-Dimensional Knowledge Gap Analysis Engine
- **Evaluation Dimensions**:
  - **Individual vs. Role Requirements**: Compares employee skills against baseline role expectations.
  - **Team vs. Project Demands**: Assesses team capability against upcoming project deliverables.
  - **Department vs. Strategic Goals**: Evaluates department readiness for organization-wide strategic targets.
  - **Current vs. Future AI Skills (Strategic Forecast)**: Identifies emerging skill deficits (e.g. LLMOps, RAG Systems, Cloud Resilience).
- **Severity Scoring**: Automated calculation (`Critical Risk`, `High Gap`, `Medium Gap`, `On Track`).
- **Interactive Intervention**: Direct 1-click trigger to generate AI learning interventions for any identified skill deficit.

### 2. 🗺️ Cross-Department Gap Heatmap & Severity Gauge
- **Interactive Heatmap Matrix**: Displays cross-department skill gaps across Engineering, Product, Design, Sales, Marketing, and Data Science.
- **Filtering & Search**: Dynamic department selector and search bar.
- **Drill-down Modal**: Clicking any heatmap cell reveals impacted employee headcount, target vs. current level, assessment breakdown, and remediation options.
- **Overall Gap Index Gauge**: SVG arc gauge with needle animation tracking organizational health.

### 3. 🤖 AI Training Recommendation System
- **Relevance Ranking**: AI match score percentage (`98% Match`), gap alignment score, and explicit *Why Recommended* explanations.
- **Live AI Recalculation**: Simulated LLM recommendation engine that recalculates top picks dynamically on button press.
- **Course Enrollment**: 1-click enrollment with real-time feedback and state persistence.

### 4. 🚀 Learning Paths & Custom Path Builder
- **Milestone Roadmaps**: Interactive step-by-step progress tracking (with completion percentage recalculation).
- **Custom Path Builder**: Form modal to create custom learning paths with milestone steps.
- **AI Auto-Fill**: Automatically generates a 4-step milestone roadmap tailored to a selected role or target skill.

### 5. 📚 External & Internal LMS Catalog Integration
- **Platform Provider Support**: Coursera, Udemy, LinkedIn Learning, AWS Skill Builder, Pluralsight, and Internal Catalog.
- **Direct External Launcher**: Open external courses directly in provider tabs.
- **Debounced Search & Filtering**: Multi-select filter by Category, Provider Type (External vs. Internal), and Difficulty.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion, Recharts, Lucide Icons, React Hot Toast.
- **State Management**: Centralized React Context (`GapContext`) providing multi-dimensional calculations, course enrollment tracking, and path generation.
- **Database (DDL)**: PostgreSQL schema (`01_schema.sql`) & Seed Data (`02_seed_data.sql`) in `db_script/`.

---

## 🚀 How to Run the Platform

### 1. Prerequisites
- **Node.js**: v18+ or v20+
- **npm** installed

### 2. Launch Frontend Application
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (if not already installed)
npm install

# Start local development server
npm run dev
```
The application will launch locally at: **`http://localhost:5173/`**

### 3. Quick Demo Login Credentials
Navigate to `http://localhost:5173/login` and click any quick-login button:
- **`EMPLOYEE`** (Alex Johnson)
- **`MANAGER`** (Sarah Jenkins)
- **`HR`** (David Miller)
- **`ADMIN`** (Elena Rostova)

---

## 🔗 Key Navigation Routes (Milestone 2)

- **Gap Analysis**: `http://localhost:5173/gap-analysis`
- **Gap Visualization**: `http://localhost:5173/gap-visualization`
- **Training Recommendations**: `http://localhost:5173/training-recommendations`
- **Learning Paths**: `http://localhost:5173/learning-paths`
- **Course Catalog**: `http://localhost:5173/course-catalog`

---

## 📂 Project Structure

```
Organizational_Knowledge_Gap_Intelligence_Platform/
├── db_script/
│   ├── 01_schema.sql         # Full PostgreSQL DDL (Enums, Tables, Triggers)
│   ├── 02_seed_data.sql       # Reference lookup & department seed data
│   └── README.md              # Database setup guide
├── frontend/
│   ├── src/
│   │   ├── components/gap/    # GapHeatmap, GapAnalysisTable, GapSeverityIndicator, GapRecommendations
│   │   ├── context/           # GapContext.jsx (Engine state & AI logic)
│   │   ├── pages/             # GapAnalysis, GapVisualization, TrainingRecommendations, LearningPaths, CourseCatalog
│   │   └── routes/            # AppRoutes.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md                  # Project & Milestone 2 documentation
```
