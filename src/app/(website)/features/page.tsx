import { FeaturesOverview } from "@/features/website/home/FeaturesOverview";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Features | CabEase",
  description: "Explore the comprehensive features of the CabEase enterprise employee transportation platform.",
};

const detailedFeatures = [
  {
    title: "Driver Management",
    description: "End-to-end driver lifecycle management. Track driver performance, manage compliance documents, and ensure safety.",
    bullets: ["Automated onboarding workflows", "Document expiry alerts", "Performance ratings & feedback", "Shift scheduling"],
    image: "/images/feature_driver_mgmt.png",
  },
  {
    title: "Vehicle Management",
    description: "Keep your fleet running smoothly with predictive maintenance and real-time health monitoring.",
    bullets: ["Maintenance scheduling", "Fuel consumption tracking", "GPS integration", "Odometer readings tracking"],
    image: "/images/feature_vehicle_mgmt.png",
  },
  {
    title: "Trip Management & Route Optimization",
    description: "AI-powered routing to minimize travel time, reduce fuel costs, and improve ETA accuracy.",
    bullets: ["Multi-stop route planning", "Traffic-aware ETA", "Ad-hoc request handling", "Automated dispatching"],
    image: "/images/feature_route_opt.png",
  },
];

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-primary/5 py-20 border-b">
        <div className="container mx-auto px-4 sm:px-8 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Powerful Features for Modern Fleets</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to automate, track, and optimize your enterprise transportation operations in one single platform.
          </p>
        </div>
      </div>

      <FeaturesOverview />

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="max-w-5xl mx-auto space-y-24">
            {detailedFeatures.map((feature, i) => (
              <div key={i} className={`flex flex-col md:flex-row gap-12 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 space-y-6">
                  <h2 className="text-3xl font-bold">{feature.title}</h2>
                  <p className="text-lg text-muted-foreground">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-center gap-3 text-foreground font-medium">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 w-full">
                  <div className="aspect-[4/3] relative rounded-2xl border overflow-hidden shadow-lg flex items-center justify-center bg-muted/50">
                    <Image src={feature.image} alt={feature.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
