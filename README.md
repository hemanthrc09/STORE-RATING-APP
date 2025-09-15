# STORE-RATING-APP
# Store Rating App



A web application for submitting and managing store ratings (1–5). The platform supports three user roles with role-based access control: System Administrator, Normal User, and Store Owner. Built with a backend framework (Express.js / LoopBack / NestJS), PostgreSQL/MySQL for persistence, and a React.js frontend.

---

## Table of Contents

1. Project Overview
2. Tech Stack
3. Features
4. User Roles & Permissions
5. Data Model (high level)
6. Validation Rules
7. Getting Started

   * Prerequisites
   * Environment variables
   * Database setup (migrations & seed)
   * Backend: install & run
   * Frontend: install & run
8. API Endpoints (summary)
9. Pagination / Sorting / Filtering
10. Security & Best Practices
11. Tests
12. Deployment
13. Contributing
14. License

---

## 1. Project Overview

This application allows normal users to register and rate stores (1–5). Store Owners can see ratings for their store and the average rating. System Administrators manage users and stores and view aggregate dashboards.

Key requirements implemented:

* Single login system with role-based access control
* CRUD operations where applicable
* Server-side and client-side validation
* Sorting, filtering, pagination on listings
* Secure password storage and JWT-based authentication

---

## 2. Tech Stack

* **Backend:** Express.js / NestJS / LoopBack (pick one)
* **Database:** PostgreSQL or MySQL
* **ORM:** TypeORM / Sequelize / Prisma (recommended: Prisma or TypeORM)
* **Frontend:** React.js (CRA or Vite) with React Router
* **Auth:** JWT tokens (refresh tokens optional)
* **Password hashing:** bcrypt
* **Testing:** Jest (backend), React Testing Library (frontend)

---

## 3. Features

* User registration and login (Normal users) with validation
* Admins can add stores and users (Normal/Admin)
* Users can view stores, search, sort, filter, and submit/modify ratings
* Store Owners can view ratings submitted for their store and see average rating
* Dashboard for Admin: total users, total stores, total ratings
* Table views support ascending/descending sorting and column filters

---

## 4. User Roles & Permissions

* **SYSTEM\_ADMIN**: full access

  * Create stores and users (admin/normal)
  * View dashboards and lists with filters
  * View user details (including store owners’ rating)
* **NORMAL\_USER**:

  * Register + Login
  * Update password
  * View and search stores, submit / update own ratings
* **STORE\_OWNER**:

  * Login
  * Update password
  * View list of users who rated their store
  * View average rating of their store

Notes: Role names are recommended as enums in DB (`SYSTEM_ADMIN`, `NORMAL_USER`, `STORE_OWNER`).

---

## 5. Data Model (high level)

* **User**: id, name, email (unique), password\_hash, address, role, created\_at, updated\_at
* **Store**: id, name, email (optional), address, owner\_id (FK to User or nullable), created\_at, updated\_at
* **Rating**: id, user\_id (FK), store\_id (FK), rating\_value (1-5), comment (optional), created\_at, updated\_at

Constraints:

* One rating per (user\_id, store\_id) combination — use a unique composite index.
* Store overall rating = `AVG(rating_value)` computed on query or stored and updated via triggers or application logic.

---

## 6. Validation Rules

* **Name:** min 20 chars, max 60 chars
* **Address:** max 400 chars
* **Password:** 8–16 chars, at least one uppercase letter and one special character
* **Email:** standard email format
* **Rating value:** integer between 1 and 5

Validation should be enforced on both client and server.

---

## 7. Getting Started

### Prerequisites

* Node.js (LTS) and npm/yarn
* PostgreSQL or MySQL installed and running
* Git

### Environment variables (.env)

```
# Backend
DATABASE_URL=postgresql://user:password@localhost:5432/store_rating_db
PORT=4000
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRY=1h
BCRYPT_SALT_ROUNDS=10

# Frontend
REACT_APP_API_URL=http://localhost:4000/api
```

### Database setup (example with Prisma / TypeORM)

1. Create database: `createdb store_rating_db` (Postgres)
2. Run migrations:

* Prisma: `npx prisma migrate dev --name init`
* TypeORM/Sequelize: `npm run migrate`

3. Seed initial admin user (optional): `npm run seed`

Recommended seed: create a SYSTEM\_ADMIN user and a few sample stores and a store owner.

### Backend: install & run

```bash
cd backend
npm install
# run in dev
npm run dev
# or production
npm run build
npm start
```

### Frontend: install & run

```bash
cd frontend
npm install
npm start
# build
npm run build
```

---

## 8. API Endpoints (summary)

**Auth**

* `POST /api/auth/register` — normal user signup
* `POST /api/auth/login` — returns JWT
* `POST /api/auth/change-password` — authenticated

**Admin** (authorized via role middleware)

* `GET /api/admin/dashboard` — totals (users, stores, ratings)
* `POST /api/admin/users` — create users
* `GET /api/admin/users` — list users (filters, sort, pagination)
* `GET /api/admin/stores` — list stores (filters, sort, pagination)
* `POST /api/admin/stores` — create store

**Stores & Ratings**

* `GET /api/stores` — list stores (search by name/address, pagination, sorting)
* `GET /api/stores/:id` — store details + average rating
* `POST /api/stores/:id/rate` — submit or update rating (auth required)
* `GET /api/stores/:id/ratings` — (store owner) list of ratings for their store

Note: protect endpoints using JWT and check `role` in middleware.

---

## 9. Pagination / Sorting / Filtering

* Use standard query parameters: `?page=1&limit=20&sort=name:asc&filter[name]=abc&filter[address]=xyz`
* Backend should support server-side paging and return `total`, `page`, `limit`, and `data`.

---

## 10. Security & Best Practices

* Hash passwords with bcrypt (store only the hash)
* Use parameterized queries / ORM to prevent SQL injection
* Use HTTPS in production; secure cookie or Authorization header for JWT
* Rate-limit auth endpoints to prevent brute-force
* Validate and sanitize incoming data
* Implement RBAC middleware for role checks

---

## 11. Tests

* **Backend:** unit tests for services, integration tests for controllers (mock DB or use test DB)
* **Frontend:** component tests and critical flows (login, submit rating)

Run tests:

```bash
npm test
```

---

## 12. Deployment

* Backend: Dockerize the app (`Dockerfile`) and deploy to any cloud (Heroku, AWS ECS, Azure Web App)
* Database: Hosted Postgres (e.g., RDS, ElephantSQL)
* Frontend: host on Netlify / Vercel or serve via CDN
* Use environment variables and secrets manager for JWT and DB credentials

---

## 13. Contributing

* Fork the repo, create a feature branch, open a PR describing changes.
* Maintain consistent code style and add tests for new features.

---

## 14. License

Specify your license (e.g. MIT) or remove this section if internal.

---

## Notes & Suggestions

* Recommended: use Prisma (schema-first) or TypeORM for clear migrations and type-safety.
* For file structure, keep `controllers/services/routes` on backend and `components/pages/services/api` on frontend.
* Consider caching heavy queries (e.g., store average rating) using Redis if scale increases.

---
