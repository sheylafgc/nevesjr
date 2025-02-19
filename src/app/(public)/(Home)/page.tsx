"use client";
import InputText from "@/components/InputText/InputText";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import CarImage from "../../../../public/frame2.svg";
import ManInACar from "../../../../public/frame3.svg";
import TaxiCar from "../../../../public/frame4.svg";

import { BiSolidQuoteLeft } from "react-icons/bi";
import { MdPeopleAlt } from "react-icons/md";
import { MdLuggage } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { MdLocationSearching } from "react-icons/md";
import { MdWatch } from "react-icons/md";
import { TbClockPin } from "react-icons/tb";

import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Discover from "@/components/Discover/Discover";
import { useQuery } from "@tanstack/react-query";
import { getAskedQuestions } from "@/domain/AskedQuestions/AskedQuestionsService";
import { getOurServices } from "@/domain/OurServices.ts/OurServices";
import { getFeedback } from "@/domain/Feedback/Feedback";
import { getVehicles } from "@/domain/Vehicles/Vehicles";

export default function Home() {
  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState<Date>();

  const ourServices = useQuery({
    queryKey: ["getOurServices"],
    queryFn: getOurServices,
  });

  const feedbacks = useQuery({
    queryKey: ["getFeedbacks"],
    queryFn: getFeedback,
  });

  const vehicles = useQuery({
    queryKey: ["getVehicles"],
    queryFn: getVehicles,
  });

  const askedQuestions = useQuery({
    queryKey: ["askedQuestions"],
    queryFn: getAskedQuestions,
  });

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full bg-frame1 bg-cover bg-center lg:h-screen">
        <div className="bg-black/50 w-full h-full flex justify-center items-center">
          <div className="flex lg:flex-row flex-col items-center lg:justify-between justify-center h-full lg:w-[80%] w-[90%] lg:px-5 py-40">
            <h1 className="text-gray1 lg:w-auto w-full lg:text-[60px] lg:leading-s84 text-3xl font-ppMonument text-left mb-8 lg:mb-0">
              High-end <br /> private chauffeur <br /> service
            </h1>

            <div className="bg-gray1 rounded-xl w-full lg:w-[600px] flex flex-col items-center justify-center p-10 lg:p-14 h-[500px] lg:h-[450px]">
              <div className="flex flex-col items-center justify-center w-full">
                <h1 className="text-center font-ppMonument text-2xl lg:text-3xl mb-4">
                  Book Now
                </h1>
                <div className="w-full h-[1px] bg-gray2/50 mb-6" />
                <div className="w-full flex items-center justify-between px-2 gap-2 mb-6">
                  <span className="text-base">By the hour</span>
                  <Switch
                    className="w-14 h-6"
                    checked={checked}
                    onClick={() => {
                      setChecked(!checked);
                    }}
                  />
                </div>
                <div className="flex flex-col w-full h-full items-center justify-center">
                  <InputText
                    placeholder="From"
                    divProps="mb-4"
                    LeftComponent={
                      <IoLocationSharp size={18} className="text-gray2" />
                    }
                  />
                  {checked ? (
                    <InputText
                      placeholder="Duration"
                      divProps="mb-4"
                      LeftComponent={
                        <TbClockPin size={18} className="text-gray2" />
                      }
                    />
                  ) : (
                    <InputText
                      placeholder="To"
                      divProps="mb-4"
                      LeftComponent={
                        <MdLocationSearching size={18} className="text-gray2" />
                      }
                    />
                  )}
                  <div className="grid grid-cols-2 gap-4 w-full mb-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <InputText
                      placeholder="Time"
                      LeftComponent={
                        <MdWatch size={18} className="text-gray2" />
                      }
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="w-full bg-black text-white h-[50px] rounded-full"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray1 lg:-mt-20 lg:rounded-t-xl flex flex-col items-center w-full lg:w-[80%] p-6 lg:pt-3 lg:pr-28 lg:pl-28 lg:pb-28">
        <div className="flex flex-col lg:flex-row w-full justify-between items-center">
          <div className="w-full flex flex-col justify-between mb-6 lg:mb-0">
            <h1 className="font-ppMonument text-3xl lg:text-4xl mt-6 lg:mt-14 text-left">
              Discover Our <br /> Services
            </h1>
            <div className="h-[1px] w-full lg:w-[500px] bg-gray2 mt-4 lg:mt-0" />
          </div>
          <div className="hidden md:hidden lg:block">
            <Image
              width={300}
              height={300}
              src={CarImage}
              alt="car image"
              className="w-full h-auto"
            />
          </div>
        </div>
        <Carousel
          opts={{
            loop: true,
          }}
          arrowsOrientation="normal"
          className="w-full mt-6 lg:mt-8"
          buttonColor="black"
        >
          <CarouselContent>
            {ourServices.data?.map((service, index) => (
              <CarouselItem
                key={index}
                className="flex items-center justify-center mb-6 lg:basis-1/2 lg:ml-8 lg:mt-8"
              >
                <div
                  style={{
                    backgroundImage: `url(${
                      (process.env.NEXT_PUBLIC_IMAGE_URL ?? "") +
                        service.image || ""
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    maxWidth: "441px",
                    height: "257px",
                    borderRadius: "24px",
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "start",
                    padding: "1rem",
                    flexDirection: "column",
                  }}
                >
                  <span className="font-acumin text-gray1 text-lg lg:text-xl">
                    {service.title}
                  </span>
                  <Link
                    href={`OurServices/ServicePage/${service.id}`}
                    className="bg-gray2 text-gray1 py-2 px-4 lg:px-5 text-sm lg:text-base rounded-full mt-2"
                  >
                    See more
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between mt-3 lg:mt-8 w-full gap-6">
            <div className="text-center lg:text-left mb-4 lg:mb-0 order-1">
              <p className="text-sm text-gray2 font-light leading-relaxed">
                Experience premium executive chauffeur services tailored for
                comfort, style, and reliability—perfect for your every journey.
              </p>
            </div>
            <div className="w-full flex flex-row justify-between items-center lg:flex-row">
              <div className="flex flex-row gap-4 order-1">
                <CarouselPrevious />
                <CarouselNext />
              </div>
              <Link
                href={"/OurServices"}
                className="rounded-full px-6 py-2 bg-black text-gray1 text-sm hover:opacity-80"
              >
                See all
              </Link>
            </div>
          </div>
        </Carousel>
      </div>

      <div className="min-h-screen w-full bg-gradient-to-r from-gray4 to-black flex flex-col items-center justify-center py-16 lg:py-32">
        <div className="flex flex-col lg:flex-row w-[90%] lg:w-[80%] justify-between items-center lg:items-end mb-10 lg:mb-14">
          <h1 className="w-full font-ppMonument text-4xl lg:text-6xl text-gray1 leading-relaxed lg:leading-s84 text-left mb-8 lg:mb-0">
            Reasons <br /> to book <br />{" "}
            <span className="text-gray3 underline">nevesjr</span> <br />{" "}
            services
          </h1>
          <Image
            width={464}
            height={533}
            className="h-[500px] rounded-3xl w-full lg:w-[60%] object-cover"
            src={ManInACar}
            alt="man in a car"
          />
        </div>
        <div className="relative w-full px-5 lg:px-0">
          <div className="relative w-full lg:w-[80%] mx-auto flex flex-col lg:flex-row items-center lg:items-start">
            <div className="hidden lg:block absolute top-[5%] left-0 right-0 transform -translate-y-1/2 h-[2px] bg-gray2 z-0" />

            {[
              {
                title: "Safety",
                description:
                  "Your security is our priority, ensuring peace of mind every mile.",
              },
              {
                title: "Reliability",
                description: "Always on time, every time.",
              },
              {
                title: "Commitment",
                description: "Driven to exceed your expectations.",
              },
              {
                title: "Quality",
                description: "Luxury travel, perfected for you.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center text-center w-full lg:w-1/4 px-2 lg:px-4 z-10"
              >
                <div className="relative flex items-center justify-center w-full h-[2px] bg-gray2 my-10 lg:hidden">
                  <div className="w-3 h-3 bg-gray2 rounded-full z-10" />
                </div>

                <div className="hidden lg:flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray2 rounded-full z-10" />
                </div>

                <h1 className="text-gray1 font-bold text-xl lg:text-2xl mt-4 lg:mt-6 mb-2">
                  {item.title}
                </h1>
                <p className="text-sm lg:text-base text-gray1 font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[90%] lg:w-[80%] lg:h-screen lg:py-0 py-32 flex flex-col lg:flex-row justify-center items-center">
        <Image
          src={TaxiCar}
          width={764.4}
          height={509.6}
          alt="taxi driver female client"
          className="lg:rounded-3xl rounded-t-3xl brightness-75 "
        />
        <div className="brightness-100 h-[417px] lg:w-[437px] lg:-ml-[160px] lg:mt-[73px] bg-gradient-to-r flex flex-col justify-center items-start rounded-b-3xl from-gray2 lg:rounded-r-xl lg:rounded-t-xl to-gray4 gap-8 shadow-md">
          <div className="lg:p-16 p-5">
            <h1 className="font-ppMonument text-3xl leading-[56.36px] text-gray1">
              Excellence in Executive Transport
            </h1>
            <div className="flex flex-col gap-4">
              <p className="text-gray1 text-xs font-light">
                Neves JR is dedicated to redefining executive transportation.
                With a focus on safety, reliability, and unmatched service
                quality, we ensure every journey is seamless and sophisticated.
              </p>
              <p className="text-gray1 text-xs font-light">
                Our experienced chauffeurs and premium vehicles reflect our
                commitment to delivering excellence every mile.
              </p>
            </div>
            <Button className="bg-black rounded-full px-5 mt-5">
              See more
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full lg:h-screen bg-gradient-to-r from-gray4 to-black flex flex-col items-center justify-center py-32">
        <div className="w-[90%] lg:w-[80%]">
          <div className="flex lg:flex-row flex-col justify-between items-start gap-3 mb-14">
            <h1 className="font-ppMonument text-3xl leading-s56 text-gray1">
              What people <br /> says about us
            </h1>
            <p className="text-lg text-gray1 font-light">
              Hear from our satisfied clients who trust{" "}
              <span className="font-bold">NevesJR</span> for <br /> exceptional
              service, unmatched reliability, and luxurious <br /> travel
              experiences.
            </p>
          </div>

          <div className="hidden lg:block">
            <Carousel
              opts={{
                loop: true,
              }}
              arrowsOrientation="normal"
              buttonColor="white"
              className="w-full"
            >
              <CarouselContent>
                {feedbacks.data?.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="flex h-80 md:basis-1/2 lg:basis-teste items-center justify-center flex-col relative overflow-visible"
                  >
                    <Image
                      src={
                        (process.env.NEXT_PUBLIC_IMAGE_URL ?? "") +
                          item.user_image || ""
                      }
                      alt={item.name}
                      width={70}
                      height={70}
                      unoptimized
                      className="rounded-full absolute top-0"
                    />
                    <div className="w-[400px] h-[250px] flex flex-col justify-center item-center bg-gray1 rounded-xl p-10">
                      <div className="flex flex-col items-start justify-between gap-4">
                        <BiSolidQuoteLeft className="w-8 h-8 text-gray2" />
                        <span className="font-light text-xs">
                          {item.opinion}
                        </span>
                        <Separator className="bg-gray2" />
                        <div className="flex flex-col gap-1">
                          <span className="text-gray2 font-bold text-xs">
                            {item.name}
                          </span>
                          <span className="text-gray2 font-light text-xs">
                            {item.occupation}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex-row flex gap-6 justify-end">
                <CarouselPrevious className="" />
                <CarouselNext />
              </div>
            </Carousel>
          </div>

          <div className="lg:hidden">
            {feedbacks.data?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center mb-10 w-full lg:w-1/4 px-2 lg:px-4 z-10 py-8"
              >
                <Image
                  src={
                    (process.env.NEXT_PUBLIC_IMAGE_URL ?? "") +
                      item.user_image || ""
                  }
                  alt={item.name}
                  width={70}
                  height={70}
                  unoptimized
                  className="rounded-full -mt-10 absolute"
                />
                <div className="w-full bg-gray1 rounded-xl p-6 flex flex-col justify-center item-center">
                  <div className="flex flex-col items-start justify-between gap-4">
                    <BiSolidQuoteLeft className="w-8 h-8 text-gray2" />
                    <span className="font-light text-xs">{item.opinion}</span>
                    <Separator className="bg-gray2" />
                    <div className="flex flex-col gap-1">
                      <span className="text-gray2 font-bold text-xs">
                        {item.name}
                      </span>
                      <span className="text-gray2 font-light text-xs">
                        {item.occupation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[90%] lg:w-[80%] flex flex-col justify-center items-center h-auto py-32">
        <div className="w-full flex flex-col lg:flex-row justify-between items-start">
          <h1 className="font-ppMonument text-3xl mb-4 lg:mb-0">Our fleet</h1>
          <span className="text-sm font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br /> sed
            do eiusmod tempor incididunt ut labore et dolore <br /> magna
            aliqua.{" "}
          </span>
        </div>
        <div className="w-full lg:w-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-10 my-16">
          {vehicles.data?.map((car, index) => (
            <div
              key={index}
              className="lg:w-80 w-full lg:h-72 h-96 bg-gray1 rounded-xl flex flex-col items-center justify-center gap-1"
            >
              <Image
                width={220}
                height={130}
                src={
                  (process.env.NEXT_PUBLIC_IMAGE_URL ?? "") + car.car_image ||
                  ""
                }
                alt={car.car_name}
              />
              <span className="text-gray2 font-bold mt-2">{car.car_name}</span>
              <span className="text-gray2">{car.car_type}</span>
              <div className="w-20 flex flex-row justify-between items-center">
                <span className="flex flex-row justify-between items-center">
                  <MdPeopleAlt className="w-4 h-4 text-gray2" />
                  {car.quantity_seats}
                </span>
                <span className="flex flex-row justify-between items-center">
                  <MdLuggage className="w-4 h-4 text-gray2" />
                  {car.quantity_luggage}
                </span>
              </div>
              <Button className="px-4 bg-transparent border border-gray2 rounded-full text-gray2 hover:text-gray1 lg:mt-0 mt-8">
                Book now
              </Button>
            </div>
          ))}
        </div>

        {/* Botão de ver mais */}
        <div className="w-full flex justify-center items-center">
          <Link
            href={"/OurServices/OurFleet"}
            className="rounded-full text-gray1 bg-black px-3 py-2 hover:opacity-85"
          >
            See more
          </Link>
        </div>
      </div>

      <div className="w-full bg-gray1 flex justify-center items-center lg:h-screen py-20">
        <div className="w-[80%] flex flex-col justify-center items-center">
          <h1 className="font-ppMonument text-3xl leading-s56 text-black">
            Frequently asked questions
          </h1>
          <div className="w-full flex flex-col gap-4 my-16">
            <Accordion type="single" collapsible>
              {askedQuestions.data?.map((question, index) => (
                <AccordionItem
                  className="mt-5"
                  key={index}
                  value={`item-${index}`}
                >
                  <AccordionTrigger className="font-bold text-lg text-black">
                    {question.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-light text-gray2">
                    {question.answer}
                  </AccordionContent>
                  <Separator className="bg-gray2/50" />
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="w-full flex justify-center items-center">
            <Button className="rounded-full">See more</Button>
          </div>
        </div>
      </div>

      <Discover />
    </div>
  );
}
