# Deployment Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository with the name `opensaas-nextjs`
3. Make it public (or private if you prefer)
4. Don't initialize with README (we already have one)

## Step 2: Push Code to GitHub

After creating the repository, run these commands in your terminal:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/opensaas-nextjs.git

# Push the code
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Using Vercel CLI

1. Install Vercel CLI (if not already installed):
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Follow the prompts to:
- Link to your Vercel account
- Set up the project
- Configure environment variables

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure the following environment variables:

```
# Required for the app to run:
DATABASE_URL=your_postgresql_connection_string
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=generate_a_random_secret_here

# Optional but recommended:
OPENAI_API_KEY=your_openai_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# For OAuth (optional):
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Click "Deploy"

## Environment Setup

### Database Setup

You'll need a PostgreSQL database. You can use:
- **Supabase** (recommended): https://supabase.com
- **Railway**: https://railway.app
- **Neon**: https://neon.tech

After creating your database:
1. Copy the connection string
2. Add it as `DATABASE_URL` in Vercel
3. Run migrations: `npx prisma db push`

### Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

## Post-Deployment Steps

1. Update `NEXTAUTH_URL` to your actual Vercel URL
2. Add your domain to Next.js image domains if using external images
3. Set up your OAuth providers (Google, GitHub) with proper redirect URLs
4. Configure Stripe webhooks to point to your deployment

## Quick Deploy Button

Add this to your README for one-click deploys:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/opensaas-nextjs)