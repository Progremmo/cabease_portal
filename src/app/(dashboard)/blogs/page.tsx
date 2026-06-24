"use client";

import React, { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ColDef } from "ag-grid-community";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { DataTable } from "@/components/tables/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { blogService, BlogDTO } from "@/services/blog.service";

export default function BlogsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch Blogs
  const { data: paginatedData, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => blogService.getAllBlogs(0, 100), // simplistic pagination for now
  });

  const blogs = paginatedData?.content || [];

  const deleteMutation = useMutation({
    mutationFn: (id: string) => blogService.deleteBlog(id),
    onSuccess: () => {
      toast.success("Blog deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: () => toast.error("Failed to delete blog"),
  });

  // AG Grid Column Definitions
  const columnDefs = useMemo<ColDef<BlogDTO>[]>(
    () => [
      {
        field: "title",
        headerName: "Title",
        flex: 1,
      },
      {
        field: "slug",
        headerName: "Slug",
        flex: 1,
      },
      {
        field: "authorName",
        headerName: "Author",
        width: 150,
      },
      {
        field: "status",
        headerName: "Status",
        width: 150,
        cellRenderer: (params: any) => {
          const status = params.value;
          return (
            <Badge variant={status === "PUBLISHED" ? "default" : "outline"} className="mt-2">
              {status}
            </Badge>
          );
        },
      },
      {
        field: "publishedAt",
        headerName: "Published At",
        width: 180,
        cellRenderer: (params: any) => {
          if (!params.value) return "N/A";
          return new Date(params.value).toLocaleDateString();
        },
      },
      {
        colId: "actions",
        headerName: "Actions",
        width: 120,
        sortable: false,
        filter: false,
        cellRenderer: (params: any) => {
          const blog = params.data;
          if (!blog) return null;
          
          return (
            <div className="flex items-center gap-2 mt-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => router.push(`/blogs/${blog.id}/edit`)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive h-8 w-8 hover:bg-destructive/10"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this blog?")) {
                    deleteMutation.mutate(blog.id);
                  }
                }}
                title="Delete Blog"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          );
        },
      },
    ],
    [router, deleteMutation]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
          <p className="text-muted-foreground mt-1">
            Manage your public blog posts and articles.
          </p>
        </div>
        <Link href="/blogs/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Write Blog Post
          </Button>
        </Link>
      </div>

      <div className="rounded-xl bg-card border border-border shadow-sm p-4">
        <DataTable
          rowData={blogs}
          columnDefs={columnDefs}
          isLoading={isLoading}
          height={600}
        />
      </div>
    </div>
  );
}
