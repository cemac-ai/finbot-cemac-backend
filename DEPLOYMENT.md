# 🚀 FinBot CEMAC Backend - Vercel Deployment Guide

## ✅ Pre-Deployment Checklist

- [x] GitHub repository created
- [ ] Vercel account at [vercel.com](https://vercel.com)
- [ ] Claude API key from [Anthropic](https://console.anthropic.com)
- [ ] All code pushed to GitHub

---

## 🎯 Step-by-Step Deployment

### **Step 1: Create Vercel Account**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (recommended)
3. Authorize Vercel to access your GitHub repos

### **Step 2: Deploy to Vercel**

#### Option A: Vercel Dashboard (Recommended)
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Project"**
3. Select **"Import Git Repository"**
4. Paste your repo URL: `https://github.com/YOUR-USERNAME/finbot-cemac-backend`
5. Click **"Continue"**
6. Select project settings (defaults are fine)
7. Click **"Deploy"**

#### Option B: Vercel CLI
```bash
npm install -g vercel
vercel login
cd finbot-cemac-backend
vercel
```

### **Step 3: Add Environment Variables**

In Vercel Dashboard:
1. Go to your project → **Settings**
2. Click **Environment Variables**
3. Add:
   ```
   CLAUDE_API_KEY = sk-ant-your-actual-key-here
   ```
4. Select environments: **Production, Preview, Development**
5. Click **"Save"**

### **Step 4: Redeploy with Environment Variables**

```bash
vercel --prod
```

Or click **"Deployments"** → **"Redeploy"** in dashboard

---

## ✨ Your Live API is Ready!

Your backend URL will be:
```
https://finbot-cemac-backend.vercel.app
```

**API Endpoints:**
- `GET https://finbot-cemac-backend.vercel.app/api/health` - Health check
- `POST https://finbot-cemac-backend.vercel.app/api/claude` - Claude API

---

## 🧪 Test Your API

### Health Check
```bash
curl https://finbot-cemac-backend.vercel.app/api/health
```

Response:
```json
{
  "status": "ok",
  "service": "FinBot CEMAC Backend",
  "timestamp": "2024-06-14T10:30:00.000Z",
  "environment": "production"
}
```

### Claude Processing
```bash
curl -X POST https://finbot-cemac-backend.vercel.app/api/claude \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Vendu 50 bières à 500F = 25 000F"}],
    "system": "Tu es FinBot CEMAC, un assistant comptable intelligent pour les PME d'"'"'Afrique Centrale."
  }'
```

---

## 🔌 Update Your Frontend

Replace the API URL in your HTML file:

```javascript
// Replace http://localhost:3000 with your Vercel URL
const BACKEND_URL = "https://finbot-cemac-backend.vercel.app";

async function callClaude(userMessage) {
  conversationHistory.push({ role: "user", content: userMessage });

  const response = await fetch(`${BACKEND_URL}/api/claude`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: conversationHistory,
      system: systemPrompt
    })
  });

  const data = await response.json();
  const rawText = data.response;
  
  conversationHistory.push({ role: "assistant", content: rawText });
  const clean = rawText.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
}
```

---

## 📊 Monitor Your Deployment

### View Logs
1. Vercel Dashboard → Your Project → **Deployments**
2. Click the deployment
3. Click **"Function Logs"** tab

### Monitor Performance
- Dashboard → **Analytics** tab
- See requests, response times, errors

---

## 🔄 Auto-Deployment from GitHub

Every time you push to GitHub:
```bash
git add .
git commit -m "Update backend"
git push origin main
```

Vercel automatically:
1. Pulls the latest code
2. Builds the project
3. Deploys in ~1-2 minutes
4. Updates your live URL

---

## 🆘 Troubleshooting

### "404 Not Found"
- Make sure `api/claude.js` exists
- Check if deployment was successful
- Reload Vercel dashboard

### "CLAUDE_API_KEY is not set"
- Go to **Settings** → **Environment Variables**
- Verify `CLAUDE_API_KEY` is added
- Click **"Redeploy"**
- Wait 2-3 minutes for deployment

### "CORS error in frontend"
- CORS is enabled in `api/claude.js`
- Check browser console for actual error
- Verify backend URL is correct in frontend

### "502 Bad Gateway"
- Check function logs: **Deployments** → **Function Logs**
- Verify Claude API key is valid
- Check Anthropic API status at [status.anthropic.com](https://status.anthropic.com)

---

## 💰 Pricing

**Vercel Free Tier:**
- ✅ Completely FREE
- ✅ Unlimited requests
- ✅ Automatic HTTPS/SSL
- ✅ Global CDN
- ✅ 100 GB/month bandwidth
- ✅ 1 GB function memory

**When you exceed free tier:** Pay only for what you use (~$0.50 per GB-hours)

---

## 🎉 Success!

Your FinBot CEMAC backend is now:
- ✅ Live on the internet
- ✅ Scalable to millions of requests
- ✅ Automatically updated from GitHub
- ✅ Monitored and logged
- ✅ Ready for your frontend!

---

## 📱 Next Steps

1. **Update your HTML frontend** with the new backend URL
2. **Test the full flow** - Send a transaction, see it processed
3. **Deploy your frontend** (also to Vercel, GitHub Pages, or Netlify)
4. **Share the MVP** with users!

---

**Questions?** Check [Vercel docs](https://vercel.com/docs) or reach out to FinBot CEMAC support.
