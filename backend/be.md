# Auth API Requests

Base URL:

```text
http://localhost:8081
```

## Public endpoints

```http
GET /hello
```

```http
GET /auth/test
```

## Register

```http
POST /register
Content-Type: application/json

{
  "username": "harsh",
  "email": "harsh@example.com",
  "password": "1234"
}
```

## Login

```http
POST /login
Content-Type: application/json

{
  "username": "harsh",
  "password": "1234"
}
```

Copy the `token` value from the login response.

## Profile

```http
GET /profile
Authorization: Bearer YOUR_TOKEN_HERE
```

## Logout

```http
POST /logout
```
