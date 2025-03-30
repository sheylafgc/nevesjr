/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import CarImage from "@/public/frame2.svg";
import { FaArrowRight } from "react-icons/fa6";
import Discover from "@/components/Discover/Discover";
import { Suspense, useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { api } from "@/src/api/api";
import { OurServicesDataProps } from "@/src/domain/OurServices.ts/OurServices";
import { useRouter } from "@/src/i18n/navigation";

type OurServicesPageProps = {
  section1_title: string;
  section1_subtitle: string;
  section1_image: string;
  section2_services: OurServicesDataProps[];
  section3_title: string;
  section3_banner: string;
};

function OurServicesItem() {
  const locale = useLocale();
  const router = useRouter();
  const [pageData, setPageData] = useState<OurServicesPageProps | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get<OurServicesPageProps>(
        `/content/our-services-page/?lang=${locale}`
      );
      console.log(data);
      setPageData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center w-full flex-col">
      <div className="w-full lg:h-[500px] py-32 lg:py-0 bg-gradient-to-r from-gray4 via-black to-black flex flex-col lg:flex-row items-center justify-evenly">
        <div className="flex lg:flex-row flex-col justify-between items-center lg:w-[80%] w-full">
          <div className="w-[90%] lg:w-auto flex flex-col justify-center items-start gap-3 mb-4">
            <h1 className="font-ppMonument text-3xl text-gray1 leading-s50 whitespace-pre-line">
              {pageData?.section1_title}
            </h1>
            <p className="text-sm text-gray1 font-light whitespace-pre-line">
              {pageData?.section1_subtitle}
            </p>
          </div>
          <Image
            width={400}
            height={400}
            src={
              pageData?.section1_image
                ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${pageData.section1_image}`
                : CarImage
            }
            className="w-[90%] lg:w-[400px]"
            alt="car image"
          />
        </div>
      </div>

      <div className="lg:w-[80%] w-[90%] flex flex-col justify-between items-center py-28 divide-y">
        {pageData?.section2_services.map((service, index) => (
          <div
            key={index}
            className="w-full flex flex-col lg:flex-row items-center justify-between lg:mb-0 mb-8"
          >
            <div className="hidden lg:flex flex-row gap-10 items-center my-10">
              <Image
                width={320}
                height={180}
                src={
                  (process.env.NEXT_PUBLIC_IMAGE_URL ?? "") + service?.image ||
                  ""
                }
                alt={service.title}
                className="rounded-xl w-[320px] h-[150px] bg-cover"
              />
              <h1 className="font-ppMonument leading-s50 text-3xl text-black whitespace-pre-line text-wrap">
                {service.title}
              </h1>
            </div>
            <Image
              width={300}
              height={180}
              src={
                (process.env.NEXT_PUBLIC_IMAGE_URL ?? "") + service?.image || ""
              }
              alt={service.title}
              className="w-full lg:hidden block rounded-xl object-cover"
            />
            <div className="lg:hidden flex flex-row w-full justify-between items-center my-4">
              <h1 className="font-ppMonument leading-s50 text-3xl text-black whitespace-pre-line text-wrap">
                {service.title}
              </h1>
              <button
                onClick={() =>
                  router.push(`/OurServices/ServicePage/${service.id}`)
                }
              >
                <FaArrowRight className="w-10 h-10 text-gray2 p-2 border rounded-full hover:bg-black hover:text-gray1" />
              </button>
            </div>

            <p className="text-gray2 text-sm font-light whitespace-pre-line lg:w-auto w-full">
              {service.subtitle}
            </p>
            <button
              onClick={() =>
                router.push(`/OurServices/ServicePage/${service.id}`)
              }
            >
              <FaArrowRight className="lg:block hidden w-10 h-10 text-gray2 p-2 border rounded-full hover:bg-black hover:text-gray1" />
            </button>
          </div>
        ))}
      </div>

      <Discover
        backgroundImage={pageData?.section3_banner}
        title={pageData?.section3_title}
      />
    </div>
  );
}

export default function OurServices() {
  return (
    <Suspense>
      <OurServicesItem />
    </Suspense>
  );
}
