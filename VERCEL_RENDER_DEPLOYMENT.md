# 🚀 Deploy MERN App: Vercel + Render + MongoDB Atlas

Complete guide to deploy your MERN application with:
- **Frontend (React)**: Already on Vercel ✅
- **Backend (Express)**: Render
- **Database**: MongoDB Atlas (Free Tier)

---

## 📋 Prerequisites

- GitHub account (you already have this)
- Vercel account (frontend already deployed ✅)
- Render account (sign up at https://render.com)
- MongoDB Atlas account (sign up at https://www.mongodb.com/cloud/atlas)

---

## Step 1: Setup MongoDB Atlas (Database) 🍃

### 1.1 Create Free Cluster

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google/GitHub or email
3. Choose **FREE M0 Cluster**
4. Select a cloud provider & region (closest to you):
   - AWS, Google Cloud, or Azure
   - Recommended: AWS `us-east-1` or `eu-west-1`
5. Click **Create Cluster** (takes 3-5 minutes)

### 1.2 Create Database User

1. Go to **Database Access** (left sidebar)
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Set username: `mernuser` (or your choice)
5. Set password: **Generate strong password** (save it!)
6. Database User Privileges: **Read and write to any database**
7. Click **Add User**

### 1.3 Whitelist IP Addresses

1. Go to **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Click **Allow Access From Anywhere** (0.0.0.0/0)
   - This is needed for Render to connect
4. Click **Confirm**

### 1.4 Get Connection String

1. Go to **Database** (left sidebar)
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Driver: **Node.js**, Version: **4.1 or later**
5. Copy the connection string:
   ```
   mongodb+srv://mernuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password
7. Add database name before the `?`:
   ```
   mongodb+srv://mernuser:yourpassword@cluster0.xxxxx.mongodb.net/mernapp?retryWrites=true&w=majority
   ```

**Save this connection string!** You'll need it for Render.

---

## Step 2: Deploy Backend on Render 🔧

### 2.1 Prepare Repository

Ensure your code is pushed to GitHub:
```bash
cd /Users/nabinchapagain/Desktop/mern-ci-cd-kube
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2.2 Create Render Account

1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

### 2.3 Create New Web Service

1. Click **New +** → **Web Service**
2. Connect your GitHub repository: `nabin00012/mern-ci-cd-kube`
3. Configure the service:

   **Basic Settings:**
   - **Name**: `mern-backend` (or your choice)
   - **Region**: Same as MongoDB (e.g., Oregon, Frankfurt)
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free` (or upgrade for better performance)

### 2.4 Set Environment Variables

In the **Environment Variables** section, add these variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | `mongodb+srv://mernuser:yourpassword@cluster0.xxxxx.mongodb.net/mernapp?retryWrites=true&w=majority` |
| `ALLOWED_ORIGINS` | `https://your-vercel-app.vercel.app` |

**Important:** Replace the values with your actual:
- MongoDB connection string from Step 1.4
- Your Vercel frontend URL

### 2.5 Deploy

1. Click **Create Web Service**
2. Wait for deployment (5-10 minutes)
3. Once deployed, copy your backend URL:
   ```
   https://mern-backend-xxxx.onrender.com
   ```

### 2.6 Test Backend

Open your browser and test:
```
https://mern-backend-xxxx.onrender.com/api/health
```

You should see:
```json
{
  "status": "OK",
  "message": "Server is running successfully",
  "timestamp": "2025-10-15T...",
  "uptime": 123.45
}
```

---

## Step 3: Update Vercel Frontend ⚡

### 3.1 Update Environment Variable

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Find `REACT_APP_API_URL` or add it if it doesn't exist:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://mern-backend-xxxx.onrender.com`
   - **Environment**: Select all (Production, Preview, Development)
5. Click **Save**

### 3.2 Redeploy Frontend

Option A: Through Vercel Dashboard
1. Go to **Deployments** tab
2. Click **...** on the latest deployment
3. Click **Redeploy**

Option B: Push to GitHub
```bash
git commit --allow-empty -m "Trigger Vercel redeploy"
git push origin main
```

### 3.3 Update vercel.json (Optional)

If you want to proxy API requests, update your `vercel.json`:

```json
{
  "version": 2,
  "name": "mern-app",
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "https://mern-backend-xxxx.onrender.com/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "client/$1"
    }
  ]
}
```

---

## Step 4: Verify Everything Works 🎉

### 4.1 Test Database Connection

1. Open MongoDB Atlas dashboard
2. Go to **Collections**
3. You should see your `mernapp` database after the first API call

### 4.2 Test Full Application

1. Open your Vercel URL: `https://your-app.vercel.app`
2. Try creating a message
3. Check if it saves and displays correctly
4. Check browser console for any errors

### 4.3 Monitor Logs

**Backend (Render):**
- Go to your Render service dashboard
- Click **Logs** tab
- Watch for any errors

**Frontend (Vercel):**
- Go to your Vercel project
- Click **Deployments** → Latest deployment
- Click **View Function Logs**

---

## 🔧 Troubleshooting

### Backend Issues

**Problem: "Cannot connect to database"**
- Check MongoDB Atlas Network Access allows 0.0.0.0/0
- Verify connection string is correct (especially password)
- Check MongoDB Atlas cluster is running

**Problem: CORS errors**
- Add your Vercel URL to `ALLOWED_ORIGINS` in Render
- Restart Render service after updating env variables

**Problem: "Application failed to respond"**
- Check Render logs for errors
- Verify `Start Command` is `npm start`
- Ensure `PORT` env variable is set to `5000`

### Frontend Issues

**Problem: "Network Error" or "Failed to fetch"**
- Verify `REACT_APP_API_URL` in Vercel env variables
- Check backend URL is correct (https://)
- Redeploy Vercel after changing env variables

**Problem: 404 on API calls**
- Check API routes in `src/services/api.js`
- Verify backend is responding at `/api/health`
- Check browser Network tab for actual URL being called

---

## 💰 Cost Breakdown (Free Tier)

- **MongoDB Atlas**: Free M0 (512MB storage)
- **Render**: Free tier (750 hours/month, spins down after inactivity)
- **Vercel**: Free tier (100GB bandwidth/month)

**Total: $0/month** 🎉

### Free Tier Limitations

**Render Free Tier:**
- Spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month (enough for one service)

**MongoDB Atlas Free:**
- 512MB storage
- Shared RAM
- No backups
- Perfect for development/small projects

**Vercel Free:**
- 100GB bandwidth
- Unlimited projects
- Automatic HTTPS
- Edge network

---

## 🚀 Production Upgrades (When You're Ready)

### Render Paid Plans ($7/month+)
- No spin-down
- More CPU & RAM
- Custom domains
- Better performance

### MongoDB Atlas Paid ($9/month+)
- More storage
- Backups
- Better performance
- Advanced features

### Vercel Pro ($20/month)
- Team collaboration
- More bandwidth
- Analytics
- Password protection

---

## 📝 Environment Variables Summary

### Backend (Render)
```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://mernuser:password@cluster0.xxxxx.mongodb.net/mernapp?retryWrites=true&w=majority
ALLOWED_ORIGINS=https://your-app.vercel.app
```

### Frontend (Vercel)
```bash
REACT_APP_API_URL=https://mern-backend-xxxx.onrender.com
```

---

## 🔄 Continuous Deployment

Both platforms support automatic deployment:

- **Vercel**: Auto-deploys on every push to `main` branch
- **Render**: Auto-deploys on every push to `main` branch

Just push your code to GitHub, and both services will automatically update!

```bash
git add .
git commit -m "Update feature"
git push origin main
```

---

## 🎯 Next Steps

1. ✅ Set up custom domain on Vercel
2. ✅ Enable HTTPS everywhere
3. ✅ Set up monitoring (Render has built-in alerts)
4. ✅ Configure database backups (paid MongoDB Atlas feature)
5. ✅ Add CI/CD tests with GitHub Actions
6. ✅ Set up error tracking (Sentry, LogRocket)

---

## 📞 Support & Resources

- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com/
- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs

Need help? Check the logs first, then the troubleshooting section above!

---

**Congratulations! Your MERN app is now live! 🎉**

Frontend: https://your-app.vercel.app
Backend: https://mern-backend-xxxx.onrender.com
Database: MongoDB Atlas
