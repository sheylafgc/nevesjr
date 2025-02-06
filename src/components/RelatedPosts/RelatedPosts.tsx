import { getBlogs } from "@/domain/Blog/BlogService";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

interface BlogPageProps {
  blogId: number;
}

export default function RelatedPosts({ blogId }: BlogPageProps) {
  const {
    data: blogs,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["getRealeatedPosts"],
    queryFn: async () => {
      const allBlogs = await getBlogs();
      const filteredBlogs = allBlogs.filter((blog) => blog.id !== blogId);
      return filteredBlogs.slice(0, 3);
    },
    enabled: !!blogId,
  });

  useEffect(() => {
    // Refetch quando blogId mudar
    if (blogId) {
      refetch();
    }
  }, [blogId, refetch]); // Dependência em blogId

  return (
    <div className="w-full lg:py-0 py-20 lg:h-[700px] bg-gray1 flex flex-col justify-center items-center">
      <div className="lg:w-[80%] w-[90%] flex flex-col justify-center items-start">
        <div className="w-full flex flex-row justify-between items-center mb-20">
          <h1 className="font-ppMonument text-3xl text-black">Related Posts</h1>
          <Link
            href={"/pages/Blog"}
            className="hidden lg:flex justify-center items-center px-3 py-2 text-gray1 text-sm bg-black rounded-full hover:opacity-80"
          >
            See more posts
          </Link>
        </div>
        {isLoading ? (
          <div className="w-full flex justify-center items-center gap-10">
            <ClipLoader size={40} />
            <h1 className="text-2xl text-black ">Loading ...</h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
            {blogs?.map((blog) => (
              <Link
                href={{
                  pathname: "/pages/Blog/BlogPage",
                  query: {
                    blogId: blog.id,
                    title: blog.title,
                    subtitle: blog.subtitle,
                    image: blog.image,
                    category: blog.category,
                    description: blog.description,
                    created_at: blog.created_at,
                  },
                }}
                key={blog.id}
                className="flex flex-col justify-start items-center overflow-hidden"
              >
                <Image
                  width={300}
                  height={200}
                  src={blog.image}
                  className="h-[200px] object-cover rounded-xl mb-5 w-full"
                  alt={blog.title}
                />
                <div className="flex flex-col justify-center items-center w-full">
                  <h1 className="text-black font-bold text-center w-full">
                    {blog.title}
                  </h1>
                  <p className="text-xs text-black font-light text-center w-full">
                    {blog.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
        <Link
          href={"/pages/Blog"}
          className="lg:hidden flex justify-center items-center mt-10 px-5 py-3 text-gray1 text-xs bg-black rounded-full hover:opacity-80"
        >
          See more posts
        </Link>
      </div>
    </div>
  );
}
