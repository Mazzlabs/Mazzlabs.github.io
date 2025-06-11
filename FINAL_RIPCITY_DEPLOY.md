# 🚀 RIPCITY DEPLOYMENT - FINAL CHECKLIST

## ✅ EVERYTHING IS FIXED - ALL RIPCITYTICKETDISPATCH.WORKS!

### What I Just Fixed:
- ❌ Removed ALL `mazzlabs.works` references  
- ✅ Everything now points to `ripcityticketdispatch.works`
- ✅ CORS configured for your domain
- ✅ Footer updated to RipCity branding
- ✅ Contact email: `support@ripcityticketdispatch.works`
- ✅ GitHub links point to ripcity repo

## 🎯 DEPLOY STEPS (10 minutes):

### 1. Create Dedicated GitHub Repository
```bash
# Run this script:
./setup_ripcity_repo.sh

# Or manually:
# 1. Go to GitHub.com
# 2. Create new repo: "ripcityticketdispatch"  
# 3. Make it public
# 4. Don't initialize with README
```

### 2. Update DigitalOcean App Settings
```bash
# In DigitalOcean App Platform:
# 1. Go to Settings → App Spec
# 2. Update GitHub repo to: YOUR_USERNAME/ripcityticketdispatch
# 3. Save and redeploy
```

### 3. Set Up Domain CNAME Records
```bash
# In your DNS provider (Cloudflare/Namecheap/etc):
ripcityticketdispatch.works        CNAME   king-prawn-app-qwnx4.ondigitalocean.app
api.ripcityticketdispatch.works    CNAME   king-prawn-app-qwnx4.ondigitalocean.app
www.ripcityticketdispatch.works    CNAME   ripcityticketdispatch.works
```

### 4. Configure Environment Variables in DigitalOcean
```bash
# Required for production:
STRIPE_SECRET_KEY=sk_live_your_real_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_PRO_PRICE_ID=price_your_pro_price_id
STRIPE_PREMIUM_PRICE_ID=price_your_premium_price_id
STRIPE_ENTERPRISE_PRICE_ID=price_your_enterprise_price_id
```

## 🏀 DOMAIN ARCHITECTURE:

```
ripcityticketdispatch.works           →  Frontend (Cloudflare or DigitalOcean)
api.ripcityticketdispatch.works       →  Backend API (DigitalOcean)  
king-prawn-app-qwnx4.ondigitalocean.app  →  Your DigitalOcean App
```

## 💰 REVENUE READY:

Your app is configured for:
- ✅ Free tier: Immediate signups
- ✅ Pro tier: $9.99/month subscriptions
- ✅ Premium tier: $19.99/month with API access  
- ✅ Enterprise tier: $99.99/month custom pricing

## 🎯 POST-DEPLOYMENT:

### Test These URLs:
- `https://ripcityticketdispatch.works` - Main website
- `https://api.ripcityticketdispatch.works/health` - API health
- `https://api.ripcityticketdispatch.works/api/deals` - Live deals
- `https://api.ripcityticketdispatch.works/api/payments/plans` - Pricing

### Marketing Launch:
1. Post on Portland Reddit: r/ripcity, r/Portland  
2. Twitter: @trailblazers hashtags
3. Facebook: Portland sports groups
4. Email Trail Blazers season ticket holders

## 🚨 YOU'RE READY TO MAKE MONEY!

Everything is properly configured for `ripcityticketdispatch.works` - no more mazzlabs confusion!

**Next step: Run `./setup_ripcity_repo.sh` and deploy!** 🚀
