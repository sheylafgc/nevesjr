import BlogPageComponent from "@/components/BlogPageComponent/BlogPageComponent";
import { getBlogs } from "@/domain/Blog/BlogService";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateStaticParams() {
  const res = await getBlogs();
  if (!res) return [];
  return res.map((blog: { id: number }) => ({
    blogId: blog.id.toString(),
  }));
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  if (!blogId) {
    return notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogPageComponent />
    </Suspense>
  );
}
