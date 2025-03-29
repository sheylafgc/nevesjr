"use client";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { getBlogs, getBlogsForCarousel } from "@/src/domain/Blog/BlogService";
import FilterBlogs from "@/components/FilterBlogs/FilterBlogs";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/src/i18n/navigation";

export default function Blog() {
  const tButton = useTranslations("Buttons");
  const t = useTranslations("BlogsPage");
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalItems, setTotalItems] = useState<number>();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const locale = useLocale();

  const {
    data: blogs,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["blogs", locale, selectedCategory],
    queryFn: async ({ pageParam = 1 }) => {
      const blogsData = await getBlogs({
        locale: locale,
        category: selectedCategory,
      });
      return blogsData?.slice((pageParam - 1) * 3, pageParam * 3);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      (lastPage?.length ?? 0) > 0 ? allPages.length + 1 : undefined,
  });

  const { data: blogsForCarousel } = useQuery({
    queryKey: ["blogForCarousel", locale],
    queryFn: async () => {
      const blogs = await getBlogsForCarousel({ locale });
      setTotalItems(blogs.length);
      return blogs;
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % (totalItems ?? 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [totalItems]);

  function handleNext() {
    setActiveIndex((prevIndex) => (prevIndex + 1) % (totalItems ?? 1));
  }

  function handlePrev() {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + (totalItems ?? 1)) % (totalItems ?? 1)
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full flex flex-col justify-center items-center bg-gradient-to-r from-gray4 to-black">
        <div className="lg:w-[80%] w-[90%] flex justify-center items-center pt-40 pb-20">
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
              loop: (blogsForCarousel?.length ?? 0) > 1,
            }}
          >
            <CarouselContent className="gap-5">
              {blogsForCarousel?.map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundImage: `url(${
                      (process.env.NEXT_PUBLIC_IMAGE_URL ?? "") + item?.image ||
                      ""
                    })`,
                  }}
                  onClick={() => router.push(`/Blog/BlogPage/${item?.id}`)}
                  className={`
          ${
            blogsForCarousel.length === 1
              ? "w-full whitespace-pre-line cursor-pointer"
              : activeIndex === index
              ? "lg:w-[80%] w-full"
              : "hidden lg:flex lg:w-[200px]"
          }
          ${
            blogsForCarousel.length === 2 && activeIndex !== index
              ? "lg:opacity-70"
              : ""
          }
          lg:h-[600px] h-[500px]
          flex bg-cover bg-center
          flex-col justify-end items-start
          gap-3 rounded-lg lg:p-10 p-4
          box-border transition-all overflow-hidden lg:whitespace-nowrap
          cursor-pointer
        `}
                >
                  <span className="rounded-full px-4 py-2 text-sm text-white bg-gray4">
                    {item?.category}
                  </span>
                  <h1
                    className={`w-full lg:text-3xl text-2xl text-gray1 lg:leading-s50 font-ppMonument ${
                      activeIndex === index ? "lg:truncate" : ""
                    } `}
                  >
                    {item?.title}
                  </h1>
                  <p
                    className={`w-full text-sm font-light text-gray1 ${
                      activeIndex === index ? "lg:truncate" : ""
                    } `}
                  >
                    {item?.subtitle}
                  </p>
                </div>
              ))}
            </CarouselContent>

            {(blogsForCarousel?.length ?? 0) > 1 && (
              <div className="flex-row flex items-center lg:justify-start justify-center gap-6">
                <button
                  onClick={handlePrev}
                  className="border border-gray1 rounded-full lg:p-2 p-3 hover:opacity-80"
                >
                  <ArrowLeft className="h-4 w-4 text-gray1" />
                </button>
                <button
                  onClick={handleNext}
                  className="border border-gray1 rounded-full lg:p-2 p-3 hover:opacity-80"
                >
                  <ArrowRight className="h-4 w-4 text-gray1" />
                </button>
              </div>
            )}
          </Carousel>
        </div>
      </div>

      <div className="lg:w-[80%] w-[90%] flex flex-col justify-center items-center py-32">
        <div className="w-full flex flex-row justify-between items-center mb-16">
          <h1 className="font-ppMonument text-3xl text-black">Blog</h1>
          <FilterBlogs
            onFilter={(category) => setSelectedCategory(category)}
            currentFilter={selectedCategory}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {blogs?.pages.flat().map((blog) =>
            isFetching ? (
              <div
                key={blog?.id}
                className="flex flex-col justify-start items-center overflow-hidden"
              >
                <Skeleton className="h-[200px] object-cover rounded-xl mb-5 w-full" />
                <div className="flex flex-col justify-center items-center w-full gap-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ) : (
              <button
                onClick={() => router.push(`/Blog/BlogPage/${blog?.id}`)}
                key={blog?.id}
                className="flex flex-col justify-start items-center overflow-hidden"
              >
                <Image
                  unoptimized
                  priority
                  width={300}
                  height={200}
                  src={
                    (process.env.NEXT_PUBLIC_IMAGE_URL ?? "") + blog?.image ||
                    ""
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
              </button>
            )
          )}
        </div>
        <div className="w-full flex justify-center items-center mt-16">
          <Button
            onClick={() => fetchNextPage()}
            disabled={
              isFetchingNextPage ||
              isFetching ||
              (blogs?.pages.length ?? 0) <= 3
            }
            className="bg-gray1 rounded-full px-8 py-3 text-black shadow-sm hover:text-gray1"
          >
            {isFetchingNextPage ? (
              <>
                <ClipLoader size={20} />
                <span>{tButton("loading")}</span>
              </>
            ) : (blogs?.pages.length ?? 0) < 3 ? (
              tButton("see_more")
            ) : (
              t("nothing_more_to_load")
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
