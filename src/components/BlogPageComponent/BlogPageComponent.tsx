"use client";
import { api } from "@/src/api/api";
import RelatedPosts from "@/components/RelatedPosts/RelatedPosts";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaLink } from "react-icons/fa";
import { Bounce, toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { useLocale, useTranslations } from "next-intl";
import { getSocialMedia } from "@/src/domain/Content/SociaMedia";
import { BlogProps } from "@/src/domain/Blog/BlogService";
import HtmlRerender from "../HtmlRerender/HtmlRerender";

export default function BlogPageComponent() {
  const tToast = useTranslations("Toasts");
  const params = useParams();
  const locale = useLocale();
  const blogId = Array.isArray(params.blogId)
    ? params.blogId[0]
    : params.blogId;

  const {
    data: blogDetails,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["getBlogPage", blogId, locale],
    queryFn: async () => {
      // if (!blogId) return null;
      if (!blogId) {
        console.log("No blogId, queryFn skipped");
        return null;
      }

      try {
        const { data } = await api.get<BlogProps>(
          `/blog/${blogId}/?lang=${locale}`
        );
        console.log("DATA", data);
        return data;
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        throw err;
      }
    },
    enabled: !!blogId,
  });

  const { data: socialMedia } = useQuery({
    queryKey: ["getSocialMediaContent", locale],
    queryFn: () => getSocialMedia({ locale }),
  });

  const copyCurrentUrl = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast.success(tToast("URL_copied"), {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch(console.error);
  };

  if (isFetching) return <Loading />;
  if (error) return <div>Error loading blog post</div>;
  if (!blogDetails) return <div>Blog post not found</div>;

  const socialLinks = [
    {
      icon: <FaFacebookF size={20} />,
      href:
        socialMedia?.find((m) => m.label.toLowerCase().includes("facebook"))
          ?.value || "#",
    },
    {
      icon: <FaLinkedinIn size={20} />,
      href:
        socialMedia?.find((m) => m.label.toLowerCase().includes("linkedin"))
          ?.value || "#",
    },
    {
      icon: <FaWhatsapp size={20} />,
      href: `https://wa.me/${
        socialMedia?.find((m) => m.label.toLowerCase().includes("whatsapp"))
          ?.value || ""
      }`,
    },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col w-full h-[800px] lg:h-[700px] justify-center items-center bg-gradient-to-r from-gray4 to-black">
        <div className="lg:w-[64%] w-[90%] flex flex-col items-center my-10">
          <div className="w-full flex justify-around lg:justify-center items-center gap-3 mb-1">
            <span className="bg-black rounded-full px-3 py-2 text-center text-gray1 text-sm">
              {blogDetails.category}
            </span>
            <span className="text-center text-gray1 text-sm">
              {blogDetails.created_at}
            </span>
          </div>

          <div className="lg:w-auto w-full flex flex-col items-center gap-6 text-center">
            <h1 className="font-ppMonument text-3xl text-gray1 leading-s50 whitespace-pre-line">
              {blogDetails.title}
            </h1>

            <p className="text-sm text-gray1 whitespace-pre-line">
              {blogDetails.subtitle}
            </p>

            <div className="flex gap-5">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-white rounded-full bg-gray2 p-3 hover:bg-gray-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </Link>
              ))}

              <button
                onClick={copyCurrentUrl}
                className="bg-gray2 rounded-full p-3 text-white hover:bg-gray-600 transition-colors"
                aria-label="Copy link"
              >
                <FaLink size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-[60%] w-[90%] flex flex-col items-center -mt-24">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL || ""}${blogDetails.image}`}
          width={1200}
          height={630}
          alt={blogDetails.title}
          className="w-full h-[400px] object-cover rounded-xl"
          priority
        />

        <div className="w-full my-16 space-y-5">
          <HtmlRerender
            htmlString={blogDetails.description || ""}
            className="text-black text-sm whitespace-pre-line"
          />
        </div>
      </div>

      <RelatedPosts blogId={blogDetails.id} />
    </div>
  );
}
