# 🚀 Vercel Deployment Guide - Fix Contact Form

## ❌ Current Issue
**Error:** "Server Error: Unable to send message."

## ✅ Solution: Add Environment Variables to Vercel

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Select your project: `ronit-portfolio`
3. Go to **Settings** tab
4. Click **Environment Variables** in the sidebar

### Step 2: Add Environment Variables

Add these TWO environment variables:

#### Variable 1: MongoDB Connection
```
Name: MONGODB_URI
Value: mongodb+srv://ronitmadage_db_user:zc21gvBapKUq2SBx@cluster0.mrnrndb.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0
Environment: Production, Preview, Development (select all)
```

#### Variable 2: Email Service (Resend)
```
Name: RESEND_API_KEY
Value: re_jagzPvad_Hupa9YS8rZp7y5AZ9XjEVHb9
Environment: Production, Preview, Development (select all)
```

### Step 3: Redeploy
After adding the environment variables:
1. Go to **Deployments** tab
2. Click the **three dots (...)** on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger automatic deployment

### Step 4: Verify
1. Wait for deployment to complete
2. Visit your live site: https://ronit-portfolio-mocha.vercel.app
3. Scroll to Contact section
4. Try sending a test message
5. Should now work without errors!

---

## 🔒 Security Note
The environment variables are safely stored in Vercel and never exposed to the client-side code.

## 📧 Email Configuration (Optional)
If you want custom email sender address instead of `onboarding@resend.dev`:
1. Go to Resend dashboard: https://resend.com/domains
2. Add your custom domain
3. Update the `from` field in `/app/api/contact/route.ts`

## 🗄️ Database Configuration (Already Done)
Your MongoDB Atlas cluster is already configured and working. The connection string includes:
- Database name: `portfolio`
- User: `ronitmadage_db_user`
- Cluster: `cluster0.mrnrndb.mongodb.net`

---

## ✅ After Setup, You'll Have:
- ✅ Contact form working on production
- ✅ Messages saved to MongoDB Atlas
- ✅ Email notifications sent to ronitmadage@gmail.com
- ✅ Proper error handling

## 🆘 Still Not Working?
Check Vercel Function Logs:
1. Go to your deployment in Vercel
2. Click **Functions** tab
3. Find `/api/contact` route
4. Check the logs for specific errors
