import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: `Blog | ${siteConfig.name}`,
  description: "Insights, updates, and resources on fleet management and enterprise transportation.",
};

async function getBlogs() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
    const res = await fetch(`${baseUrl}/public/blogs?page=0&size=20`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data?.content || [];
  } catch (e) {
    console.error("Failed to fetch blogs:", e);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogs();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-primary/5 py-20 border-b">
        <div className="container mx-auto px-4 sm:px-8 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">{siteConfig.name} Blog</h1>
          <p className="text-xl text-muted-foreground">
            Insights, updates, and resources on fleet management and enterprise transportation.
          </p>
        </div>
      </div>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
          {posts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No blogs published yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden flex flex-col group border-border">
                    <div className="aspect-[16/9] bg-muted relative overflow-hidden">
                      {post.coverImageUrl ? (
                        <img src={post.coverImageUrl} alt={post.title} className="object-cover w-full h-full transition-transform group-hover:scale-105" />
                      ) : (
                        <div className="absolute inset-0 bg-primary/10 transition-transform group-hover:scale-105 flex items-center justify-center">
                          <span className="text-primary/40 font-bold text-2xl">{siteConfig.name}</span>
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <CardDescription className="text-base line-clamp-3">
                        {post.excerpt || post.content.substring(0, 150) + "..."}
                      </CardDescription>
                    </CardContent>
                    <div className="px-6 pb-6 mt-auto">
                      <span className="text-sm font-medium text-muted-foreground">
                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-muted-foreground float-right">By {post.authorName}</span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
