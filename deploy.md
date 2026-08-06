# Deployment Manual

This guide describes how to run and deploy the **Organizational Knowledge Gap Intelligence Platform**.

---

## Technical Architecture

- **Backend**: Spring Boot 3.3.x, Spring Security, JWT, WebSockets (STOMP).
- **Frontend**: React (Vite), Tailwind CSS, Recharts.
- **Services**: PostgreSQL, Redis, Elasticsearch.

---

## Execution Modes

The platform can run in two configurations:
1. **Local Development (No Docker Required)**: Runs in-memory using H2 database and ConcurrentMap Cache.
2. **Production Orchestration (Docker Compose)**: Runs fully containerized using PostgreSQL, Redis, and Elasticsearch.

---

### Option 1: Local Development (Quick Start)

Prerequisites: JDK 21, Maven 3.9+, Node.js v22+.

#### 1. Start Backend Server
```bash
cd backend
mvn spring-boot:run
```
*The server starts on `http://localhost:8080`. It automatically boots up H2 and populates it with all seed users and courses.*

#### 2. Start Frontend Server
```bash
cd frontend
npm install
npm run dev
```
*The client app starts on `http://localhost:5173`. Open this URL in your browser to test.*

---

### Option 2: Production Deployment (Docker Compose)

Prerequisites: Docker Desktop, Docker Compose.

1. Build and boot all containers:
   ```bash
   docker-compose up --build -d
   ```
2. Nginx will spin up on Port 80.
   - Access web app: `http://localhost`
   - Access backend API: `http://localhost/api`
   - Access live WebSockets: `http://localhost/ws`

---

## Seed Credentials

All accounts use the default password: **`password`**

| Username | Role | Department | Purpose / Features |
| :--- | :--- | :--- | :--- |
| `employee1` | `EMPLOYEE` | Engineering | Junior Engineer profile. Has active skill gaps and personalized learning path. |
| `employee2` | `EMPLOYEE` | Engineering | Senior Engineer profile. Exceeds expected level and suggested as peer mentor. |
| `manager` | `MANAGER` | Engineering | Views team gap heatmaps, high risk alerts, and schedules peer mentorships. |
| `hr` | `HR_SPECIALIST` | Human Resources | Creates/edits competency frameworks and required levels per role. |
| `admin` | `ADMIN` | Executive | Audits system activities logs and adds skills to the taxonomy directory. |
