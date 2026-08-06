# REST API Specifications

All endpoints communicate using JSON and require JWT Bearer Authentication headers (except Auth endpoints):
`Authorization: Bearer <token>`

---

## 1. Authentication Service (`/api/auth`)

### POST `/api/auth/signin`
Authenticate and retrieve session token.
- **Request Body**:
  ```json
  {
    "username": "employee1",
    "password": "password"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "id": 3,
    "username": "employee1",
    "email": "employee1@okgip.com",
    "role": "EMPLOYEE",
    "department": "Engineering",
    "fullName": "Charlie Brown",
    "title": "Junior Software Engineer"
  }
  ```

### POST `/api/auth/signup`
Register a new user in the organization.
- **Request Body**:
  ```json
  {
    "username": "newuser",
    "email": "user@okgip.com",
    "password": "password",
    "role": "EMPLOYEE",
    "department": "Engineering",
    "fullName": "New Employee",
    "title": "Developer"
  }
  ```

---

## 2. Gap Analysis Engine (`/api/gaps`)

### GET `/api/gaps/my`
Retrieve list of skill gaps for the authenticated user.
- **Response (200 OK)**:
  ```json
  [
    {
      "skill": { "id": 1, "name": "Java", "category": "Backend" },
      "requiredLevel": 3,
      "currentLevel": 1,
      "gapScore": 2,
      "severity": "MEDIUM"
    }
  ]
  ```

### GET `/api/gaps/heatmap` (MANAGER+)
Retrieve department skills proficiency matrix.
- **Parameters**: `department` (e.g. `Engineering`)
- **Response (200 OK)**:
  ```json
  {
    "department": "Engineering",
    "skillsList": ["Java", "Spring Boot"],
    "matrix": [
      {
        "userId": 3,
        "username": "employee1",
        "fullName": "Charlie Brown",
        "role": "EMPLOYEE",
        "skills": {
          "Java": 1,
          "Spring Boot": 1
        }
      }
    ]
  }
  ```

---

## 3. Recommendations & Learning Paths (`/api/recommendations`)

### GET `/api/recommendations/courses`
Retrieve course recommendations matching active gaps, including AI rationale comments.
- **Response (200 OK)**:
  ```json
  [
    {
      "course": {
        "id": 1,
        "title": "Java Programming Masterclass",
        "provider": "Udemy",
        "url": "https://..."
      },
      "associatedGap": { "gapScore": 2 },
      "aiRationale": "AI Insights for Charlie: We detected a gap score of 2 in Java..."
    }
  ]
  ```

### GET `/api/recommendations/learning-path`
Retrieve step-by-step personalized learning path.
- **Response (200 OK)**:
  ```json
  [
    {
      "stepNumber": 1,
      "skillName": "Java",
      "gapScore": 2,
      "severity": "MEDIUM",
      "recommendedCourse": { "id": 1, "title": "Java Programming Masterclass" },
      "timelineEstimate": "4 Weeks",
      "milestone": "Achieve proficiency level 3 in Java"
    }
  ]
  ```

---

## 4. Peer Mentorship Matching (`/api/mentorship`)

### GET `/api/mentorship/options`
Fetch expert recommendation options for the user's active gaps.
- **Response (200 OK)**:
  ```json
  [
    {
      "skill": { "id": 1, "name": "Java" },
      "gapScore": 2,
      "mentor": { "id": 4, "fullName": "Diana Prince" },
      "mentorLevel": 4
    }
  ]
  ```

### POST `/api/mentorship/request`
Submit request for mentorship pairing.
- **Parameters**: `mentorId`, `skillId`

### POST `/api/mentorship/sessions`
Schedule a meeting.
- **Parameters**: `matchId`, `title`, `time` (ISO DateTime), `duration` (Minutes)

---

## 5. Learning Progress Tracking (`/api/progress`)

### POST `/api/progress/enroll`
Enroll in a course.
- **Parameters**: `courseId`

### PUT `/api/progress/enrollment/{id}`
Update status of enrollment.
- **Parameters**: `status` (e.g. `COMPLETED`)
- **Note**: Completing a course automatically increments the associated skill rating.
