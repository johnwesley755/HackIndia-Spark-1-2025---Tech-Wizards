import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Bot, 
  Zap,
  Globe,
  Users,
  Shield
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary" />
            <span className="font-semibold text-lg">Lemma AI</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/dashboard">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              AI-Powered Customer Service Platform
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 px-4">
              Transform your customer support with intelligent AI agents that understand, respond, and learn from every interaction.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/dashboard">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-xl bg-card border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Transform Your Customer Service?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of businesses already using our AI platform to deliver exceptional customer experiences.
            </p>
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/dashboard">Get Started Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "AI-Powered Responses",
    description: "Intelligent responses that understand context and provide accurate solutions instantly.",
    icon: Bot
  },
  {
    title: "Multi-Channel Support",
    description: "Seamlessly integrate with email, chat, and social media platforms.",
    icon: MessageSquare
  },
  {
    title: "Real-Time Analytics",
    description: "Track performance metrics and customer satisfaction in real-time.",
    icon: Zap
  },
  {
    title: "Global Coverage",
    description: "Support customers in multiple languages 24/7 without language barriers.",
    icon: Globe
  },
  {
    title: "Team Collaboration",
    description: "Easy handoffs between AI and human agents when needed.",
    icon: Users
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade encryption and data protection for peace of mind.",
    icon: Shield
  }
];