"use client";
import Link from "next/link";
import { Bounce, toast } from "react-toastify";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import Image from "next/image";
import Discover from "@/components/Discover/Discover";
import MoreServices from "@/components/MoreServices/MoreServices";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";
import { OurServicesDataProps } from "@/domain/OurServices.ts/OurServices";
import Loading from "../Loading/Loading";

export default function ServicePageComponent() {
  const { serviceId } = useParams();
  const { data: serviceDetails, isFetching } = useQuery({
    queryKey: ["getOurServiceById"],
    queryFn: async () => {
      if (serviceId) {
        try {
          const { data } = await api.get<OurServicesDataProps>(
            `/our-service/${serviceId}`
          );
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
    <div className="flex flex-col justify-center items-center w-full">
      <div className="lg:w-[80%] w-[90%] flex flex-col justify-center items-center lg:py-52 pt-52">
        <div className="w-[80%] flex flex-col justify-center items-center gap-5">
          <h1 className="text-3xl text-black font-ppMonument lg:whitespace-nowrap whitespace-pre-line text-center">
            {serviceDetails?.title}
          </h1>
          <p className="text-gray2 text-sm text-center whitespace-pre-line">
            {serviceDetails?.subtitle}
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
        <div className="lg:w-[60%] flex flex-col justify-between items-center mt-10">
          <Image
            src={
              (process.env.NEXT_PUBLIC_IMAGE_URL ?? "") +
                serviceDetails?.image || ""
            }
            width={300}
            height={300}
            alt="Airport tranfers image"
            className="w-full lg:h-[300px] h-[400px] object-cover rounded-xl"
          />

          <div className="w-full flex flex-col justify-between items-center my-16 gap-5">
            <p className="text-black text-sm whitespace-pre-line">
              {serviceDetails?.description}
            </p>
          </div>

          <div className="lg:block hidden w-full">
            <Discover isInService />
          </div>
        </div>
      </div>

      <MoreServices />
      <div className="lg:hidden block w-full">
        <Discover />
      </div>
    </div>
  );
}
