import { HeroSection } from "@/features/website/home/HeroSection";
import { FeaturesOverview } from "@/features/website/home/FeaturesOverview";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      
      {/* Trusted By Section */}
      <section className="py-12 border-y bg-background">
        <div className="container mx-auto px-4 sm:px-8">
          <p className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest">
            Trusted by innovative enterprises
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
            {/* Logos placeholders */}
            {['TechCorp', 'GlobalTech', 'InnovateInc', 'FutureSys', 'NextGen'].map((logo, i) => (
              <span key={i} className="text-xl font-bold font-serif">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      <FeaturesOverview />

      {/* Statistics Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-bold">10k+</h3>
              <p className="text-primary-foreground/80 font-medium">Active Drivers</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-bold">5M+</h3>
              <p className="text-primary-foreground/80 font-medium">Trips Completed</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-bold">99.9%</h3>
              <p className="text-primary-foreground/80 font-medium">Uptime</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-bold">30%</h3>
              <p className="text-primary-foreground/80 font-medium">Cost Reduction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="bg-muted rounded-3xl p-8 md:p-16 text-center max-w-5xl mx-auto border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to transform your fleet operations?</h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join hundreds of enterprises that trust CabEase to manage their employee transportation efficiently and safely.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/request-demo">
                  <Button size="lg" className="h-14 px-8 text-lg">
                    Book a Live Demo
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-background">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
