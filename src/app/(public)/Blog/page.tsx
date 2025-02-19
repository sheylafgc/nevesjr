"use client";
import { BlogCarousel } from "@/app/constants/BlogCarousel";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FaFilter } from "react-icons/fa";
import Image from "next/image";
import { useInfiniteQuery } from "@tanstack/react-query";
// import { getBlogs } from "@/domain/Blog/BlogService";
import { ClipLoader } from "react-spinners";
import Link from "next/link";
import { getBlogs } from "@/domain/Blog/BlogService";

export default function Blog() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = BlogCarousel.length;

  const {
    data: blogs,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["blogs"],
    queryFn: async ({ pageParam = 1 }) => {
      const allBlogs = await getBlogs();
      return allBlogs?.slice((pageParam - 1) * 3, pageParam * 3);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      (lastPage?.length ?? 0) > 0 ? allPages.length + 1 : undefined,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalItems);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalItems]);

  function handleNext() {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalItems);
  }

  function handlePrev() {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  }

  function handleFilter() {
    //TODO: filter blogs
    console.log(blogs);
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full flex flex-col justify-center items-center bg-gradient-to-r from-gray4 to-black">
        <div className="w-[80%] flex justify-center items-center pt-40 pb-20">
          <Carousel
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            arrowsOrientation="normal"
            buttonColor="white"
            className="w-full flex flex-col gap-10"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent className="gap-5">
              {BlogCarousel.map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundImage: `url('${item.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className={`${
                    activeIndex === index
                      ? "lg:w-[80%] w-full lg:h-[600px] h-[400px]"
                      : "hidden lg:block lg:w-[200px] h-[400px] sm:h-[600px]"
                  } flex flex-col justify-end items-start gap-3 rounded-lg lg:p-10 p-4 box-border transition-all overflow-hidden`}
                >
                  <Button className="rounded-full bg-gray4 hover:bg-gray2">
                    Lorem ipsum
                  </Button>
                  <h1 className="w-full lg:text-3xl text-2xl text-gray1 lg:leading-s50 font-ppMonument whitespace-pre-line">
                    {item.title}
                  </h1>
                  <p className="w-full text-sm font-light text-gray1">
                    {item.description}
                  </p>
                </div>
              ))}
            </CarouselContent>
            <div className="flex-row flex items-center lg:justify-start justify-center gap-6">
              <button
                onClick={handlePrev}
                className="border border-gray1 rounded-full lg:p-2 p-3 hover:opacity-80"
              >
                <ArrowLeft className={`h-4 w-4 text-gray1`} />
              </button>
              <button
                onClick={handleNext}
                className="border border-gray1 rounded-full lg:p-2 p-3 hover:opacity-80"
              >
                <ArrowRight className={`h-4 w-4 text-gray1`} />
              </button>
            </div>
          </Carousel>
        </div>
      </div>

      <div className="w-[80%] flex flex-col justify-center items-center py-32">
        <div className="w-full flex flex-row justify-between items-center mb-16">
          <h1 className="font-ppMonument text-3xl text-black">Blog</h1>
          <Button
            onClick={handleFilter}
            className="bg-gray1 rounded-full px-8 py-3 text-black shadow-sm hover:text-gray1"
          >
            <FaFilter size={20} />
            Filters
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {blogs?.pages.flat().map((blog) => (
            <Link
              href={`/Blog/BlogPage/${blog?.id}`}
              key={blog?.id}
              className="flex flex-col justify-start items-center overflow-hidden"
            >
              <Image
                unoptimized
                priority
                width={300}
                height={200}
                src={
                  (process.env.NEXT_PUBLIC_IMAGE_URL ?? "") + blog?.image || ""
                }
                className="h-[200px] object-cover rounded-xl mb-5 w-full"
                alt={blog?.title ?? "blog image"}
              />
              <div className="flex flex-col justify-center items-center w-full">
                <h1 className="text-black font-bold text-center w-full">
                  {blog?.title}
                </h1>
                <p className="text-xs text-black font-light text-center w-full">
                  {blog?.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="w-full flex justify-center items-center mt-16">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage || (blogs?.pages.length ?? 0) >= 3}
            className="bg-gray1 rounded-full px-8 py-3 text-black shadow-sm hover:text-gray1"
          >
            {isFetchingNextPage ? (
              <>
                <ClipLoader size={20} />
                <span>Loading...</span>
              </>
            ) : (blogs?.pages.length ?? 0) < 3 ? (
              "See more"
            ) : (
              "Nothing more to load"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
