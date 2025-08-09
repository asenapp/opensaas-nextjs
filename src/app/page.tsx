import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, Zap, Shield, Clock } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">OpenSaaS</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/pricing" className="text-sm hover:text-primary">
                Pricing
              </Link>
              <Link href="/demo-app" className="text-sm hover:text-primary">
                Demo
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Build Your SaaS
            <span className="text-primary"> 10x Faster</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The complete SaaS starter with authentication, payments, AI integration, 
            and everything you need to launch your product.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Start Building <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/demo-app">
              <Button size="lg" variant="outline">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Launch
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-primary" />}
              title="Authentication Ready"
              description="Email/password, Google, GitHub auth with NextAuth.js"
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-primary" />}
              title="AI-Powered Features"
              description="OpenAI integration with demo task scheduler app"
            />
            <FeatureCard
              icon={<CheckCircle className="h-8 w-8 text-primary" />}
              title="Payment Processing"
              description="Stripe & LemonSqueezy integration with subscriptions"
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8 text-primary" />}
              title="Admin Dashboard"
              description="Analytics, user management, and business metrics"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-primary" />}
              title="File Uploads"
              description="AWS S3 integration for secure file storage"
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-primary" />}
              title="Production Ready"
              description="TypeScript, Tailwind CSS, and best practices"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Build Your SaaS?
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of developers building with OpenSaaS
          </p>
          <Link href="/signup">
            <Button size="lg" className="gap-2">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © 2024 OpenSaaS. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-card p-6 rounded-lg border">
      <div className="mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}