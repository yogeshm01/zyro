# Zyro — 3D E‑Commerce Web Application

Zyro is a full‑stack e‑commerce reference application that demonstrates a clean, production‑oriented architecture with interactive 3D product previews.

## Overview

Zyro lets users browse products, inspect them in interactive 3D (Three.js), and complete a simple cart and checkout flow. This repository is intentionally focused on code quality, maintainability, and real‑world backend patterns rather than visual polish or third‑party generators.

Core capabilities

- Secure user authentication (JWT + bcrypt)
- Product browsing with 3D model visualization using Three.js
- Cart and checkout flow (cart modeled as an Order in status CREATED)
- REST APIs protected by JWT

## System Architecture (high level)

Browser (React + Three.js)
	→ REST API (JSON + JWT)
	→ Node.js + Express (Backend)
	→ PostgreSQL (Neon / cloud)

## Design decisions

### Frontend
- React (JavaScript) for component-driven UI and ecosystem maturity.
- Three.js integrated directly (no heavy abstractions) to display GLB models and show competence with WebGL fundamentals.
- Tailwind CSS used sparingly for layout and spacing to keep the UI readable and maintainable.

References:
- https://react.dev/
- https://threejs.org/docs/
- https://tailwindcss.com/docs/

### Backend
- Node.js + Express for a lightweight REST API surface.
- Service–Repository pattern to separate business logic from data access and improve testability and maintainability.

References:
- https://expressjs.com/
- https://martinfowler.com/eaaCatalog/serviceLayer.html

### Database
- PostgreSQL (Neon) — transactional, ACID‑compliant relational database suited for orders and inventory.

References:
- https://www.postgresql.org/docs/
- https://neon.tech/docs

### Authentication
- JWT for stateless authentication; tokens conveyed via the Authorization: Bearer <token> header.
- Passwords hashed with bcrypt (OWASP recommended practices).

References:
- https://jwt.io/introduction
- https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html

## Cart & Order modeling

This project follows an industry pattern where the cart is represented as an Order with status = CREATED. Order lifecycle:

- CREATED — user cart
- PLACED — order confirmed

Benefits: fewer tables, simpler lifecycle mapping, and closer alignment with common production systems.

Reference: https://martinfowler.com/eaaCatalog/order.html

## API security

- JWT tokens are validated in middleware. Protected routes require Authorization: Bearer <token>.
- After validation, user context (userId) is injected into the request for downstream handlers.

Reference: https://datatracker.ietf.org/doc/html/rfc6750

## Project structure (simplified)

backend/
	├─ controllers/
	├─ services/
	├─ repositories/
	├─ routes/
	├─ middlewares/
	└─ utils/

frontend/
	├─ src/components/
	├─ src/three/ (3D viewer)
	└─ src/api/

Files of interest:
- `backend/src/controllers` — request handlers
- `backend/src/services` — business logic
- `backend/src/repositories` — DB access
- `frontend/src/three/ModelViewer.js` — Three.js integration

## How to run

Backend

```bash
cd backend
npm install
npm run dev
```

Frontend

```bash
cd frontend
npm install
npm start
```

Note: adjust environment variables in `backend/src/config/env.js` (database URL, JWT secret) before starting.

## Testing

- Backend APIs tested manually with Postman / Thunder Client.
- Frontend tested in the browser; 3D rendering validated against window resize and typical interaction flows.

## Key highlights (for evaluators)

- Clean separation of concerns (controllers → services → repositories)
- Secure authentication (JWT + bcrypt)
- Realistic cart/order modeling (cart = Order with status CREATED)
- Manual Three.js integration (no auto-generated code or AI‑generated assets)
- Human‑written Tailwind CSS used minimally and readably

## Scope & limitations

- No payment gateway integration (intentionally excluded for the assessment).
- Authentication implements a standard but minimal flow (sufficient for evaluation).
- Focus is on architecture and code quality rather than exhaustive UI polish.

## Author

Yogesh Mishra
B.Tech Computer Science & Engineering (AI)
Full‑Stack Developer

---
If you'd like, I can also:
- Add a short setup guide that includes environment variable examples and a sample `.env.example` file.
- Add tiny smoke tests for the backend (one health endpoint test) and a README section describing how to run them.

