import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function generateMetadata({ params }: { params: { slug: string } }) {
  // In a real app, you would fetch the post by slug to generate title/description
  return {
    title: `${params.slug.replace(/-/g, ' ')} | CabEase Blog`,
    description: "Read more on the CabEase blog.",
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Mock data fetching
  const post = {
    title: params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    date: "Jun 12, 2024",
    category: "Fleet Operations",
    author: "Jane Doe",
    content: "This is a placeholder for the blog content. In a production environment, this content would be fetched from a CMS like Sanity, Contentful, or a database, and rendered using a markdown parser or rich text renderer.",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <article className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
          <Link href="/blog">
            <Button variant="ghost" className="mb-8 -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
          
          <div className="mb-8 space-y-4">
            <Badge>{post.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{post.title}</h1>
            <div className="flex items-center text-muted-foreground gap-4 text-sm font-medium">
              <span>{post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
          </div>
          
          <div className="aspect-[21/9] relative rounded-2xl border overflow-hidden mb-12 bg-muted">
            <Image src="/images/blog_hero.png" alt="Blog Hero" fill className="object-cover" sizes="100vw" priority />
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              {post.content}
            </p>
            <p className="text-lg leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h2 className="text-2xl font-bold mt-10 mb-4">Key Takeaways</h2>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Implement AI routing algorithms</li>
              <li>Monitor driver behavior and idle times</li>
              <li>Perform regular preventative maintenance</li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
}
