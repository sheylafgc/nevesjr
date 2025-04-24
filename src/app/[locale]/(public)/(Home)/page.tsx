/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import InputText from "@/components/InputText/InputText";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import CarImage from "@/public/frame2.svg";
import ManInACar from "@/public/frame3.svg";
import TaxiCar from "@/public/frame4.svg";

import { BiSolidQuoteLeft } from "react-icons/bi";
import { MdPeopleAlt } from "react-icons/md";
import { MdLuggage } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { MdLocationSearching } from "react-icons/md";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
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

import { cn } from "@/src/lib/utils";
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
import { OurServicesDataProps } from "@/src/domain/OurServices.ts/OurServices";
import Loading from "@/components/Loading/Loading";
import TimePicker from "@/components/TimePicker/TimePicker";
import DurationPicker from "@/components/DurationPicker/DurationPicker";
import {
  useJsApiLoader,
  Autocomplete,
  Libraries,
} from "@react-google-maps/api";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/src/i18n/navigation";
import { useSearchParams } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";
import { api } from "@/src/api/api";
import Frame1 from "@/public/frame1.svg";
import HtmlRerender from "@/src/components/HtmlRerender/HtmlRerender";

type HomePageData = {
  section1_banner: string;
  section1_title: string;
  section2_title: string;
  section2_image: string;
  section2_description: string;
  section2_services: OurServicesDataProps[];
  section3_title: string;
  section3_image: string;
  differentials: [
    {
      id: number;
      title: string;
      description: string;
    }
  ];
  section4_image: string;
  section4_title: string;
  section4_description: string;
  section5_title: string;
  section5_subtitle: string;
  section5_feedbacks: [
    {
      id: number;
      name: string;
      role: string;
      opinion: string;
      user_image: string;
    }
  ];
  section6_title: string;
  section6_subtitle: string;
  section6_vehicles: [
    {
      id: number;
      car_image: string;
      car_name: string;
      car_type: string;
      quantity_luggage: number;
      quantity_seats: number;
    }
  ];
  section7_title: string;
  section7_frequently_questions: [
    {
      id: number;
      question: string;
      answer: string;
    }
  ];
  section8_title: string;
  section8_banner: string;
};

