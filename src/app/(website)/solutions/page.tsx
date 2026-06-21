import { Building2, Briefcase, GraduationCap, Building, Moon, Map } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Solutions | CabEase",
  description: "Tailored transportation solutions for enterprise, corporate, shift workers, and more.",
};

const solutions = [
  {
    title: "Corporate Transportation",
    description: "Streamline daily commutes for your corporate employees with optimized routing and live tracking.",
    icon: Building2,
  },
  {
    title: "Employee Transportation",
    description: "End-to-end management of your employee transport fleet ensuring safety, punctuality, and cost-efficiency.",
    icon: Briefcase,
  },
  {
    title: "Candidate Transportation",
    description: "Provide a seamless and impressive travel experience for candidates visiting your office for interviews.",
    icon: GraduationCap,
  },
  {
    title: "Vendor Fleet Management",
    description: "Easily manage third-party vendors, track their compliance, and automate billing calculations.",
    icon: Building,
  },
  {
    title: "Multi Location Transportation",
    description: "Centralized control for organizations operating across multiple offices or cities.",
    icon: Map,
  },
  {
    title: "Night Shift Transportation",
    description: "Specialized routing with enhanced safety features, SOS alerts, and live monitoring for night shifts.",
    icon: Moon,
  },
];

export default function SolutionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-primary/5 py-20 border-b">
        <div className="container mx-auto px-4 sm:px-8 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Tailored Solutions for Every Need</h1>
          <p className="text-xl text-muted-foreground">
            Whether you are managing night shifts or multi-city corporate fleets, CabEase has the perfect setup for you.
          </p>
        </div>
      </div>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                    <solution.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground">
                    {solution.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
