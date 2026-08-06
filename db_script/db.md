# Database Setup Instructions

This directory contains the SQL scripts required to initialize the PostgreSQL database schema and seed the initial dataset for the **Organizational Knowledge Gap Intelligence Platform**.

## Files
1. [01_schema.sql](file:///c:/Users/tharu/Desktop/Main/Organizational_Knowledge_Gap_Intelligence_Platform/db_script/01_schema.sql): Sets up the tables, relational keys, constraints, and audit log tracking.
2. [02_seed_data.sql](file:///c:/Users/tharu/Desktop/Main/Organizational_Knowledge_Gap_Intelligence_Platform/db_script/02_seed_data.sql): Populates the database with initial users, skills, courses, learning paths, roles, and profiles.

## Setup Instructions

### Option 1: Docker Compose (Recommended)
1. Start the PostgreSQL, Redis, and Elasticsearch containers:
   ```bash
   docker-compose up -d
   ```
2. Once the Postgres database is up, run the initialization scripts. You can run them using `psql` within the Docker container:
   ```bash
   docker exec -i okgip-postgres psql -U postgres -d okgip_db < db_script/01_schema.sql
   docker exec -i okgip-postgres psql -U postgres -d okgip_db < db_script/02_seed_data.sql
   ```

### Option 2: Local PostgreSQL Server
1. Create a database named `okgip_db` on your local PostgreSQL server.
2. Execute the scripts in order:
   ```bash
   psql -U postgres -d okgip_db -f db_script/01_schema.sql
   psql -U postgres -d okgip_db -f db_script/02_seed_data.sql
   ```
