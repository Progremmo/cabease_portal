"use client";

import { BlogForm } from "@/components/forms/BlogForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CreateBlogPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/blogs">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Write Blog Post</h1>
          <p className="text-muted-foreground mt-1">
            Create a new article for your marketing website.
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-card border border-border shadow-sm p-6">
        <BlogForm />
      </div>
    </div>
  );
}
