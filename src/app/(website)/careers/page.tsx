import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Briefcase } from "lucide-react";

export const metadata = {
  title: "Careers | CabEase",
  description: "Join the team at CabEase and help us build the future of enterprise transportation.",
};

const jobs = [
  {
    title: "Senior Full Stack Engineer",
    department: "Engineering",
    location: "Bangalore / Remote",
    type: "Full-time",
  },
  {
    title: "Product Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Enterprise Sales Executive",
    department: "Sales",
    location: "Mumbai",
    type: "Full-time",
  },
];

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-primary/5 py-20 border-b">
        <div className="container mx-auto px-4 sm:px-8 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Come work with us</h1>
          <p className="text-xl text-muted-foreground">
            We&apos;re a team of passionate individuals dedicated to transforming how enterprises manage their employee transportation.
          </p>
        </div>
      </div>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-8 max-w-4xl">
          <h2 className="text-3xl font-bold mb-10 text-center">Open Positions</h2>
          <div className="space-y-6">
            {jobs.map((job, i) => (
              <Card key={i} className="hover:border-primary transition-colors group cursor-pointer">
                <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{job.title}</CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" /> {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" /> {job.location}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline">Apply Now</Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
