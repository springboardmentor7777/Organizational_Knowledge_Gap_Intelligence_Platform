# 🌌 Organizational Knowledge Gap Intelligence Platform (OKGIP)

An enterprise-grade, AI-driven **Organizational Knowledge Gap Intelligence Platform** designed to detect real-time skill deficits across workforce roles, deliver LLM-powered personalized upskilling roadmaps, visualize team competency heatmaps, host a peer mentorship ecosystem, and export automated talent analytics.

---

## 🚀 Key Features & Modules

### 1. 🔐 Role-Based Dashboards & Auth
- **4 Distinct Role Dashboards**: Tailored command centers for `EMPLOYEE`, `MANAGER`, `HR_SPECIALIST`, and `ADMIN`.
- **Security & Access Control**: JWT Bearer Authentication, Spring Security, BCrypt Password Hashing, Google OAuth2 SSO, 2FA TOTP verification, and Audit Trails.

### 2. 📊 Knowledge Gap Detection & Heatmaps
- **Real-Time Gap Engine**: Automatically computes skill gap scores ($\text{requiredLevel} - \text{currentLevel}$) and assigns severity (`HIGH`, `MEDIUM`, `LOW`).
- **Interactive Department Heatmaps**: Matrix visualization mapping employees vs required skills with Level 0 (Slate) to Level 4 (Emerald) color codes.

### 3. 🤖 AI Recommendations & Learning Paths
- **AI-Driven Rationales**: Generates customized upskilling advice for detected skill gaps using OpenAI / LLM logic.
- **Ordered Learning Paths**: Prioritized roadmaps tackling high-severity gaps first with timeline estimates and milestone targets.
- **100% Free Course Catalog**: Integrated with free open educational providers (Infosys Springboard, freeCodeCamp, Docker Docs, PostgreSQL Tutorial, Redis University, Elastic Academy).

### 4. 👥 Mentorship & Peer Knowledge Sharing
- **Subject-Matter Expert Directory**: Instant peer mentor search matching mentees with experienced colleagues.
- **Automated Pairing & Video Meetings**: Match request workflows and integrated Jitsi Video Call room links (`meet.jit.si`).

### 5. 📝 Multi-Modal Assessments & Certification
- **3 Evaluation Modes**: Level 0–4 Self/Manager Rating Matrix, Diagnostic Skill Quiz Engine, and AI Resume Skill Parser.
- **Verified Certification**: Submit certificate links and auto-increment employee skill ratings upon completion verification.

### 6. 📈 Analytics & Reporting
- **Automated CSV Exports**: Export Workforce Directory, Team Skill Matrix, and System Audit Logs to CSV files.
- **Real-Time WebSocket Notifications**: Live STOMP WebSocket push notifications (`/ws`) with in-app unread counter.

---

## 🛠️ Technology Stack

- **Backend**: Java 21, Spring Boot 3.3, Spring Security, Spring Data JPA, Hibernate, Maven, Spring WebSocket
- **Frontend**: React.js 18, Vite, Tailwind CSS, Lucide Icons, Recharts, Context API
- **Database**: PostgreSQL / H2 Database
- **Caching**: Redis
- **Search**: Elasticsearch
- **Testing**: JUnit 5, Mockito, Vite Build Validation
- **Deployment**: Docker, Docker Compose, Multi-stage builds

---

## 👤 User Account Registration & Role Assignment

Users can be created dynamically through the application interface:

1. **Self Registration**:
   - Navigate to [http://localhost:5173/register](http://localhost:5173/register)
   - Register a new account with your preferred username, email, password, department, and initial role (`EMPLOYEE`, `MANAGER`, `HR_SPECIALIST`, or `ADMIN`).

2. **Admin User Management**:
   - Log in as an Administrator and navigate to **User Management** (`/admin/users`).
   - Dynamically create new user accounts, update role permissions, or assign department managers.

---

## 🐳 Quick Start with Docker Compose

```bash
# Clone repository
git clone https://github.com/springboardmentor7777/Organizational_Knowledge_Gap_Intelligence_Platform.git
cd Organizational_Knowledge_Gap_Intelligence_Platform

# Launch all services (PostgreSQL, Redis, Elasticsearch, Backend, Frontend)
docker-compose up --build -d
```

- **Frontend Application**: [http://localhost:5173](http://localhost:5173) (or `http://localhost`)
- **Backend API**: [http://localhost:8080/api](http://localhost:8080/api)
