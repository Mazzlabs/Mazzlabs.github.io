#!/bin/bash

# 🚀 IMMEDIATE FIX: Deploy RipCity to existing GitHub repo
# This pushes your RipCity project to Mazzlabs.github.io so DigitalOcean can deploy it

echo "🏀 DEPLOYING RIPCITY TO EXISTING GITHUB REPO..."
echo "This will deploy to: king-prawn-app-qwnx4.ondigitalocean.app"
echo "Domain: ripcityticketdispatch.works"
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ] || [ ! -d "rip-city-backend" ]; then
    echo "❌ Error: Run this from the RipCity project directory"
    exit 1
fi

# Add all files
echo "📦 Adding all RipCity files..."
git add .

# Commit with a clear message
echo "💾 Committing RipCity deployment..."
git commit -m "🚀 Deploy RipCity Ticket Dispatch - Production Ready

✅ AI-powered Portland Trail Blazers ticket deal monitor
✅ 4-tier subscription model ($0, $9.99, $19.99, $99.99)  
✅ Stripe payment integration ready
✅ Real-time deal scoring algorithm
✅ API endpoints: /api/deals, /api/payments/*
✅ Cloudflare + DigitalOcean architecture
✅ Revenue-ready SaaS platform

🎯 Target: Portland sports fans
💰 Revenue potential: $13K+ ARR Year 1
🏀 Deploy to: ripcityticketdispatch.works"

# Push to the existing repo (which DigitalOcean is watching)
echo "🚀 Pushing to GitHub (DigitalOcean will auto-deploy)..."

# Check current remote
CURRENT_REMOTE=$(git remote get-url origin 2>/dev/null || echo "none")
echo "Current remote: $CURRENT_REMOTE"

if [[ "$CURRENT_REMOTE" == *"Mazzlabs.github.io"* ]]; then
    echo "✅ Remote is correct - pushing to existing repo..."
    git push origin main
elif [[ "$CURRENT_REMOTE" == "none" ]]; then
    echo "🔧 Setting up remote to existing GitHub repo..."
    git remote add origin https://github.com/Mazzlabs/Mazzlabs.github.io.git
    git branch -M main
    git push -u origin main
else
    echo "🔧 Updating remote to existing GitHub repo..."
    git remote set-url origin https://github.com/Mazzlabs/Mazzlabs.github.io.git
    git push origin main
fi

echo ""
echo "🎉 DEPLOYMENT INITIATED!"
echo ""
echo "📡 DigitalOcean will now deploy your RipCity app to:"
echo "   → https://king-prawn-app-qwnx4.ondigitalocean.app"
echo "   → https://ripcityticketdispatch.works (once DNS propagates)"
echo ""
echo "⏱️  Deployment usually takes 3-5 minutes"
echo ""
echo "🔍 Monitor deployment at:"
echo "   → DigitalOcean App Platform dashboard"
echo ""
echo "🧪 Test endpoints once deployed:"
echo "   → https://ripcityticketdispatch.works/health"
echo "   → https://ripcityticketdispatch.works/api/deals"
echo "   → https://ripcityticketdispatch.works/api/payments/plans"
echo ""
echo "💰 YOUR RIPCITY TICKET DISPATCH IS GOING LIVE! 🚀"
