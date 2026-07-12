# Database Layer — Organizational Knowledge Gap Intelligence Platform

PostgreSQL schema for the platform described in the project spec. Built to match
the "Data Storage Layer" in the architecture diagram (Skills Tables, Gap Analysis
Tables, Training & Enrollment Tables, Knowledge-Sharing Tables, etc.).

## Files

| File | Purpose |
|---|---|
| `01_schema.sql` | Full DDL — extensions, enum types, tables, indexes, triggers |
| `02_seed_data.sql` | Reference/lookup data (departments, job titles, skill categories, sample skills) |

## How to run

```bash
# Create the database
createdb okgip

# Apply schema
psql -d okgip -f 01_schema.sql

# Load seed data
psql -d okgip -f 02_seed_data.sql
```

Or with Docker Compose (recommended once you set up the backend):

```yaml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: okgip
      POSTGRES_USER: okgip_user
      POSTGRES_PASSWORD: change_me
    ports:
      - "5432:5432"
    volumes:
      - ./db_script:/docker-entrypoint-initdb.d
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```
Files dropped into `/docker-entrypoint-initdb.d` run automatically in
alphabetical order on first container start — hence the `01_`, `02_` prefixes.

## Design notes

- **UUID primary keys** (`gen_random_uuid()` via `pgcrypto`) instead of
  auto-increment integers. This matters once you split the Spring Boot modular
  monolith into microservices — each service can reference `user_id`,
  `skill_id`, etc. without needing a shared sequence.
- **Postgres ENUM types** for every fixed vocabulary in the spec
  (`proficiency_level_enum`, `training_status_enum`, `gap_severity_enum`,
  `system_role_enum`, etc.) instead of free-text or lookup tables — keeps
  writes constrained at the DB layer as a safety net under the Bean Validation
  you'll add in Spring.
- **Module → table group mapping**, so it's easy to hand a slice of this
  schema to whichever microservice owns it:
  - Auth & RBAC → `users`, `user_system_roles`, `oauth_accounts`, `refresh_tokens`, `password_reset_tokens`
  - Employee Profile & Skill Inventory → `employee_profiles`, `work_experience`, `education_history`, `certifications`, `skills`, `employee_skills`
  - Competency Framework → `competency_frameworks`, `competency_framework_skills`, `industry_benchmarks`
  - Gap Analysis → `skill_gaps`, `team_gap_aggregates`, `department_gap_aggregates`, `gap_trend_history`
  - Training Recommendation → `courses`, `course_skills`, `learning_paths`, `learning_path_items`, `recommendations`
  - Learning Progress → `enrollments`, `learning_milestones`, `skill_improvements`
  - Knowledge-Sharing & Mentorship → `expert_directory`, `mentorship_matches`, `knowledge_sessions`, `session_attendees`, `communities_of_practice`, `community_members`, `shared_resources`
  - Assessment → `assessment_templates`, `assessment_questions`, `assessment_instances`, `assessment_responses`
  - Notifications → `notifications`, `notification_preferences`
  - Reports & Export → `generated_reports`
  - Cross-cutting → `activity_logs`, `departments`, `job_titles`

## Not yet included (deliberately deferred)

- Flyway/Liquibase migration versioning — recommend wrapping this into Flyway
  (`V1__init_schema.sql`, `V2__seed_data.sql`) once the Spring Boot project is
  scaffolded, so schema changes are tracked alongside code.
- Full-text/Elasticsearch sync tables — the spec calls for Elasticsearch for
  skill/expert search; that index is built from `employee_skills` +
  `expert_directory` + `users` at the application layer, not stored here.
- Partitioning on high-volume tables (`activity_logs`, `gap_trend_history`,
  `notifications`) — worth revisiting once you have real data volume.

## Next steps

Once this is confirmed, natural next steps are:
1. Spring Boot `@Entity` classes + JPA repositories mapped to these tables.
2. Flyway migration wrapping (recommended before writing any backend code).
3. Seed a couple of test users end-to-end (Employee, Manager, HR Specialist) to validate the RBAC + skill-gap flow.
