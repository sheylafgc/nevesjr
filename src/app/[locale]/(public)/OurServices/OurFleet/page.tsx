/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/src/api/api";
import HtmlRerender from "@/src/components/HtmlRerender/HtmlRerender";
import { VehicleProps } from "@/src/domain/Vehicles/Vehicles";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

type OurFleetPageProps = {
  section1_title: string;
  section1_subtitle: string;
  section1_banner: string;
  section2_vehicles: VehicleProps[];
};

export default function OurFleet() {
  const t = useTranslations("OurFleetPage");
  const locale = useLocale();
  const [pageData, setPageData] = useState<OurFleetPageProps | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get<OurFleetPageProps>(
        `/content/our-fleet-page/?lang=${locale}`
      );
      console.log(data);
      setPageData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center w-full flex-col">
      <div
        style={{
          backgroundImage: `url(${
            pageData?.section1_banner
              ? (process.env.NEXT_PUBLIC_IMAGE_URL ?? "") +
                pageData?.section1_banner
              : ""
          })`,
        }}
        className="w-full lg:h-[500px] h-[400px] bg-cover bg-center"
      >
        <div className="w-full lg:h-[500px] h-[400px] bg-gradient-to-l from-transparent to-70% to-gray4 flex flex-col lg:justify-center justify-end items-center">
          <div className="lg:w-[60%] w-[90%] flex flex-col justify-center items-start lg:mb-0 mb-10 gap-3">
            <h1 className="font-ppMonument text-3xl text-gray1 whitespace-pre-line">
              {pageData?.section1_title}
            </h1>
            <p className="font-light text-gray1 text-sm whitespace-pre-line">
              {pageData?.section1_subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="w-[80%] flex flex-col justify-center items-center gap-5 pt-16 pb-20">
        {pageData?.section2_vehicles.map((service, index) => (
          <div
            key={index}
            className="w-full flex flex-col lg:flex-row justify-around items-center"
          >
            <h1 className="text-2xl font-bold w-full mb-5 lg:hidden block">
              {service.car_name}
            </h1>
            <div className="w-80 h-64 flex justify-center items-center bg-gray1 rounded-xl">
              <Image
                width={220}
                height={130}
                src={
                  (process.env.NEXT_PUBLIC_IMAGE_URL ?? "") +
                    service.car_image || ""
                }
                alt={service.car_name}
              />
            </div>

            <div className="w-full lg:hidden flex flex-col justify-between items-center my-5">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="overview">
                  <AccordionTrigger>{t("overview")}</AccordionTrigger>
                  <AccordionContent>
                    <HtmlRerender htmlString={service.car_overview} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="amenities">
                  <AccordionTrigger>{t("amenities")}</AccordionTrigger>
                  <AccordionContent>
                    <HtmlRerender htmlString={service.car_amenities} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="bestForTheseServices">
                  <AccordionTrigger>{t("best_for")}</AccordionTrigger>
                  <AccordionContent>
                    <HtmlRerender htmlString={service.car_best_for_services} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className=" flex-col pb-10 hidden lg:flex">
              <h1 className="text-2xl font-bold mb-1">{service.car_name}</h1>
              <Tabs defaultValue="overview" className="w-[600px]">
                <TabsList className="my-4 border-y">
                  <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
                  <TabsTrigger value="amenities">{t("amenities")}</TabsTrigger>
                  <TabsTrigger value="best">{t("best_for")}</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <HtmlRerender htmlString={service.car_overview} />
                </TabsContent>
                <TabsContent value="amenities">
                  <HtmlRerender htmlString={service.car_amenities} />
                </TabsContent>
                <TabsContent value="best">
                  <HtmlRerender htmlString={service.car_best_for_services} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
