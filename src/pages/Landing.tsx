import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WalletConnect } from "@/components/wallet/WalletConnect";
import { StravaConnect } from "@/components/strava/StravaConnect";
import { Trophy, Users, Wallet, Activity, Star, Award } from "lucide-react";
import heroImage from "@/assets/hero-runner.jpg";

export default function Landing() {
  const features = [
    {
      icon: Trophy,
      title: "Create Challenges",
      description: "Set fitness goals and stake APT tokens to motivate yourself and others"
    },
    {
      icon: Users,
      title: "Compete with Friends",
      description: "Challenge your network in distance, time, or custom fitness metrics"
    },
    {
      icon: Wallet,
      title: "Earn Rewards",
      description: "Win APT tokens and exclusive NFT badges for completing challenges"
    },
    {
      icon: Activity,
      title: "Strava Integration",
      description: "Automatically track your progress with seamless Strava connectivity"
    }
  ];

  const stats = [
    { value: "2.5K+", label: "Active Athletes" },
    { value: "15K+", label: "APT Staked" },
    { value: "500+", label: "Challenges Completed" },
    { value: "98%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container-stryd relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-hero text-gradient mb-6">
                Turn Fitness into Rewards!
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join the first Web3 fitness challenge platform. Stake APT tokens, 
                compete with friends, and earn rewards for achieving your fitness goals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <WalletConnect />
                <StravaConnect />
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-primary fill-current" />
                  <span>Trusted by 2.5K+ athletes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4 text-secondary" />
                  <span>Built on Aptos</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-glow">
                <img
                  src={heroImage}
                  alt="STRYD Hero - Turn Fitness into Rewards"
                  className="w-full h-auto animate-float"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
              </div>
              
              {/* Floating Stats Cards */}
              <motion.div
                className="absolute -top-4 -right-4 bg-card border border-border rounded-2xl p-4 shadow-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                <div className="text-2xl font-bold text-primary">15K+</div>
                <div className="text-sm text-muted-foreground">APT Staked</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-card border border-border rounded-2xl p-4 shadow-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.4 }}
              >
                <div className="text-2xl font-bold text-secondary">500+</div>
                <div className="text-sm text-muted-foreground">Challenges Won</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-stryd">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-section text-gradient">How STRYD Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect your wallet and Strava, create challenges, and start earning rewards for your fitness achievements.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="card-primary text-center h-full">
                  <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding">
        <div className="container-stryd">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-black text-gradient mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-stryd">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-section mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of athletes already earning rewards for their fitness achievements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary hover:bg-white/90 rounded-2xl px-8 py-3 font-bold text-lg">
                Get Started Now
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary rounded-2xl px-8 py-3 font-bold text-lg">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}