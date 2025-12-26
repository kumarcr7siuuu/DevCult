# DevCult - Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (free at [vercel.com](https://vercel.com))

### Step 1: Push to GitHub
```bash
cd c:/Users/kumar/.gemini/antigravity/playground/silver-cosmic
git init
git add .
git commit -m "Initial commit - DevCult website"
# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/devcult.git
git push -u origin main
```

### Step 2: Deploy to Vercel

**Option A: Via Vercel Dashboard (Easiest)**
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your `devcult` repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"
6. Your site will be live at `https://your-project.vercel.app`

**Option B: Via CLI**
```bash
npm install -g vercel
vercel login
vercel
# Follow the prompts, then your site is live!
```

---

## 📧 Email Setup (For Prompt Submissions)

The prompt box currently logs submissions. To receive emails, follow these steps:

### Using Resend (Recommended - Free Tier)

1. **Sign up** at [resend.com](https://resend.com)
2. **Get your API key** from the dashboard
3. **Add environment variable** in Vercel:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add: `RESEND_API_KEY` = `your_api_key_here`
   - Add: `RECIPIENT_EMAIL` = `kumarrutkarsh@gmail.com`

4. **Install Resend** (locally for testing):
```bash
npm install resend
```

5. **Update** `app/api/submit/route.ts` - uncomment the Resend code block (lines 23-35)

6. **Redeploy** - Vercel will automatically rebuild

### Alternative: SendGrid, Nodemailer, or EmailJS
Similar setup - just install the package and update the API route accordingly.

---

## 🎨 Custom Domain (Optional)

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain (e.g., `devcult.com`)
4. Follow DNS instructions from Vercel
5. SSL certificate is automatic!

---

## 🔧 Environment Variables Summary

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | For email | Your Resend API key |
| `RECIPIENT_EMAIL` | For email | kumarrutkarsh@gmail.com |

---

## ✅ Deployment Checklist

- [ ] Push code to GitHub
- [ ] Deploy to Vercel
- [ ] Set up email service (Resend)
- [ ] Add environment variables in Vercel
- [ ] Test submission form
- [ ] (Optional) Add custom domain

---

## 📝 Notes

- **Current Status**: The submission form is functional but logs to console. Email integration requires adding Resend API key.
- **Free Limits**: Vercel gives you unlimited deployments, 100GB bandwidth/month
- **Email Limits**: Resend free tier includes 100 emails/day

Need help? The API route is at `app/api/submit/route.ts` and the form component is `components/IdeaSubmission.tsx`.
