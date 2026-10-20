# 🚀 HotelPro Deployment Guide: Render + Vercel

This repository is pre-configured with `render.yaml` and `vercel.json` for deployment.

- **Backend (Node/Express API + MongoDB)**: Hosted on **Render**
- **Frontend (React/Vite SPA)**: Hosted on **Vercel**

---

## 🟣 Part 1: Deploy Backend on Render

1. Go to **[dashboard.render.com](https://dashboard.render.com/)** and sign in with GitHub.
2. Click **New +** ➔ **Web Service**.
3. Select your repository: **`HotelPro`** (or connect `https://github.com/en24cs3010063-blip/HotelPro`).
4. Configure the settings:
   - **Name**: `hotelpro-backend`
   - **Root Directory**: `hotelpro` (or leave empty if repo root is the project)
   - **Runtime**: `Node`
   - **Build Command**: `npm install --prefix server`
   - **Start Command**: `node server/src/server.js`
   - **Instance Type**: `Free`
5. Under **Environment Variables**, add:
   | Key | Value |
   |---|---|
   | `NODE_ENV` | `production` |
   | `PORT` | `10000` |
   | `JWT_SECRET` | *(Any random secret string, e.g. `hotelpro_super_secret_jwt_key_2026`)* |
   | `MONGO_URI` | `mongodb+srv://adityarajpoot656_db_user:GYr8E8Wqtqgfs2hV@cluster0.0qynapg.mongodb.net/hotelpro_db?retryWrites=true&w=majority` |
6. Click **Deploy Web Service**.
7. Once deployed, Render will provide your public Backend URL:
   👉 Example: `https://hotelpro-backend.onrender.com`

*(Test by visiting `https://your-render-url.onrender.com/api/health`)*

---

## ▲ Part 2: Deploy Frontend on Vercel

1. Go to **[vercel.com](https://vercel.com/)** and sign in with GitHub.
2. Click **Add New...** ➔ **Project**.
3. Import your **`HotelPro`** repository.
4. Project Configuration:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click `Edit` and select `client` (or leave as root; `vercel.json` supports both).
   - If using Root:
     - **Build Command**: `npm run build --prefix client`
     - **Output Directory**: `client/dist`
   - If `client` was selected as Root Directory:
     - Defaults are automatically detected (`npm run build` and `dist`).
5. Under **Environment Variables**, add:
   | Key | Value |
   |---|---|
   | `VITE_API_URL` | `https://your-render-backend-url.onrender.com/api` |
6. Click **Deploy**.
7. Vercel will build and give you your live URL:
   👉 Example: `https://hotelpro.vercel.app`

---

## 🔄 Part 3: Connect Frontend to Backend (Final Step)

Once your Vercel URL is live (e.g. `https://hotelpro.vercel.app`):
1. In your **Render Dashboard**, open your `hotelpro-backend` service.
2. Go to **Environment** tab.
3. Add or update:
   - `CLIENT_URL` = `https://hotelpro.vercel.app`
4. Click **Save Changes** (Render will auto-redeploy with the new CORS origin).

You now have a production-grade, highly available MERN stack deployment!
