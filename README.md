# 🏨 HotelPro - Full-Stack Hotel Management Platform

A unified MERN-stack (MongoDB, Express, React, Node.js) hotel management solution featuring JWT authentication, role-based access control, room inventory tracking, booking management, and administrative dashboards.

---

## 🎯 Unified Single-Folder & Single-Command Architecture

The entire project is structured inside the single [`hotelpro/`](file:///Users/adityarajpoot/PycharmProjects/FoodRescueManagement/hotelpro) folder.

```
hotelpro/
├── package.json              # Unified root package.json
├── README.md                 # Complete documentation
├── server/                   # Backend API (Express, Mongoose, JWT)
│   ├── .env                  # Port & MongoDB Atlas Configuration
│   └── src/                  # Express app, models, controllers, routes
└── client/                   # Frontend UI (React 18, Bootstrap 5, Vite)
    └── dist/                 # Production-ready client assets served by Express
```

---

## 🚀 Running Everything with a Single Command

From inside the `hotelpro/` folder:

### **Mode 1: Single-Port Unified Production Mode (Recommended)**
Runs both the React UI and the Express REST API simultaneously on a **single port**:
```bash
cd hotelpro
npm start
```
👉 Open **[http://localhost:5001](http://localhost:5001)** in your browser.

- Both the **React Frontend** (`/`, `/login`, `/register`, `/profile`, `/admin/users`) and the **Backend REST API** (`/api/...`) are served from `http://localhost:5001`.
- No cross-origin CORS issues or multiple ports required!

---

### **Mode 2: Concurrent Development Mode (with Hot-Reloading)**
Runs both Vite hot-reload dev server and backend nodemon concurrently:
```bash
cd hotelpro
npm run dev
```
- Frontend with hot-reload: `http://localhost:5173`
- Backend API: `http://localhost:5001`

---

## 🔑 Pre-Seeded Demo Accounts

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Admin** | `admin@hotelpro.com` | `admin123` | Full access: View/Edit all users, manage roles, toggle status |
| **Staff** | `staff@hotelpro.com` | `staff123` | Operations access: Staff member |
| **Guest** | `guest@hotelpro.com` | `guest123` | Standard reservations & profile editing |

To re-seed test users at any time:
```bash
cd hotelpro
npm run seed
```
