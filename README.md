# OpenSaaS - Next.js SaaS Starter

A complete SaaS starter template built with Next.js 14, TypeScript, Tailwind CSS, and modern best practices. This is a Next.js-only version of the original Wasp-based OpenSaaS project.

## Features

- 🔐 **Authentication**: Email/password and social auth (Google, GitHub) with NextAuth.js
- 💳 **Payments**: Stripe and LemonSqueezy integration with subscriptions
- 🤖 **AI Integration**: OpenAI-powered task scheduler demo app
- 📁 **File Uploads**: AWS S3 integration for secure file storage
- 📊 **Admin Dashboard**: Analytics, user management, and business metrics
- 📧 **Email**: Transactional emails with Resend
- 🎨 **UI Components**: Beautiful UI with shadcn/ui and Radix UI
- 📱 **Responsive**: Mobile-first design
- 🔒 **Type Safe**: Full TypeScript support
- 🚀 **Production Ready**: Best practices and optimizations

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe, LemonSqueezy
- **AI**: OpenAI API
- **File Storage**: AWS S3
- **Email**: Resend

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Environment variables (see `.env.local.example`)

### Installation

1. Clone the repository:
```bash
cd opensaas-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your actual values:
- Database connection string
- NextAuth secret
- OAuth credentials (optional)
- Stripe/LemonSqueezy keys
- OpenAI API key
- AWS S3 credentials
- Email service keys

4. Set up the database:
```bash
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── (admin)/           # Admin pages
│   └── api/               # API routes
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utilities and configurations
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   ├── stripe.ts         # Stripe configuration
│   └── openai.ts         # OpenAI configuration
└── types/                 # TypeScript types
```

## Key Features Implementation

### Authentication
- Email/password authentication with bcrypt
- Social login with Google and GitHub
- Session management with JWT
- Protected routes and middleware

### AI Task Scheduler
- Natural language task input
- AI-powered schedule generation
- Priority-based task organization
- Time estimation and optimization

### Payments
- Stripe Checkout for subscriptions
- Customer portal integration
- Webhook handling for events
- Credit system for free users

### Admin Dashboard
- User management
- Revenue analytics
- Traffic insights
- System metrics

## Environment Variables

Create a `.env.local` file with:

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"

# OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_ID=""
GITHUB_SECRET=""

# Stripe
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""

# OpenAI
OPENAI_API_KEY=""

# AWS S3
AWS_S3_ACCESS_KEY_ID=""
AWS_S3_SECRET_ACCESS_KEY=""
AWS_S3_BUCKET_NAME=""
AWS_S3_REGION=""

# Email
SENDGRID_API_KEY=""
EMAIL_FROM=""
```

## Deployment

This app can be deployed to:
- Vercel (recommended)
- Railway
- Render
- Any Node.js hosting platform

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variables
4. Deploy

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run database migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed
```

## License

MIT License - feel free to use this for your own projects!

## Credits

This is a Next.js implementation inspired by the original [OpenSaaS](https://opensaas.sh) project built with Wasp.