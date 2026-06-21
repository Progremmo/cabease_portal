import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "About Us | CabEase",
  description: "Learn about CabEase, our mission, and the team revolutionizing employee transportation.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-8 max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Our Mission</h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            {siteConfig.mission}
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">The {siteConfig.name} Story</h2>
              <p className="text-lg text-muted-foreground">
                {siteConfig.name} was born out of a simple observation: managing employee transportation was too complex, fragmented, and inefficient. Enterprises were struggling with manual spreadsheets, rising costs, and a lack of real-time visibility.
              </p>
              <p className="text-lg text-muted-foreground">
                We set out to build a single, unified platform that brings together driver management, vehicle tracking, route optimization, and billing into one elegant solution.
              </p>
            </div>
            <div className="aspect-square relative rounded-2xl border overflow-hidden shadow-xl flex flex-col items-center justify-center p-8 text-center bg-muted/50">
              <Image src="/images/team_photo.png" alt="Our Team" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join our journey</h2>
          <p className="text-xl text-primary-foreground/80 mb-10">
            We are always looking for passionate individuals to join our team and help us build the future of mobility.
          </p>
          <Link href="/careers">
            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg group">
              View Open Positions
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
