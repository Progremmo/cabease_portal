import { ContactForm } from "@/features/website/contact/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Contact Us | CabEase",
  description: "Get in touch with our sales and support team.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-primary/5 py-20 border-b">
        <div className="container mx-auto px-4 sm:px-8 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Contact Our Team</h1>
          <p className="text-xl text-muted-foreground">
            We&apos;re here to help. Reach out to us for any sales inquiries, support, or partnership opportunities.
          </p>
        </div>
      </div>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="col-span-1 space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Email Sales</h4>
                      <p className="text-muted-foreground">{siteConfig.company.salesEmail}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Call Us</h4>
                      <p className="text-muted-foreground">{siteConfig.company.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Headquarters</h4>
                      <p className="text-muted-foreground">{siteConfig.company.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-2 bg-muted/30 p-8 rounded-2xl border">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
