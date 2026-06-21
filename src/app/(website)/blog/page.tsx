import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Blog | CabEase",
  description: "Insights, updates, and resources on fleet management and enterprise transportation.",
};

const posts = [
  {
    title: "5 Ways to Reduce Fuel Costs in 2024",
    slug: "5-ways-to-reduce-fuel-costs",
    excerpt: "Discover actionable strategies to cut down your fleet's fuel consumption using AI routing and predictive maintenance.",
    date: "Jun 12, 2024",
    category: "Fleet Operations",
    readTime: "5 min read",
  },
  {
    title: "The Ultimate Guide to Employee Transportation Compliance",
    slug: "employee-transportation-compliance-guide",
    excerpt: "Ensure your corporate fleet meets all regulatory requirements with our comprehensive compliance checklist.",
    date: "May 28, 2024",
    category: "Safety & Compliance",
    readTime: "8 min read",
  },
  {
    title: "Announcing CabEase 2.0: Next-Gen Analytics",
    slug: "announcing-cabease-2-0",
    excerpt: "We are thrilled to unveil our completely redesigned analytics dashboard, giving you deeper insights than ever before.",
    date: "May 15, 2024",
    category: "Product Updates",
    readTime: "3 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-primary/5 py-20 border-b">
        <div className="container mx-auto px-4 sm:px-8 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">CabEase Blog</h1>
          <p className="text-xl text-muted-foreground">
            Insights, updates, and resources on fleet management and enterprise transportation.
          </p>
        </div>
      </div>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden flex flex-col group">
                  <div className="aspect-[16/9] bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/10 transition-transform group-hover:scale-105" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <CardDescription className="text-base line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardContent>
                  <div className="px-6 pb-6 mt-auto">
                    <span className="text-sm font-medium text-muted-foreground">{post.date}</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
