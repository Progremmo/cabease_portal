"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { BlogForm } from "@/components/forms/BlogForm";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { blogService } from "@/services/blog.service";

export default function EditBlogPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => blogService.getBlogById(id),
    enabled: !!id,
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/blogs">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Blog Post</h1>
          <p className="text-muted-foreground mt-1">
            Update your article content and details.
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-card border border-border shadow-sm p-6">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : blog ? (
          <BlogForm initialData={blog} />
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Blog post not found.
          </div>
        )}
      </div>
    </div>
  );
}
