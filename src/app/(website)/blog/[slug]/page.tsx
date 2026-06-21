import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

async function getBlogBySlug(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
    const res = await fetch(`${baseUrl}/public/blogs/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (e) {
    console.error("Failed to fetch blog:", e);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) return { title: `Not Found | ${siteConfig.name}` };
  return {
    title: `${blog.title} | ${siteConfig.name}`,
    description: blog.excerpt || `${blog.title} - Read more on the ${siteConfig.name} blog.`,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-muted py-16 md:py-24 border-b relative overflow-hidden">
        {blog.coverImageUrl ? (
          <div className="absolute inset-0 z-0">
            <img src={blog.coverImageUrl} alt={blog.title} className="object-cover w-full h-full opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-primary/5" />
        )}

        <div className="container mx-auto px-4 sm:px-8 max-w-4xl relative z-10">
          <Link href="/blog">
            <Button variant="ghost" className="mb-8 -ml-4 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <Badge variant="secondary">{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}</Badge>
            <span className="text-sm font-medium text-muted-foreground">By {blog.authorName}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            {blog.title}
          </h1>
          {blog.excerpt && (
            <p className="text-xl text-muted-foreground">
              {blog.excerpt}
            </p>
          )}
        </div>
      </div>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            {/* If content is raw text/markdown, a markdown parser like react-markdown should be used. 
                For now, we'll dangerouslySetInnerHTML if it's HTML, or just render it. */}
            <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }} />
          </article>
        </div>
      </section>
    </div>
  );
}
