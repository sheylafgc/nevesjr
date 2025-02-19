"use client";
import { api } from "@/api/api";
import RelatedPosts from "@/components/RelatedPosts/RelatedPosts";
import { BlogProps } from "@/context/BlogContext/BlogContext";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { Bounce, toast } from "react-toastify";
import Loading from "../Loading/Loading";

export default function BlogPageComponent() {
  const { blogId } = useParams();
  const { data: blogDetails, isFetching } = useQuery({
    queryKey: ["getBlogPage"],
    queryFn: async () => {
      if (blogId) {
        try {
          const { data } = await api.get<BlogProps>(`/blog/${blogId}`);
          return data;
        } catch (error) {
          console.error(error);
        }
      }
    },
  });

  function copyCurrentUrl() {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("URL copied to clipboard", {
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
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }
  return isFetching ? (
    <Loading />
  ) : (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="flex flex-col w-full h-[800px] lg:h-[700px] justify-center items-center bg-gradient-to-r from-gray4 to-black">
        <div className="lg:w-[64%] w-[90%] flex flex-col justify-center items-center my-10">
          <div className="w-full flex flex-row justify-around lg:justify-center items-center gap-3 mb-1">
            <span className="bg-black rounded-full px-3 py-2 text-center text-gray1 text-sm">
              {blogDetails?.category}
            </span>
            <span className="text-center text-gray1 text-sm">
              {blogDetails?.created_at}
            </span>
          </div>
          <div className="lg:w-auto w-full flex flex-col justify-center items-center gap-6">
            <p className="font-ppMonument text-center text-3xl text-gray1 leading-s50 whitespace-pre-line">
              {blogDetails?.title}
            </p>
            <p className="text-center text-sm text-gray1 whitespace-pre-line">
              {blogDetails?.subtitle}
            </p>
            <div className="flex flex-row justify-between items-center gap-5">
              <Link href={"#"} className="text-white rounded-full bg-gray2 p-3">
                <FaFacebookF size={20} />
              </Link>
              <Link href={"#"} className="text-white rounded-full bg-gray2 p-3">
                <FaLinkedinIn size={20} />
              </Link>
              <Link href={"#"} className="text-white rounded-full bg-gray2 p-3">
                <FaWhatsapp size={20} />
              </Link>
              <button
                onClick={copyCurrentUrl}
                className="bg-gray2 rounded-full p-3 shadow-none text-white"
              >
                <FaLink size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-[60%] w-[90%] flex flex-col justify-between items-center -mt-36">
        <Image
          src={
            (process.env.NEXT_PUBLIC_IMAGE_URL ?? "") + blogDetails?.image ||
            "/public/TravelImage.svg"
          }
          width={300}
          height={300}
          alt={blogDetails?.title || "Image not found"}
          className="w-full h-[300px] object-cover rounded-xl"
        />

        <div className="w-full flex flex-col justify-between items-center my-16 gap-5">
          <p className="text-black text-sm whitespace-pre-line">
            {blogDetails?.description}
          </p>
        </div>
      </div>
      <RelatedPosts blogId={blogDetails?.id ?? 1} />
    </div>
  );
}
