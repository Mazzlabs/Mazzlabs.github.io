#!/bin/bash

# 🚀 RIPCITY REPOSITORY SETUP & DEPLOYMENT SCRIPT
# This creates a dedicated ripcityticketdispatch repository and deploys it

echo "🏀 SETTING UP RIPCITY TICKET DISPATCH REPOSITORY..."

# Create a new ripcityticketdispatch repository (you'll need to do this on GitHub)
echo "📝 MANUAL STEP REQUIRED:"
echo "1. Go to GitHub.com"
echo "2. Create a new repository: 'ripcityticketdispatch'"
echo "3. Make it public"
echo "4. DO NOT initialize with README"
echo ""
echo "Press ENTER when you've created the repository..."
read -r

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "🔧 Initializing git repository..."
    git init
fi

# Add all files
echo "📦 Adding all files to git..."
git add .

# Commit everything
echo "💾 Committing files..."
git commit -m "🚀 Initial deployment of Rip City Ticket Dispatch - Production Ready SaaS

✅ Features:
- AI-powered deal scoring (0-100 scale)
- 4-tier subscription model ($0, $9.99, $19.99, $99.99)
- Stripe payment integration
- Real-time ticket deal monitoring
- Portland Trail Blazers focused
- API endpoints for deals and payments
- Cloudflare + DigitalOcean architecture
- Production-ready with robust error handling

💰 Ready to generate revenue immediately!
🏀 Built for Portland sports fans
🎯 Targeting $13K ARR Year 1, $60K+ Year 2"

# Set up the correct remote
echo "🔗 Setting up GitHub remote..."
echo "Enter your GitHub username:"
read -r GITHUB_USERNAME

git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$GITHUB_USERNAME/ripcityticketdispatch.git"

# Push to the new repository
echo "🚀 Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ REPOSITORY SETUP COMPLETE!"
echo ""
echo "🔧 NOW UPDATE DIGITALOCEAN APP.YAML:"
echo "1. Go to your DigitalOcean App Platform"
echo "2. Update the GitHub repository to: $GITHUB_USERNAME/ripcityticketdispatch"
echo "3. Save and redeploy"
echo ""
echo "🌐 DOMAIN SETUP:"
echo "Create CNAME record:"
echo "  ripcityticketdispatch.works -> king-prawn-app-qwnx4.ondigitalocean.app"
echo "  api.ripcityticketdispatch.works -> king-prawn-app-qwnx4.ondigitalocean.app"
echo ""
echo "🎉 YOUR RIPCITY TICKET DISPATCH IS READY TO MAKE MONEY!"
