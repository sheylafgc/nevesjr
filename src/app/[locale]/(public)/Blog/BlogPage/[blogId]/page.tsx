import BlogPageComponent from "@/components/BlogPageComponent/BlogPageComponent";
import Loading from "@/components/Loading/Loading";
import { getBlogs } from "@/src/domain/Blog/BlogService";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateStaticParams() {
  const locales = ["en", "pt", "es"];
  const allBlogs = await Promise.all(
    locales.map((locale) => getBlogs({ locale }))
  );

  return locales.flatMap(
    (locale, index) =>
      allBlogs[index]?.map((blog: { id: number }) => ({
        locale,
        blogId: blog.id.toString(),
      })) || []
  );
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string; blogId: string }>;
}) {
  const { locale, blogId } = await params;
  const blog = await getBlogs({ locale: locale }).then((blogs) =>
    blogs?.find((b) => b.id.toString() === blogId)
  );

  if (!blog) {
    return notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <BlogPageComponent />
    </Suspense>
  );
}
