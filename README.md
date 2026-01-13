# Ticket System (Shared Inbox)

A full‑stack, role‑based ticketing system that works like a shared inbox for customer support teams. Customers raise issues, agents manage and resolve them, and admins control roles and access. Built as a clean MVP with extensibility in mind.

## Table of Contents
- [Features](#features)
  - [Roles](#roles)
  - [Tickets](#tickets)
  - [Comments](#comments)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started (Local Setup)](#getting-started-local-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Authentication Flow](#authentication-flow)
- [API Overview](#api-overview)
- [Pros & Cons](#pros--cons)
- [Future Improvements](#future-improvements)
- [Deployment](#deployment)
- [Security Notes](#security-notes)
- [Project Status](#project-status)

## Features

### Roles
- Customer
  - Sign up & log in
  - Create tickets
  - View own tickets
  - Add public comments
- Agent
  - View shared inbox (all tickets)
  - Update ticket status & severity
  - Add internal & public comments
- Admin
  - Everything an agent can do
  - Promote/demote users (customer ⇄ agent)
  - View & search users

### Tickets
- Severity: `low`, `medium`, `high`, `critical`
- Status flow: `new` → `in-progress` → `resolved`
- Optional category assignment
- Assigned agent visibility
- Sorted inbox (active tickets first, resolved at bottom)

### Comments
- Public comments (visible to customers)
- Internal comments (agents/admins only)
- Role-based visibility enforced on backend

## Tech Stack
- Frontend: Next.js (App Router), React, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Auth: JWT

## Project Structure
```
ticket-system/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── index.js
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── styles/
│
└── README.md
```

## Getting Started (Local Setup)

Clone repository:
```bash
git clone https://github.com/your-username/ticket-system.git
cd ticket-system
```

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` in `backend/`:
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ticket-system
JWT_SECRET=your_long_random_secret
```
Do not commit this file.

Run backend:
```bash
node index.js
```
Backend runs at: `http://localhost:5000`

### Frontend Setup
```bash
cd frontend
npm install
```

Create `.env.local` in `frontend/`:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

Run frontend:
```bash
npm run dev
```
Frontend runs at: `http://localhost:3000`

## Authentication Flow
- JWT issued on login or signup
- Token stored in `localStorage` (MVP decision)
- Role is decoded from the JWT on frontend
- Backend always enforces authorization

## API Overview
- Auth
  - `POST /auth/register`
  - `POST /auth/login`
- Tickets
  - `POST /tickets`
  - `GET /tickets`
  - `GET /tickets/my`
  - `GET /tickets/:id`
  - `PATCH /tickets/:id/status`
  - `PATCH /tickets/:id/severity`
  - `PATCH /tickets/:id/category`
- Comments
  - `POST /tickets/:id/comments`
- Users (Admin only)
  - `GET /users`
  - `PATCH /users/:id/role`

## Pros & Cons
**Pros**
- Clean role-based architecture
- Real-world shared inbox model
- Backend-enforced security
- Minimal but complete MVP, easy to extend

**Cons / Trade-offs**
- JWT in `localStorage` (XSS risk)
- No `/me` endpoint (re-login required after role change)
- No pagination (MVP)
- No real-time updates

These are intentional MVP trade-offs.

## Future Improvements
- HttpOnly cookie authentication
- `/me` endpoint for live role sync
- Ticket assignment from UI
- Real-time updates via WebSockets
- SLA & analytics dashboard
- Audit logs for admin actions

## Deployment
- Frontend: Vercel or Netlify
- Backend: Render, Railway, Fly.io, or Deta
- Database: MongoDB Atlas (Free Tier)

## Security Notes
- Role checks enforced on backend
- Internal comments protected
- No secrets committed
- Proper `.gitignore` in place

## Project Status
MVP complete — ready for deployment 