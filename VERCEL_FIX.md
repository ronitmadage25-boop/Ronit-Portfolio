# 🚨 URGENT: Fix Contact Form on Vercel Deployment

## Problem
Contact form shows: **"Server Error: Unable to send message."**

## Root Cause
Environment variables from `.env.local` are NOT automatically deployed to Vercel.

---

## ✅ SOLUTION (Follow These Steps)

### Step 1: Login to Vercel
Go to: **https://vercel.com/dashboard**

### Step 2: Open Your Project
Click on: **`ronit-portfolio`** (or whatever your project name is)

### Step 3: Go to Settings
Click the **Settings** tab at the top

### Step 4: Add Environment Variables
1. Click **Environment Variables** in the left sidebar
2. Add **Variable #1**:
   ```
   Key: MONGODB_URI
   Value: mongodb+srv://ronitmadage_db_user:zc21gvBapKUq2SBx@cluster0.mrnrndb.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0
   ```
   - Select: ✅ Production ✅ Preview ✅ Development
   - Click **Save**

3. Add **Variable #2**:
   ```
   Key: RESEND_API_KEY
   Value: re_jagzPvad_Hupa9YS8rZp7y5AZ9XjEVHb9
   ```
   - Select: ✅ Production ✅ Preview ✅ Development
   - Click **Save**

### Step 5: Redeploy
**Option A - Redeploy from Vercel Dashboard:**
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the three dots **(...)**
4. Click **Redeploy**
5. Wait for deployment to finish

**Option B - Push New Commit:**
```bash
git add .
git commit -m "Add environment variables guide"
git push
```

### Step 6: Test
1. Visit your live site: **https://ronit-portfolio-mocha.vercel.app**
2. Scroll to the Contact section
3. Fill out the form and click "Transmit Message"
4. ✅ Should work now!

---

## 🎯 Quick Visual Guide

### Where to Add Environment Variables:
```
Vercel Dashboard
  └── Your Project (ronit-portfolio)
      └── Settings
          └── Environment Variables
              └── Add Variable
```

### What You Should See After Adding:
```
MONGODB_URI          Production, Preview, Development
RESEND_API_KEY       Production, Preview, Development
```

---

## 🔍 How to Debug (If Still Not Working)

### Check Vercel Function Logs:
1. Go to your project in Vercel
2. Click **Deployments**
3. Click on the latest deployment
4. Click **Functions** tab
5. Find `/api/contact`
6. Look for error messages

### Common Error Messages:
- `"MONGODB_URI is not configured"` → Environment variable not added
- `"RESEND_API_KEY is not configured"` → Environment variable not added
- `"Failed to save message"` → MongoDB connection issue
- `"Email sending failed"` → Resend API issue (but message still saves)

---

## 📧 What Happens When Form Works:
1. ✅ Message saves to MongoDB Atlas
2. ✅ Email notification sent to: **ronitmadage@gmail.com**
3. ✅ User sees success message
4. ✅ Form resets

---

## 🆘 Still Having Issues?

### Option 1: Check MongoDB Atlas
- Login to: https://cloud.mongodb.com/
- Check if your cluster is active
- Verify network access (should allow all IPs: 0.0.0.0/0)

### Option 2: Check Resend
- Login to: https://resend.com/
- Verify API key is active
- Check if you're within free tier limits (100 emails/day)

### Option 3: Contact Me
If you're still stuck:
1. Screenshot the error in Vercel Function logs
2. Email: ronitmadage@gmail.com
3. Subject: "Portfolio Contact Form Debug"

---

## ✅ Success Checklist
- [ ] Added MONGODB_URI to Vercel
- [ ] Added RESEND_API_KEY to Vercel  
- [ ] Redeployed the project
- [ ] Tested contact form on live site
- [ ] Received test email confirmation

---

## 🎉 After Setup:
Your contact form will:
- ✅ Accept messages from visitors
- ✅ Save to your MongoDB database
- ✅ Send email notifications instantly
- ✅ Show beautiful success animations
- ✅ Work perfectly on mobile and desktop

**Last Updated:** June 2026
