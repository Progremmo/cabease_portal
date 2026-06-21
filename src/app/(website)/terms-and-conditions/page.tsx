export const metadata = {
  title: "Terms and Conditions | CabEase",
  description: "Terms and conditions for using the CabEase platform.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-primary/5 py-12 border-b">
        <div className="container mx-auto px-4 sm:px-8 max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tight">Terms and Conditions</h1>
          <p className="text-muted-foreground mt-2">Last updated: June 21, 2024</p>
        </div>
      </div>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-8 max-w-4xl prose prose-slate dark:prose-invert">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using the CabEase platform, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you may not access the service.
          </p>
          
          <h2>2. Intellectual Property</h2>
          <p>
            The Service and its original content, features and functionality are and will remain the exclusive property of CabEase and its licensors. The Service is protected by copyright, trademark, and other laws of both the country and foreign countries.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>

          <h2>4. Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
          </p>
          
          <h2>5. Limitation of Liability</h2>
          <p>
            In no event shall CabEase, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>
        </div>
      </section>
    </div>
  );
}