function HomeComponent() {
  const t = useTranslations("HomePage");
  const tButton = useTranslations("Buttons");
  const locale = useLocale();
  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<
    string | undefined
  >();
  const [pageData, setPageData] = useState<HomePageData | null>(null);
  const fromRef = useRef(null);
  const toRef = useRef(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get<HomePageData>(
        `/content/home-page/?lang=${locale}`
      );
      console.log(data);
      setPageData(data);
    };

    fetchData();
  }, []);

  const createQueryString = useCallback(
    (name: string, value: string | number | boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value.toString());

      return params.toString();
    },
    [searchParams]
  );

  const [libraries] = useState<Libraries>(["places"]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const [searchResultFrom, setSearchResultFrom] =
    useState<google.maps.places.Autocomplete>();

  const [searchResultTo, setSearchResultTo] =
    useState<google.maps.places.Autocomplete>();

  function onLoadFrom(autocomplete: google.maps.places.Autocomplete) {
    setSearchResultFrom(autocomplete);
  }
  function onLoadTo(autocomplete: google.maps.places.Autocomplete) {
    setSearchResultTo(autocomplete);
  }

  function handleRouteSearch() {
    router.push(
      "/BookATrip" +
        "?" +
        "&" +
        createQueryString("checked", checked) +
        "&" +
        createQueryString("from", from) +
        "&" +
        createQueryString("to", to) +
        "&" +
        createQueryString("duration", selectedDuration ?? "") +
        "&" +
        createQueryString("date", date ? date.toISOString() : "") +
        "&" +
        createQueryString("time", selectedTime ?? "")
    );
  }

  const handleDurationChange = (duration: string) => {
    setSelectedDuration(duration);
    console.log("Duração selecionada:", duration);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    console.log("Selected Time:", selectedTime);
  };

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div
        style={{
          backgroundImage: `url(${
            pageData?.section1_banner
              ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${pageData.section1_banner}`
              : Frame1
          })`,
        }}
        className="w-full bg-cover bg-center lg:h-auto"
      >
        <div className="bg-black/50 w-full h-full flex justify-center items-center">
          <div className="flex lg:flex-row flex-col items-center lg:justify-between justify-center h-full lg:w-[80%] w-[90%] gap-5 py-40">
            <h1 className="text-gray1 lg:flex-[6] lg:w-auto w-full lg:text-[60px] lg:leading-s84 text-3xl font-ppMonument text-left mb-8 lg:mb-0 whitespace-pre-line">
              {pageData?.section1_title}
            </h1>

            <div className="bg-gray1 lg:flex-[4] rounded-xl w-full lg:w-[600px] flex flex-col items-center justify-center p-10 lg:p-14 h-[500px] lg:h-[450px]">
              <div className="flex flex-col items-center justify-center w-full">
                <h1 className="text-center font-ppMonument text-2xl lg:text-3xl mb-4">
                  {t("section1.card_title")}
                </h1>
                <div className="w-full h-[1px] bg-gray2/50 mb-6" />
                <div className="w-full flex items-center justify-between px-2 gap-2 mb-6">
                  <span className="text-base">{t("section1.by_hour")}</span>
                  <Switch
                    className="w-14 h-6"
                    checked={checked}
                    onClick={() => {
                      setChecked(!checked);
                    }}
                  />
                </div>
                <div className="flex flex-col w-full h-full items-center justify-center">
                  <Autocomplete
                    onLoad={onLoadFrom}
                    onPlaceChanged={() => {
                      if (searchResultFrom) {
                        const place = searchResultFrom.getPlace();
                        setFrom(place.formatted_address ?? "");
                      }
                    }}
                    className="w-full"
                  >
                    <InputText
                      placeholder={t("section1.from_input")}
                      divProps="mb-4"
                      ref={fromRef}
                      LeftComponent={
                        <IoLocationSharp size={18} className="text-gray2" />
                      }
                    />
                  </Autocomplete>
                  {checked ? (
                    <DurationPicker
                      name="duration"
                      onTimeChange={handleDurationChange}
                      className="w-full mb-4"
                    />
                  ) : (
                    <Autocomplete
                      onLoad={onLoadTo}
                      onPlaceChanged={() => {
                        if (searchResultTo) {
                          const place = searchResultTo.getPlace();
                          setTo(place.formatted_address ?? "");
                        }
                      }}
                      className="w-full"
                    >
                      <InputText
                        name="to"
                        placeholder={t("section1.to_input")}
                        divProps="mb-4"
                        ref={toRef}
                        LeftComponent={
                          <MdLocationSearching
                            size={18}
                            className="text-gray2"
                          />
                        }
                      />
                    </Autocomplete>
                  )}
                  <div className="lg:grid lg:grid-cols-2 gap-4 w-full mb-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className={cn(
                            "justify-start lg:w-auto w-full lg:mb-0 mb-4 text-left text-black font-normal bg-white shadow-sm hover:bg-white",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>{t("section1.date_input")}</span>
                          )}
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
                    <TimePicker onChange={handleTimeChange} />
                  </div>
                  <Button
                    disabled={
                      checked
                        ? !from || !selectedDuration || !date || !selectedTime
                        : !from || !to || !date || !selectedTime
                    }
                    variant="outline"
                    onClick={handleRouteSearch}
                    className="w-full bg-black text-white h-[50px] rounded-full"
                  >
                    {t("section1.button_search")}
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
            <h1 className="font-ppMonument text-3xl lg:text-4xl mt-6 lg:mt-14 text-left whitespace-pre-line">
              {pageData?.section2_title}
            </h1>
            <div className="h-[1px] w-full lg:w-[500px] bg-gray2 mt-4 lg:mt-0" />
          </div>
          <div className="hidden md:hidden lg:block">
            <Image
              width={300}
              height={300}
              src={
                pageData?.section1_banner
                  ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${pageData.section2_image}`
                  : CarImage
              }
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
            {pageData?.section2_services.map((service) => (
              <CarouselItem
                key={service.id}
                className="flex items-center justify-center mb-6 lg:basis-1/2 lg:ml-8 lg:mt-8"
                onClick={() =>
                  router.push(`/OurServices/ServicePage/${service.id}`)
                }
              >
                <div
                  style={{
                    backgroundImage: `url(${
                      (process.env.NEXT_PUBLIC_IMAGE_URL ?? "") +
                        service.image || ""
                    })`,
                  }}
                  className="lg:w-full w-[95%] flex justify-end items-start p-4 flex-col bg-cover bg-center max-w-[441px] h-[257px] rounded-3xl"
                >
                  <span className="font-acumin text-gray1 text-lg lg:text-xl whitespace-pre-line">
                    {service.title}
                  </span>
                  <Link
                    href={`OurServices/ServicePage/${service.id}`}
                    className="bg-gray2 text-gray1 py-2 px-4 lg:px-5 text-sm lg:text-base rounded-full mt-2"
                  >
                    {tButton("see_more")}
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between mt-3 lg:mt-8 w-full gap-6">
            <div className="text-center lg:text-left mb-4 lg:mb-0 order-1">
              <p className="text-sm text-gray2 font-light leading-relaxed whitespace-pre-line">
                {pageData?.section2_description}
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
                {tButton("see_all")}
              </Link>
            </div>
          </div>
        </Carousel>
      </div>

      <div className="min-h-screen w-full bg-gradient-to-r from-gray4 to-black flex flex-col items-center justify-center py-16 lg:py-32">
        <div className="flex flex-col lg:flex-row w-[90%] lg:w-[80%] justify-between items-center lg:items-end mb-10 lg:mb-14">
          <h1 className="w-full font-ppMonument text-4xl lg:text-6xl text-gray1 leading-relaxed lg:leading-s84 text-left mb-8 lg:mb-0">
            <HtmlRerender htmlString={pageData?.section3_title || ""} />
          </h1>
          <Image
            width={464}
            height={533}
            className="h-[500px] rounded-3xl w-full lg:w-[60%] object-cover"
            src={
              pageData?.section3_image
                ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${pageData.section3_image}`
                : ManInACar
            }
            alt="man in a car"
          />
        </div>
        <div className="relative w-full px-5 lg:px-0">
          <div className="relative w-full lg:w-[80%] mx-auto flex flex-col lg:flex-row items-center lg:items-start">
            <div className="hidden lg:block absolute top-[4%] left-0 right-0 transform -translate-y-1/2 h-[2px] bg-gray2 z-0" />
            <Carousel
              plugins={[
                Autoplay({
                  delay: 4000,
                  stopOnInteraction: false,
                }),
              ]}
              opts={{
                loop: true,
                align: "start",
              }}
              className="w-full mt-6 lg:mt-8 lg:hidden block"
            >
              <CarouselContent>
                {pageData?.differentials.map((item, index) => (
                  <CarouselItem key={index} className="basis-full">
                    <div className="flex flex-col justify-center items-center text-center w-full px-2 pt-16">
                      <div className="absolute bottom-[60%] flex items-center justify-center w-full h-[2px] bg-gray2 my-10 lg:hidden">
                        <div className="w-3 h-3 bg-gray2 rounded-full z-10" />
                      </div>

                      <div className="hidden lg:flex items-center justify-center">
                        <div className="w-3 h-3 bg-gray2 rounded-full z-10" />
                      </div>

                      <h1 className="text-gray1 font-bold text-xl lg:text-2xl mt-4 lg:mt-6 mb-2 whitespace-pre-line">
                        {item.title}
                      </h1>
                      <p className="text-sm lg:text-base text-gray1 font-light whitespace-pre-line">
                        {item.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            {pageData?.differentials.map((item, index) => (
              <div
                key={index}
                className="relative hidden lg:flex flex-col items-center text-center w-full lg:w-1/4 px-2 lg:px-4 z-10"
              >
                <div className="relative flex items-center justify-center w-full h-[2px] bg-gray2 my-10 lg:hidden">
                  <div className="w-3 h-3 bg-gray2 rounded-full z-10" />
                </div>

                <div className="hidden lg:flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray2 rounded-full z-10" />
                </div>

                <h1 className="text-gray1 font-bold text-xl lg:text-2xl mt-4 lg:mt-6 mb-2 whitespace-pre-line">
                  {item.title}
                </h1>
                <p className="text-sm lg:text-base text-gray1 font-light whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[90%] lg:w-[80%] lg:h-auto lg:py-32 py-32 flex flex-col lg:flex-row justify-center items-center">
        <Image
          src={
            pageData?.section4_image
              ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${pageData.section4_image}`
              : TaxiCar
          }
          width={764.4}
          height={509.6}
          alt="taxi driver female client"
          className="lg:rounded-3xl rounded-t-3xl brightness-75"
        />
        <div className="brightness-100 h-[417px] lg:w-[417px] lg:-ml-[160px] lg:mt-[73px] bg-gradient-to-r flex flex-col justify-center items-start rounded-b-3xl from-gray2 lg:rounded-r-xl lg:rounded-t-xl to-gray4 gap-8 shadow-md">
          <div className="p-5">
            <h1 className="font-ppMonument text-3xl leading-[56.36px] text-gray1 whitespace-pre-line">
              {pageData?.section4_title}
            </h1>
            <div className="flex flex-col justify-center items-start gap-4">
              <HtmlRerender
                htmlString={pageData?.section4_description || ""}
                className="text-gray1 text-xs font-light"
              />
              <Link
                href={"/Blog"}
                className="bg-black text-gray1 rounded-full py-3 px-5 hover:opacity-80"
              >
                {tButton("see_more")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:h-auto bg-gradient-to-r from-gray4 to-black flex flex-col items-center justify-center py-32">
        <div className="w-[90%] lg:w-[80%]">
          <div className="flex lg:flex-row flex-col justify-between items-start gap-3 mb-14">
            <h1 className="font-ppMonument text-3xl leading-s56 text-gray1 whitespace-pre-line">
              {pageData?.section5_title}
            </h1>
            <HtmlRerender
              htmlString={pageData?.section5_subtitle || ""}
              className="text-lg text-gray1 font-light"
            />
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
              <CarouselContent className="md:gap-5">
                {pageData?.section5_feedbacks.map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="flex h-80 md:basis-1/2 basis-1/3 lg:basis-teste items-center justify-center flex-col relative overflow-visible"
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
                        <span className="font-light text-xs whitespace-pre-line">
                          {item.opinion}
                        </span>
                        <Separator className="bg-gray2" />
                        <div className="flex flex-col gap-1">
                          <span className="text-gray2 font-bold text-xs whitespace-pre-line">
                            {item.name}
                          </span>
                          <span className="text-gray2 font-light text-xs whitespace-pre-line">
                            {item.role}
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
            {pageData?.section5_feedbacks?.map((item) => (
              <div
                key={item.id}
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
                    <span className="font-light text-xs whitespace-pre-line">
                      {item.opinion}
                    </span>
                    <Separator className="bg-gray2" />
                    <div className="flex flex-col gap-1">
                      <span className="text-gray2 font-bold text-xs whitespace-pre-line">
                        {item.name}
                      </span>
                      <span className="text-gray2 font-light text-xs whitespace-pre-line">
                        {item.role}
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
          <h1 className="font-ppMonument text-3xl mb-4 lg:mb-0 whitespace-pre-line">
            {pageData?.section6_title}
          </h1>
          <HtmlRerender
            htmlString={pageData?.section6_subtitle || ""}
            className="text-sm font-light"
          />
        </div>
        <div
          className={`w-full lg:w-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-10 my-16`}
        >
          {pageData?.section6_vehicles.map((car) => (
            <div
              key={car.id}
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
              <span className="text-gray2 font-bold mt-2 whitespace-pre-line">
                {car.car_name}
              </span>
              <span className="text-gray2 whitespace-pre-line">
                {car.car_type}
              </span>
              <div className="w-20 flex flex-row justify-between items-center">
                <span className="flex flex-row justify-between items-center">
                  <MdPeopleAlt className="w-4 h-4 text-gray2 whitespace-pre-line" />
                  {car.quantity_seats}
                </span>
                <span className="flex flex-row justify-between items-center whitespace-pre-line">
                  <MdLuggage className="w-4 h-4 text-gray2" />
                  {car.quantity_luggage}
                </span>
              </div>
              <Button className="px-4 bg-transparent border border-gray2 rounded-full text-gray2 hover:text-gray1 lg:mt-0 mt-8">
                {tButton("button_book_now")}
              </Button>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-center items-center">
          <Link
            href={"/OurServices/OurFleet"}
            className="rounded-full text-gray1 bg-black px-3 py-2 hover:opacity-85"
          >
            {tButton("see_more")}
          </Link>
        </div>
      </div>

      <div className="w-full bg-gray1 flex justify-center items-center lg:h-screen py-20">
        <div className="w-[80%] flex flex-col justify-center items-center">
          <h1 className="font-ppMonument text-3xl leading-s56 text-black whitespace-pre-line">
            {pageData?.section7_title}
          </h1>
          <div className="w-full flex flex-col gap-4 my-16">
            <Accordion type="single" collapsible>
              {pageData?.section7_frequently_questions.map((question) => (
                <AccordionItem
                  className="mt-5"
                  key={question.id}
                  value={`item-${question.id}`}
                >
                  <AccordionTrigger className="font-bold text-lg text-black whitespace-pre-line">
                    <HtmlRerender htmlString={question.question} />
                  </AccordionTrigger>
                  <AccordionContent className="font-light text-gray2 whitespace-pre-line">
                    <HtmlRerender htmlString={question.answer} />
                  </AccordionContent>
                  <Separator className="bg-gray2/50 " />
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="w-full flex justify-center items-center">
            <Button className="rounded-full">{tButton("see_more")}</Button>
          </div>
        </div>
      </div>

      <Discover
        backgroundImage={pageData?.section8_banner}
        title={pageData?.section8_title}
      />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <HomeComponent />
    </Suspense>
  );
}
