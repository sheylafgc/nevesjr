"use client";
import Image from "next/image";
import CarImage from "../../../../../public/frame2.svg";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import Discover from "@/components/Discover/Discover";
import {
  OurServicesData,
  OurServicesDataProps,
} from "@/app/constants/OurServices";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback } from "react";

function OurServicesItem() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function handleServiceClick(service: OurServicesDataProps) {
    localStorage.setItem("servicePageData", JSON.stringify(service));
    router.push(
      "/pages/OurServices/ServicePage" +
        "?" +
        createQueryString("id", String(service.id)) +
        "&" +
        createQueryString("title", service.title) +
        "&" +
        createQueryString("subtitle", service.subtitle) +
        "&" +
        createQueryString("image", service.image) +
        "&" +
        createQueryString("description", service.description)
    );
  }

  return (
    <div className="flex justify-center items-center w-full flex-col">
      <div className="w-full lg:h-[500px] py-32 lg:py-0 bg-gradient-to-r from-gray4 via-black to-black flex flex-col lg:flex-row items-center justify-evenly">
        <div className="w-[90%] lg:w-auto flex flex-col justify-center items-start gap-3 mb-4">
          <h1 className="font-ppMonument text-3xl text-gray1 leading-s50">
            Discover our <br /> services
          </h1>
          <p className="text-sm text-gray1 font-light">
            Experience premium executive chauffeur services tailored for <br />{" "}
            comfort, style, and reliability—perfect for your every journey.
          </p>
        </div>
        <Image
          width={400}
          height={400}
          src={CarImage}
          priority
          unoptimized
          className="w-[90%] lg:w-[400px]"
          alt="car image"
        />
      </div>

      <div className="lg:w-[80%] w-[90%] flex flex-col justify-between items-center py-28 divide-y">
        {OurServicesData.map((service, index) => (
          <div
            key={index}
            className="w-full flex flex-col lg:flex-row items-center justify-between lg:mb-0 mb-8"
          >
            <div className="hidden lg:flex flex-row gap-10 items-center my-10">
              <Image
                unoptimized
                priority
                width={300}
                height={180}
                src={service.image}
                alt="Airport tranfers image"
                className="rounded-xl object-cover"
              />
              <h1 className="font-ppMonument leading-s50 text-3xl text-black whitespace-pre-line text-wrap">
                {service.title}
              </h1>
            </div>
            <Image
              unoptimized
              priority
              width={300}
              height={180}
              src={service.image}
              alt="Airport tranfers image"
              className="w-full lg:hidden block rounded-xl object-cover"
            />
            <div className="lg:hidden flex flex-row w-full justify-between items-center my-4">
              <h1 className="font-ppMonument leading-s50 text-3xl text-black whitespace-pre-line text-wrap">
                {service.title}
              </h1>
              <Link
                href={{
                  pathname: "/pages/OurServices/ServicePage",
                  query: {
                    title: service.title,
                    subtitle: service.subtitle,
                    image: service.image,
                    description: service.description,
                  },
                }}
              >
                <FaArrowRight className="w-10 h-10 text-gray2 p-2 border rounded-full hover:bg-black hover:text-gray1" />
              </Link>
            </div>

            <p className="text-gray2 text-sm font-light whitespace-pre-line lg:w-auto w-full">
              {service.subtitle}
            </p>
            <button
              onClick={() => handleServiceClick(service)}
              className="hidden lg:block"
            >
              <FaArrowRight className="w-10 h-10 text-gray2 p-2 border rounded-full hover:bg-black hover:text-gray1" />
            </button>
          </div>
        ))}
      </div>

      <Discover />
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
