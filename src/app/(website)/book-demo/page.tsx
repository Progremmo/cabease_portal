import { BookDemoForm } from "@/features/website/demo/BookDemoForm";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Book a Demo | CabEase",
  description: "Schedule a live demonstration of the CabEase platform.",
};

const benefits = [
  "Live walkthrough of the CabEase dashboard",
  "Customized setup for your specific fleet size",
  "Q&A session with our product experts",
  "No commitment, completely free consultation",
];

export default function BookDemoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">See CabEase in Action</h1>
                <p className="text-xl text-muted-foreground">
                  Discover how our enterprise transportation platform can help you optimize routes, reduce costs, and ensure employee safety.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">What to expect:</h3>
                <ul className="space-y-4">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                      <span className="text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-background p-8 md:p-10 rounded-3xl border shadow-xl">
              <h3 className="text-2xl font-bold mb-8">Book your free demo</h3>
              <BookDemoForm />
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
