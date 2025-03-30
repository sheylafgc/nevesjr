"use client";
import Link from "next/link";
import { Bounce, toast } from "react-toastify";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaLink } from "react-icons/fa";
import Image from "next/image";
import Discover from "@/components/Discover/Discover";
import MoreServices from "@/components/MoreServices/MoreServices";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/src/api/api";
import { OurServicesDataProps } from "@/src/domain/OurServices.ts/OurServices";
import Loading from "../Loading/Loading";
import { useLocale, useTranslations } from "next-intl";
import HtmlRerender from "../HtmlRerender/HtmlRerender";
import { getSocialMedia } from "@/src/domain/Content/SociaMedia";

export default function ServicePageComponent() {
  const tToast = useTranslations("Toasts");
  const params = useParams();
  const locale = useLocale();
  const serviceId = Array.isArray(params.serviceId)
    ? params.serviceId[0]
    : params.serviceId;

  const {
    data: serviceDetails,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["getOurServiceById", serviceId, locale],
    queryFn: async () => {
      if (!serviceId) return null;

      try {
        const { data } = await api.get<OurServicesDataProps>(
          `/our-service/${serviceId}/?lang=${locale}`
        );
        return data;
      } catch (err) {
        console.error("Failed to fetch service:", err);
        throw err;
      }
    },
    enabled: !!serviceId,
  });

  const { data: socialMedias } = useQuery({
    queryKey: ["getSocialMedia", locale],
    queryFn: async () => {
      const data = await getSocialMedia({ locale });
      return data;
    },
  });
  const whatsapp = socialMedias ? socialMedias[0] : null;

  const linkedin = socialMedias?.find(
    (media) => media.label.toLowerCase() === "linkedin"
  );

  const facebook = socialMedias?.find(
    (media) => media.label.toLowerCase() === "facebook"
  );

  const copyCurrentUrl = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
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
  if (error) return <div>Error loading service details</div>;
  if (!serviceDetails) return <div>Service not found</div>;

  const socialLinks = [
    { icon: <FaFacebookF size={20} />, href: facebook?.value },
    { icon: <FaLinkedinIn size={20} />, href: linkedin?.value },
    {
      icon: <FaWhatsapp size={20} />,
      href: `https://wa.me/${whatsapp?.value}`,
    },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="lg:w-[80%] w-[90%] flex flex-col items-center lg:py-52 pt-52">
        <div className="w-[80%] flex flex-col items-center gap-5 text-center">
          <h1 className="text-3xl text-black font-ppMonument lg:whitespace-nowrap whitespace-pre-line">
            {serviceDetails.title}
          </h1>

          <p className="text-gray2 text-sm whitespace-pre-line">
            {serviceDetails.subtitle}
          </p>

          <div className="flex gap-5">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href || ""}
                className="text-white rounded-full bg-gray2 p-3 hover:bg-gray-600 transition-colors"
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

        <div className="lg:w-[60%] flex flex-col items-center mt-10">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL || ""}${
              serviceDetails.image
            }`}
            width={800}
            height={450}
            alt={serviceDetails.title}
            className="w-full lg:h-[300px] h-[400px] object-cover rounded-xl"
            priority
          />

          <div className="w-full my-16 space-y-5">
            <HtmlRerender
              htmlString={serviceDetails.description}
              className="text-black text-sm whitespace-pre-line"
            />
          </div>

          <div className="hidden lg:block w-full">
            <Discover isInService />
          </div>
        </div>
      </div>

      <MoreServices />

      <div className="lg:hidden w-full">
        <Discover />
      </div>
    </div>
  );
}
