# 🎯 VERCEL ENVIRONMENT VARIABLES - VISUAL SETUP GUIDE

## 📍 Step 1: Login to Vercel
```
🌐 Go to: https://vercel.com/
Click: Dashboard (or login)
```

---

## 📍 Step 2: Find Your Project

```
╔════════════════════════════════════════╗
║   VERCEL DASHBOARD                     ║
╠════════════════════════════════════════╣
║                                        ║
║  📦 ronit-portfolio-mocha     [Click]  ║
║     Last deployed: 2 minutes ago       ║
║     Status: ● Active                   ║
║                                        ║
╚════════════════════════════════════════╝
```

---

## 📍 Step 3: Navigate to Settings

```
╔════════════════════════════════════════╗
║  Overview | Deployments | [Settings]   ║
╠════════════════════════════════════════╣
║                                        ║
║  General                    <-         ║
║  Domains                               ║
║  [Environment Variables]    <- CLICK   ║
║  Functions                             ║
║  Git                                   ║
║                                        ║
╚════════════════════════════════════════╝
```

---

## 📍 Step 4: Add Environment Variables

```
╔══════════════════════════════════════════════╗
║  Environment Variables         [Add New]  ←  ║
╠══════════════════════════════════════════════╣
║                                              ║
║  No environment variables yet                ║
║  Add variables to configure your project     ║
║                                              ║
╚══════════════════════════════════════════════╝
```

### Click "Add New" Button

---

## 📍 Step 5: Fill Variable #1

```
╔══════════════════════════════════════════════╗
║  Add Environment Variable                    ║
╠══════════════════════════════════════════════╣
║                                              ║
║  Key:                                        ║
║  ┌────────────────────────────────────────┐ ║
║  │ MONGODB_URI                            │ ║
║  └────────────────────────────────────────┘ ║
║                                              ║
║  Value:                                      ║
║  ┌────────────────────────────────────────┐ ║
║  │ mongodb+srv://ronitmadage_db_user:...  │ ║
║  └────────────────────────────────────────┘ ║
║                                              ║
║  Environments:                               ║
║  ☑ Production                                ║
║  ☑ Preview                                   ║
║  ☑ Development                               ║
║                                              ║
║          [Cancel]        [Save]  ← CLICK     ║
╚══════════════════════════════════════════════╝
```

**Copy this EXACT value:**
```
mongodb+srv://ronitmadage_db_user:zc21gvBapKUq2SBx@cluster0.mrnrndb.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0
```

---

## 📍 Step 6: Add Variable #2

Click "Add New" again, then:

```
╔══════════════════════════════════════════════╗
║  Add Environment Variable                    ║
╠══════════════════════════════════════════════╣
║                                              ║
║  Key:                                        ║
║  ┌────────────────────────────────────────┐ ║
║  │ RESEND_API_KEY                         │ ║
║  └────────────────────────────────────────┘ ║
║                                              ║
║  Value:                                      ║
║  ┌────────────────────────────────────────┐ ║
║  │ re_jagzPvad_Hupa9YS8rZp7y5AZ9XjEVHb9  │ ║
║  └────────────────────────────────────────┘ ║
║                                              ║
║  Environments:                               ║
║  ☑ Production                                ║
║  ☑ Preview                                   ║
║  ☑ Development                               ║
║                                              ║
║          [Cancel]        [Save]  ← CLICK     ║
╚══════════════════════════════════════════════╝
```

**Copy this EXACT value:**
```
re_jagzPvad_Hupa9YS8rZp7y5AZ9XjEVHb9
```

---

## 📍 Step 7: Verify Variables Added

After adding both, you should see:

```
╔══════════════════════════════════════════════╗
║  Environment Variables         [Add New]     ║
╠══════════════════════════════════════════════╣
║                                              ║
║  MONGODB_URI                                 ║
║  Production, Preview, Development      [⋮]  ║
║  mongodb+srv://ronitmadage_...               ║
║                                              ║
║  RESEND_API_KEY                              ║
║  Production, Preview, Development      [⋮]  ║
║  re_jagzPvad_Hupa9YS8rZp7y5AZ9XjEVHb9       ║
║                                              ║
╚══════════════════════════════════════════════╝
```

