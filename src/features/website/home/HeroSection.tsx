import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Car, Shield, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/features/website/animations";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-32">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          <div className="flex-1 text-center lg:text-left">
            <FadeIn>
              <Badge variant="outline" className="mb-6 py-1.5 px-4 rounded-full border-primary/30 bg-primary/5 text-primary">
                Introducing {siteConfig.name} 2.0
              </Badge>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
                <span dangerouslySetInnerHTML={{ __html: siteConfig.tagline.replace(' ', ' <br className="hidden lg:block" />\n') }} />
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                {siteConfig.description}
              </p>
            </FadeIn>
            
            <FadeIn delay={0.3} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/request-demo">
                <Button size="lg" className="h-14 px-8 text-base group">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/solutions">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base">
                  Explore Solutions
                </Button>
              </Link>
            </FadeIn>
            
            <StaggerContainer className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm font-medium text-muted-foreground">
              <StaggerItem className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" /> Enterprise Grade
              </StaggerItem>
              <StaggerItem className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" /> 24/7 Support
              </StaggerItem>
              <StaggerItem className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" /> Live Tracking
              </StaggerItem>
            </StaggerContainer>
          </div>
          
          <FadeIn delay={0.4} className="flex-1 w-full max-w-2xl lg:max-w-none">
            <div className="relative rounded-2xl border bg-background/50 backdrop-blur-sm p-2 shadow-2xl">
              <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/20 to-blue-500/20 blur-2xl rounded-full transform -translate-x-1/4 -translate-y-1/4" />
              <div className="aspect-[4/3] relative rounded-xl border overflow-hidden bg-muted">
                <Image src="/images/dashboard_mockup.png" alt="Dashboard Mockup" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
