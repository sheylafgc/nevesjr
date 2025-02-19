"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getVehicles } from "@/domain/Vehicles/Vehicles";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function OurFleet() {
  const vehicles = useQuery({
    queryKey: ["getVehicles"],
    queryFn: getVehicles,
  });

  return (
    <div className="flex justify-center items-center w-full flex-col">
      <div className="w-full lg:h-[500px] h-[400px] bg-frame5 bg-cover bg-center">
        <div className="w-full lg:h-[500px] h-[400px] bg-gradient-to-l from-transparent to-70% to-gray4 flex flex-col lg:justify-center justify-end items-center">
          <div className="lg:w-[60%] w-[90%] flex flex-col justify-center items-start lg:mb-0 mb-10 gap-3">
            <h1 className="font-ppMonument text-3xl text-gray1">Our fleet</h1>
            <p className="font-light text-gray1 text-sm">
              Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit,
              sed do eiusmod tempor <br /> incididunt ut labore.
            </p>
          </div>
        </div>
      </div>

      <div className="w-[80%] flex flex-col justify-center items-center gap-5 pt-16 pb-20">
        {vehicles.data?.map((service, index) => (
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
                  <AccordionTrigger>Overview</AccordionTrigger>
                  <AccordionContent>{service.car_overview}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="amenities">
                  <AccordionTrigger>Amenities</AccordionTrigger>
                  <AccordionContent>{service.car_amenities}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="bestForTheseServices">
                  <AccordionTrigger>Best for these service</AccordionTrigger>
                  <AccordionContent>
                    {service.car_best_for_services}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className=" flex-col pb-10 hidden lg:flex">
              <h1 className="text-2xl font-bold mb-1">{service.car_name}</h1>
              <Tabs defaultValue="overview" className="w-[600px]">
                <TabsList className="my-4 border-y">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="best">Best for these service</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  {service.car_overview}
                </TabsContent>
                <TabsContent value="amenities">
                  {service.car_amenities}
                </TabsContent>
                <TabsContent value="best">
                  {service.car_best_for_services}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