✅ Perfect! Both variables are added.

---

## 📍 Step 8: Redeploy Your Project

### Go to Deployments Tab:

```
╔════════════════════════════════════════╗
║  Overview | [Deployments] | Settings   ║
╠════════════════════════════════════════╣
║                                        ║
║  ● ronit-portfolio-mocha               ║
║    2 minutes ago                 [⋮]   ║  ← Click the 3 dots
║    Production                          ║
║                                        ║
╚════════════════════════════════════════╝
```

### Click the Three Dots (⋮):

```
╔════════════════════════════════╗
║  Visit                         ║
║  Inspect                       ║
║  [Redeploy]        ← CLICK     ║
║  Delete                        ║
╚════════════════════════════════╝
```

### Confirm Redeploy:

```
╔════════════════════════════════════════╗
║  Redeploy to Production?               ║
╠════════════════════════════════════════╣
║                                        ║
║  This will trigger a new deployment    ║
║  with the current source code.         ║
║                                        ║
║     [Cancel]     [Redeploy]  ← CLICK   ║
╚════════════════════════════════════════╝
```

---

## 📍 Step 9: Wait for Deployment

```
╔════════════════════════════════════════╗
║  Building...                    75%    ║
╠════════════════════════════════════════╣
║                                        ║
║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░                 ║
║                                        ║
║  Installing dependencies...            ║
║  ✓ Compiled successfully               ║
║  ⏳ Running build...                   ║
║                                        ║
╚════════════════════════════════════════╝
```

**Wait 1-2 minutes** until you see:

```
╔════════════════════════════════════════╗
║  ✅ Deployment Successful               ║
╠════════════════════════════════════════╣
║                                        ║
║  Your deployment is now live at:       ║
║  ronit-portfolio-mocha.vercel.app      ║
║                                        ║
║          [Visit]                       ║
╚════════════════════════════════════════╝
```

---

## 📍 Step 10: Test Contact Form

### Visit Your Live Site:
```
🌐 https://ronit-portfolio-mocha.vercel.app
```

### Scroll to Contact Section and Fill Form:

```
╔════════════════════════════════════════╗
║  Direct Message                        ║
╠════════════════════════════════════════╣
║                                        ║
║  Full Name:                            ║
║  [Your Name]                           ║
║                                        ║
║  Email Address:                        ║
║  [your@email.com]                      ║
║                                        ║
║  Subject:                              ║
║  [Test Message]                        ║
║                                        ║
║  Message:                              ║
║  [Testing contact form]                ║
║                                        ║
║     [Transmit Message →]     ← CLICK   ║
╚════════════════════════════════════════╝
```

---

## ✅ Success! You Should See:

```
╔════════════════════════════════════════╗
║                                        ║
║         ✓  Transmission Sent           ║
║                                        ║
║  Message transmitted successfully.     ║
║  I will execute a response shortly.    ║
║                                        ║
║     [Send Another Message]             ║
║                                        ║
╚════════════════════════════════════════╝
```

✅ Form cleared
✅ Email sent to ronitmadage@gmail.com
✅ Message saved in MongoDB

---

## 🎯 Quick Reference Card

```
┌─────────────────────────────────────────────┐
│ VARIABLE #1                                 │
├─────────────────────────────────────────────┤
│ Key: MONGODB_URI                            │
│ Value: mongodb+srv://ronitmadage_db_user... │
│ Envs: ✓ Prod  ✓ Preview  ✓ Dev            │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ VARIABLE #2                                 │
├─────────────────────────────────────────────┤
│ Key: RESEND_API_KEY                         │
│ Value: re_jagzPvad_Hupa9YS8rZp7y5AZ9XjEVHb9│
│ Envs: ✓ Prod  ✓ Preview  ✓ Dev            │
└─────────────────────────────────────────────┘
```

---

## 🚀 Total Time: 5 Minutes

Follow the visual steps above and your contact form will work perfectly!

**Need help?** Check `QUICK_FIX.md` for troubleshooting.
