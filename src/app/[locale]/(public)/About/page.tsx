/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Discover from "@/components/Discover/Discover";
import Image from "next/image";
import AboutImage from "@/public/WallMockup.svg";
import MenInACar from "@/public/personalTravel.svg";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { api } from "@/src/api/api";
import HtmlRerender from "@/src/components/HtmlRerender/HtmlRerender";

type AboutPageProps = {
  section1_title: string;
  section1_subtitle: string;
  section1_video: string;
  section2_title: string;
  section2_description: string;
  section3_image: string;
  section3_title: string;
  section3_description: string;
  section4_image: string;
  section4_title: string;
  section4_description: string;
  section5_title: string;
  section5_description: string;
  team_members: [
    {
      id: number;
      name: string;
      role: string;
      avatar: string;
    }
  ];
  section6_title: string;
  section6_banner: string;
};

export default function About() {
  const locale = useLocale();
  const [pageData, setPageData] = useState<AboutPageProps | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get<AboutPageProps>(
        `/content/about-page/?lang=${locale}`
      );
      console.log(data);
      setPageData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center w-full flex-col">
      <div className="w-full flex justify-center items-center lg:py-0 py-20 lg:h-[540px] bg-gradient-to-r from-gray4 to-black">
        <div className="lg:w-[80%] w-[90%] flex flex-col lg:flex-row items-center justify-around mt-20 gap-3">
          <div className="flex flex-col items-start justify-between gap-2">
            <h1 className="text-3xl font-ppMonument text-gray1">
              {pageData?.section1_title}
            </h1>
            <HtmlRerender
              htmlString={pageData?.section1_subtitle || ""}
              className="font-light text-gray1 text-sm"
            />
          </div>
          <Image
            width={660}
            height={440}
            src={AboutImage}
            alt="NevesJr about video"
            className="rounded-3xl mt-10 lg:mt-52"
          />
        </div>
      </div>

      <div className="lg:w-[80%] w-[90%] flex flex-col lg:flex-row justify-between items-center lg:h-[600px] lg:py-0 py-20">
        <div className="w-full flex flex-col lg:flex-row justify-between items-end lg:gap-0 gap-3">
          <h1 className="font-ppMonument text-3xl text-black leading-s50">
            {pageData?.section2_title}
          </h1>
          <HtmlRerender
            htmlString={pageData?.section2_description || ""}
            className="text-sm text-gray2 font-light"
          />
        </div>
      </div>
      <div className="w-full flex flex-row justify-center items-center lg:h-[700px] lg:py-0 py-20 bg-black">
        <div className="lg:w-[80%] w-[90%] flex flex-col lg:flex-row justify-around items-start lg:gap-8 gap-8">
          <Image
            width={600}
            src={
              pageData?.section3_image
                ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${pageData.section3_image}`
                : MenInACar
            }
            alt="men in a car"
            className="rounded-xl"
          />
          <div className="flex flex-col">
            <h1 className="font-ppMonument leading-s50 text-3xl text-gray1">
              {pageData?.section3_title}
            </h1>
            <HtmlRerender
              htmlString={pageData?.section3_description || ""}
              className="text-gray1 text-sm font-light"
            />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:h-[600px] my-20 lg:my-16">
        <div className="lg:w-[80%] w-[90%] flex flex-col lg:flex-row justify-between items-center rounded-xl shadow-sm bg-gray1">
          <div className="flex flex-col items-start pt-16 p-5 lg:p-10">
            <h1 className="leading-s50 font-ppMonument text-black text-3xl mb-3 lg:mb-10">
              {pageData?.section4_title}
            </h1>
            <HtmlRerender
              htmlString={pageData?.section4_description || ""}
              className="text-gray2 text-sm font-light"
            />
          </div>
          <div
            style={{
              backgroundImage: `url(${
                (process.env.NEXT_PUBLIC_IMAGE_URL ?? "") +
                  pageData?.section4_image || ""
              })`,
            }}
            className="lg:w-[450px] w-full h-[300px] lg:h-[450px] bg-cover object-cover rounded-b-xl lg:rounded-none lg:rounded-r-xl shadow-sm"
          />
        </div>
      </div>

      <div className="w-full bg-gray1 lg:h-screen lg:py-0 py-20 flex flex-col justify-center items-center">
        <div className="lg:w-[80%] w-[90%] flex flex-col justify-center items-center">
          <div className="flex flex-col items-center justify-between gap-8">
            <h1 className="text-black font-ppMonument text-3xl">
              {pageData?.section5_title}
            </h1>
            <HtmlRerender
              htmlString={pageData?.section5_description || ""}
              className="text-gray2 text-sm font-light"
            />
          </div>

          <div className="w-full flex flex-col lg:flex-row lg:gap-0 gap-10 justify-around items-center mt-20">
            {pageData?.team_members.map((person, index) => (
              <div
                key={index}
                className="flex flex-col justify-between items-center"
              >
                <Image
                  width={250}
                  height={250}
                  src={
                    (process.env.NEXT_PUBLIC_IMAGE_URL ?? "") + person.avatar ||
                    ""
                  }
                  alt={person.name}
                  className="rounded-full mb-5"
                />
                <h1 className="text-gray2">{person.name}</h1>
                <span className="text-gray2 text-sm font-light">
                  {person.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Discover />
    </div>
  );
}
