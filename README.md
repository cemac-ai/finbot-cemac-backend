[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![Claude API](https://img.shields.io/badge/Claude-API-FF6B6B?style=flat-square)](https://anthropic.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

# 🤖 FinBot CEMAC Backend

**Vercel serverless backend for FinBot CEMAC** - A WhatsApp-based bookkeeping MVP for African businesses.

Powered by **Claude AI** for intelligent transaction processing and financial analysis in French for the CEMAC region (Central African Economic and Monetary Community).

---

## ✨ Features

- 🚀 **Serverless on Vercel** - No server management, auto-scales
- 🤖 **Claude AI Integration** - Intelligent natural language processing
- 💬 **Multi-language Support** - French (fr) for CEMAC region
- 📊 **Transaction Processing** - Parse bookkeeping entries in plain French
- 💰 **OHADA Compliance** - Structured financial categories
- 🔐 **Secure** - API key protected, CORS enabled
- 📱 **WhatsApp Compatible** - JSON responses for seamless integration
- ✅ **Production Ready** - Error handling, logging, monitoring

---

## 📋 API Endpoints

### Health Check
```http
GET /api/health
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
```http
POST /api/claude
Content-Type: application/json

{
  "messages": [
    {"role": "user", "content": "Vendu 50 bières à 500F = 25 000F"}
  ],
  "system": "Tu es FinBot CEMAC, un assistant comptable..."
}
```

Response:
```json
{
  "success": true,
  "response": "{\"type\":\"transaction\",\"transaction\":{\"categorie\":\"Ventes de marchandises\",\"montant\":25000,\"sens\":\"revenu\",\"description\":\"Vente de 50 bières\"},\"message\":\"✅ Transaction enregistrée: +25 000 FCFA\"}",
  "model": "claude-3-5-sonnet-20241022"
}
```

---

## 🚀 Quick Start

### Prerequisites
- [Vercel Account](https://vercel.com) (free)
- [Claude API Key](https://console.anthropic.com)
- GitHub account

### Deployment (3 minutes)

1. **Clone this repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/finbot-cemac-backend.git
   cd finbot-cemac-backend
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Deploy to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import this GitHub repository
   - Add environment variable: `CLAUDE_API_KEY`
   - Deploy!

4. **Get Your Live URL**
   ```
   https://finbot-cemac-backend.vercel.app
   ```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

---

## 🔌 Frontend Integration

Update your HTML with the backend URL:

```javascript
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

## 📁 Project Structure

```
finbot-cemac-backend/
├── api/
│   ├── claude.js           # Main Claude API endpoint (serverless)
│   └── health.js           # Health check endpoint
├── vercel.json             # Vercel configuration
├── package.json            # Dependencies
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── DEPLOYMENT.md           # Deployment guide
└── README.md               # This file
```

---

## 🛠️ Development

### Local Testing with Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Run locally
vercel dev

# API will be available at http://localhost:3000/api/claude
```

### Create `.env` file
```bash
cp .env.example .env
# Edit .env and add your CLAUDE_API_KEY
```

### Test API
```bash
curl -X POST http://localhost:3000/api/claude \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Bonjour"}],
    "system": "Tu es un assistant comptable"
  }'
```

---

## 📊 Claude AI Configuration

The system prompt guides Claude to:
- ✅ Detect transaction types (revenue/expense)
- ✅ Extract amounts (handles: 45k, 45 000F, 45.000 FCFA)
- ✅ Classify by OHADA categories
- ✅ Respond in structured JSON
- ✅ Support French language naturally

### Supported Categories
- Ventes de marchandises
- Achats de marchandises
- Charges de loyer
- Charges de personnel
- Transport
- Fournitures
- Prestation de service
- Autre recette / Autre charge

---

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `CLAUDE_API_KEY` | Anthropic Claude API key | ✅ Yes |
| `NODE_ENV` | Environment (production/development) | ❌ No |

---

## 📈 Monitoring

### Vercel Dashboard
- View deployments and logs
- Monitor function performance
- Check error rates
- Scale automatically

### View Logs
```bash
vercel logs api/claude
```

---

## 🧪 Testing

### Health Check
```bash
curl https://finbot-cemac-backend.vercel.app/api/health
```

### Transaction Example
```bash
curl -X POST https://finbot-cemac-backend.vercel.app/api/claude \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Acheté stock pour 80 000 FCFA"}
    ],
    "system": "Tu es FinBot CEMAC, assistant comptable OHADA"
  }'
```

---

## 🚨 Troubleshooting

### API Returns 500 Error
- Check `CLAUDE_API_KEY` is set
- Verify API key is valid
- Check Vercel logs: `vercel logs api/claude`

### CORS Errors
- CORS is enabled for all origins
- Check if backend URL is correct in frontend
- Verify `Content-Type: application/json` header

### Timeout Issues
- Vercel functions timeout after 60 seconds
- Claude API usually responds in <5 seconds
- Check network connectivity

---

## 💰 Cost

**Vercel Serverless:**
- ✅ FREE tier (recommended for MVP)
- Includes: 100 GB/month bandwidth
- When scaling: ~$0.50 per GB-hour

**Claude API:**
- Input: ~$3 per 1M tokens
- Output: ~$15 per 1M tokens
- Typical transaction: ~500 tokens (~$0.01)

---

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Anthropic Claude Docs](https://docs.anthropic.com)
- [Claude API Reference](https://docs.anthropic.com/claude/reference)
- [OHADA Standards](https://www.ohada.org)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👥 About FinBot CEMAC

FinBot CEMAC helps small businesses and SMEs in Central Africa manage their finances through simple WhatsApp conversations. We're building financial inclusion for the CEMAC region! 🌍

**Made with ❤️ for African businesses**

---

## 📞 Support

For issues or questions:
1. Check [DEPLOYMENT.md](DEPLOYMENT.md)
2. Review error logs in Vercel dashboard
3. Verify environment variables
4. Contact FinBot CEMAC team

---

**Status:** ✅ Production Ready | 🚀 Deployed on Vercel | 🤖 Powered by Claude
