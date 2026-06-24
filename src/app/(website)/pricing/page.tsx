import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Pricing | CabEase",
  description: "Simple, transparent pricing for fleets of all sizes.",
};

const plans = [
  {
    name: "Starter",
    description: "Perfect for small businesses with up to 50 employees.",
    price: "$299",
    features: [
      "Up to 50 employees",
      "Up to 10 vehicles",
      "Basic routing",
      "Email support",
      "Standard reporting",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Growth",
    description: "Ideal for growing enterprises needing advanced tools.",
    price: "$799",
    features: [
      "Up to 500 employees",
      "Up to 100 vehicles",
      "AI route optimization",
      "Priority 24/7 support",
      "Advanced analytics",
      "Custom notifications",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large-scale operations.",
    price: "Custom",
    features: [
      "Unlimited employees",
      "Unlimited vehicles",
      "Multi-location management",
      "Dedicated account manager",
      "Custom integrations (API)",
      "White-labeling",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-primary/5 py-20 border-b">
        <div className="container mx-auto px-4 sm:px-8 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">
            Choose the plan that best fits your fleet size and operational needs. No hidden fees.
          </p>
        </div>
      </div>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <Card key={i} className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-xl scale-105 z-10' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="h-10">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href={plan.price === "Custom" ? "/contact" : "/request-demo"} className="w-full">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.cta}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
