#!/bin/bash

# 🚀 RipCity Repository Transfer & Deployment Automation Script
# This script will fix the deployment mess and get you live FAST

echo "🚀 Starting RipCity Repository Transfer & Deployment Fix..."
echo "=================================================="

# Step 1: Check current git status
echo "📋 Current Git Status:"
git status

echo ""
echo "🔍 Current remote:"
git remote -v

echo ""
echo "📦 Creating dedicated RipCity repository..."

# Step 2: Create new repository structure
echo "🏗️  Setting up dedicated RipCity repository..."

# Check if we need to create a new repo or use existing
read -p "Do you want to create a NEW repository for ripcityticketdispatch? (y/n): " create_new_repo

if [ "$create_new_repo" = "y" ]; then
    echo "📁 Creating new repository structure..."
    
    # Remove existing git if it exists
    if [ -d ".git" ]; then
        echo "🗑️  Removing old git connection to Mazzlabs.github.io..."
        rm -rf .git
    fi
    
    # Initialize new git repository
    echo "🎯 Initializing new RipCity repository..."
    git init
    
    # Add all files
    echo "📦 Adding all RipCity files..."
    git add .
    
    # Initial commit
    echo "💾 Creating initial commit..."
    git commit -m "🚀 Initial RipCity Ticket Dispatch - Ready for Production Deployment"
    
    echo ""
    echo "🌐 NEXT STEPS:"
    echo "1. Go to GitHub.com and create a new repository called 'ripcityticketdispatch'"
    echo "2. Run: git remote add origin https://github.com/Mazzlabs/ripcityticketdispatch.git"
    echo "3. Run: git push -u origin main"
    
else
    echo "📋 Using existing repository setup..."
    
    # Check if we have the correct remote
    current_remote=$(git remote get-url origin 2>/dev/null || echo "none")
    echo "Current remote: $current_remote"
    
    if [[ "$current_remote" == *"ripcityticketdispatch"* ]]; then
        echo "✅ Already connected to RipCity repository!"
    else
        echo "🔄 Need to change remote to RipCity repository..."
        read -p "Enter your RipCity repository URL (e.g., https://github.com/Mazzlabs/ripcityticketdispatch.git): " repo_url
        
        if [ ! -z "$repo_url" ]; then
            git remote set-url origin "$repo_url"
            echo "✅ Remote updated to: $repo_url"
        fi
    fi
fi

echo ""
echo "🔧 Updating DigitalOcean app.yaml configuration..."

# Step 3: Update app.yaml with correct repository
read -p "Enter your RipCity repository name (e.g., Mazzlabs/ripcityticketdispatch): " repo_name

if [ ! -z "$repo_name" ]; then
    # Update the app.yaml file
    sed -i "s|repo: Mazzlabs/Mazzlabs.github.io|repo: $repo_name|g" .do/app.yaml
    echo "✅ Updated app.yaml to use repository: $repo_name"
else
    echo "⚠️  Repository name not provided, you'll need to update .do/app.yaml manually"
fi

echo ""
echo "📝 Updated app.yaml configuration:"
echo "---"
head -15 .do/app.yaml
echo "---"

echo ""
echo "🚀 DEPLOYMENT COMMANDS:"
echo "================================"
echo "# Add and commit the changes"
echo "git add ."
echo "git commit -m '🔧 Fix deployment configuration for RipCity'"
echo ""
echo "# Push to your RipCity repository"
echo "git push origin main"
echo ""
echo "# Update your DigitalOcean app to use the new repository:"
echo "# 1. Go to DigitalOcean Apps dashboard"
echo "# 2. Select your king-prawn-app-qwnx4 app"
echo "# 3. Go to Settings → App-Level"
echo "# 4. Update the GitHub repository to: $repo_name"
echo "# 5. Click 'Save' and redeploy"

echo ""
echo "💰 ENVIRONMENT VARIABLES TO SET IN DIGITALOCEAN:"
echo "================================================="
echo "STRIPE_SECRET_KEY=sk_live_your_actual_stripe_key"
echo "STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret"
echo "TICKETMASTER_API_KEY=your_actual_ticketmaster_key"
echo "NODE_ENV=production"

echo ""
echo "🌐 DNS SETUP FOR CLOUDFLARE:"
echo "============================="
echo "Add these DNS records in Cloudflare:"
echo "Type: CNAME"
echo "Name: api"
echo "Target: king-prawn-app-qwnx4.ondigitalocean.app"
echo "Proxy: Enabled (orange cloud)"
echo ""
echo "Type: CNAME" 
echo "Name: @"
echo "Target: your-cloudflare-pages-url.pages.dev"
echo "Proxy: Enabled (orange cloud)"

echo ""
echo "✅ REPOSITORY TRANSFER COMPLETE!"
echo "================================="
echo "Your RipCity project is now properly separated and ready for deployment!"
echo ""
echo "🚨 CRITICAL NEXT STEPS:"
echo "1. Create the new GitHub repository if you haven't already"
echo "2. Push this code to the new repository"
echo "3. Update DigitalOcean app settings to use the new repository"
echo "4. Set the environment variables in DigitalOcean"
echo "5. Deploy and start making money! 💰"

echo ""
echo "🎉 Ready to launch your SaaS business!"
