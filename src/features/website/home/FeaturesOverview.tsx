import { Users, Truck, Route, Bell, BarChart3, ShieldCheck } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/features/website/animations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Driver Management",
    description: "Onboard, track, and manage drivers with ease. Ensure compliance with automated document checks.",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Vehicle Management",
    description: "Monitor fleet health, schedule maintenance, and track fuel consumption in real-time.",
    icon: Truck,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Route Optimization",
    description: "AI-powered routing to minimize travel time, reduce fuel costs, and improve ETA accuracy.",
    icon: Route,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    title: "Smart Notifications",
    description: "Automated SMS, email, and push notifications for employees, drivers, and admins.",
    icon: Bell,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Advanced Analytics",
    description: "Comprehensive dashboards and custom reports to track KPIs and operational efficiency.",
    icon: BarChart3,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    title: "Safety & Compliance",
    description: "SOS alerts, geofencing, and automated compliance tracking for complete peace of mind.",
    icon: ShieldCheck,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
];

export function FeaturesOverview() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to manage your fleet</h2>
            <p className="text-lg text-muted-foreground">
              CabEase provides a complete suite of tools designed specifically for enterprise employee transportation.
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-background/60 backdrop-blur">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.bg} ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
