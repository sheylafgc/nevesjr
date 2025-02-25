/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useForm } from "react-hook-form";
import { BookATripSchema, BookATripSchemaType } from "./BookATripSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoCarOutline, IoLocationSharp } from "react-icons/io5";
import { RxExit } from "react-icons/rx";
import {
  MdLocationSearching,
  MdLuggage,
  MdOutlinePayment,
  MdPeopleAlt,
  MdWatch,
} from "react-icons/md";
import { FiCheckCircle, FiCreditCard } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import LoginForBook from "@/components/LoginForBook/LoginForBook";
import { Stepper, Step } from "@/components/Mtailwind";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ReservationCompleted from "@/components/ReservationConfirmed/ReservationConfirmed";
import TravelTopInfo from "@/components/TravelTopInfo/TravelTopInfo";
import { AuthContext } from "@/context/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getVehicles } from "@/domain/Vehicles/Vehicles";
import Loading from "@/components/Loading/Loading";

import { loadStripe } from "@stripe/stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import InputText from "@/components/InputText/InputText";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import DurationPicker from "@/components/DurationPicker/DurationPicker";
import TimePicker from "@/components/TimePicker/TimePicker";
import { TbClockPin } from "react-icons/tb";
import { IMaskInput } from "react-imask";

const steps = [
  {
    id: "Step 1",
    name: "Service",
    fields: [
      "from",
      "to",
      "car_class",
      "date",
      "hour",
      "booking_for",
      "title",
      "first_name",
      "last_name",
      "email",
      "phone",
      "additional_information",
    ],
  },
  {
    id: "Step 2",
    name: "Log In",
    fields: ["email", "password"],
  },
  {
    id: "Step 3",
    name: "Payment",
    fields: ["name_on_card", "card_number", "expiration_date", "cvv"],
  },
  {
    id: "Step 4",
    name: "Checkout",
  },
];

if (process.env.NEXT_PUBLIC_STRIPE_PUB_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUB_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY);

function BookATripComponent() {
  const { user } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const form = useForm<BookATripSchemaType>({
    resolver: zodResolver(BookATripSchema),
    defaultValues: {
      from: "",
      to: "",
      isDuration: false,
      duration: "",
      date: "",
      hour: "",
      car_class: "",
      price: 0,
      booking_for: "myself",
      title: undefined,
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      additional_information: "",
      name_on_card: "",
      card_number: "",
      expiration_date: "",
      cvv: "",
    },
    mode: "onChange",
  });
  const formValues = form.watch();
  const userValues = user ? user : formValues;
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const searchParams = useSearchParams();
  const checkedParam: string | null = searchParams.get("checked");
  const fromParam: string | null = searchParams.get("from");
  const toParam: string | null = searchParams.get("to");
  const durationParam: string | null = searchParams.get("duration");
  const dateParam: string | null = searchParams.get("date");
  const timeParam: string | null = searchParams.get("time");

  useEffect(() => {
    form.setValue("isDuration", checkedParam === "true" ? true : false);
    form.setValue("from", fromParam || "");
    form.setValue("to", toParam || "");
    form.setValue("duration", durationParam || "");
    form.setValue("date", dateParam || "");
    form.setValue("hour", timeParam || "Mr");
  }, [searchParams]);

  useEffect(() => {
    form.setValue("first_name", user?.first_name || "");
    form.setValue("last_name", user?.last_name || "");
    form.setValue("email", user?.email || "");
    form.setValue("phone", user?.phone || "");
    form.setValue("title", user?.title || "Mr");
  }, [user]);

  const handleDurationChange = (duration: string) => {
    form.setValue("hour", duration);
    console.log("Duração selecionada:", duration);
  };

  const handleTimeChange = (time: string) => {
    form.setValue("hour", time);
    console.log("Selected Time:", time);
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(formValues.price) }),
    });

    const session = await response.json();

    const result = await stripe?.redirectToCheckout({ sessionId: session.id });

    if (result?.error) {
      alert(result.error.message);
    }
  };

  const onSubmit = (data: BookATripSchemaType) => {
    console.log(data);
    handleCheckout();
  };

  const { data: vehicles, isFetching: isFetchingVehicles } = useQuery({
    queryKey: ["getVehicles"],
    queryFn: getVehicles,
  });

  const areFieldsFilled = () => {
    const isBasicFieldsFilled = formValues.car_class !== "";
    const isOtherFiledFilled =
      formValues.first_name !== "" &&
      formValues.last_name !== "" &&
      formValues.email !== "" &&
      formValues.phone !== "" &&
      (formValues.title !== "Mr" || "Ms");
    if (currentStep === 0) {
      if (formValues.booking_for === "myself") {
        return isBasicFieldsFilled;
      }

      if (formValues.booking_for === "someoneElse") {
        return isBasicFieldsFilled && isOtherFiledFilled;
      }
    }
    const isCardFilled =
      formValues.name_on_card !== "" &&
      formValues.card_number !== "" &&
      formValues.expiration_date !== "" &&
      formValues.cvv !== "";
    if (currentStep === 1 && user) {
      return true;
    }
    if (currentStep === 2) {
      return isCardFilled;
    }

    if (currentStep === 3) {
      return true;
    }

    return false;
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatCardNumberForShow = (cardNumber: string) => {
    if (!cardNumber || cardNumber.length < 4) {
      return cardNumber;
    }

    const masked = cardNumber.slice(0, -4).replace(/\d/g, "*");
    const lastFour = cardNumber.slice(-4);

    return masked + lastFour;
  };

  const formatExpiryDate = (value: string) => {
    const numericValue = value.replace(/\D/g, "");

    const formattedValue = numericValue.slice(0, 4);

    if (formattedValue.length > 2) {
      return formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
    } else {
      return formattedValue;
    }
  };
  const next = () => {
    setPreviousStep(currentStep);
    if (!isLastStep) {
      setCurrentStep((cur) => cur + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0 && !isFirstStep) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
      console.log(formValues);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {isCompleted ? (
        <div className="lg:w-[60%] w-[90%] flex flex-col justify-between lg:py-32 py-32">
          <ReservationCompleted
            isCompleted={isCompleted}
            setIsCompleted={setIsCompleted}
          />
        </div>
      ) : (
        <section className="lg:w-[80%] w-[90%] flex flex-col justify-between lg:p-24 py-32">
          {/* steps */}
          <div className="w-full px-5 mt-10 py-10 bg-white2 rounded-xl">
            <Stepper
              className="w-full"
              activeStep={currentStep}
              isLastStep={(value) => setIsLastStep(value)}
              isFirstStep={(value) => setIsFirstStep(value)}
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              {steps.map((step, index) => (
                <Step
                  className=""
                  key={index}
                  onClick={() => areFieldsFilled() && setCurrentStep(index)}
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  {currentStep > index ? (
                    <>
                      {step.id === "Step 1" ? (
                        <IoCarOutline className="text-white" size={20} />
                      ) : step.id === "Step 2" ? (
                        <RxExit className="text-white" size={20} />
                      ) : step.id === "Step 3" ? (
                        <MdOutlinePayment className="text-white" size={20} />
                      ) : step.id === "Step 4" ? (
                        <FiCheckCircle className="text-white" size={20} />
                      ) : null}
                      <div className="absolute -bottom-[2rem] w-max text-center">
                        <span className="text-xs text-gray2 font-bold">
                          {step.name}
                        </span>
                      </div>
                    </>
                  ) : currentStep === index ? (
                    <>
                      {step.id === "Step 1" ? (
                        <IoCarOutline className="text-white" size={20} />
                      ) : step.id === "Step 2" ? (
                        <RxExit className="text-white" size={20} />
                      ) : step.id === "Step 3" ? (
                        <MdOutlinePayment className="text-white" size={20} />
                      ) : step.id === "Step 4" ? (
                        <FiCheckCircle className="text-white" size={20} />
                      ) : null}
                      <div className="absolute -bottom-[2rem] w-max text-center">
                        <span className="text-xs text-gray2 font-bold">
                          {step.name}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      {step.id === "Step 1" ? (
                        <IoCarOutline className="text-gray2" size={20} />
                      ) : step.id === "Step 2" ? (
                        <RxExit className="text-gray2" size={20} />
                      ) : step.id === "Step 3" ? (
                        <MdOutlinePayment className="text-gray2" size={20} />
                      ) : step.id === "Step 4" ? (
                        <FiCheckCircle className="text-gray2" size={20} />
                      ) : null}
                      <div className="absolute -bottom-[2rem] w-max text-center">
                        <span className="text-xs text-gray2 font-medium">
                          {step.name}
                        </span>
                      </div>
                    </>
                  )}
                </Step>
              ))}
            </Stepper>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mt-12 w-full">
                {currentStep === 0 && (
                  <motion.div
                    initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="w-full bg-white2 flex rounded-xl flex-col justify-between items-start p-10 space-y-4">
                      <div className="w-full flex flex-row justify-start items-center">
                        {fromParam && checkedParam !== toParam ? (
                          <div className="flex justify-center items-center gap-5">
                            <span className="text-xs text-gray2">
                              {formValues.from}
                            </span>
                            {checkedParam !== "true" && (
                              <>
                                <FaArrowRightLong size={20} />
                                <span className="text-xs text-gray2">
                                  {formValues.to}
                                </span>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="w-full flex-col flex items-center justify-between">
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
                            <div className="w-full lg:flex-row flex-col flex justify-between items-center">
                              <FormField
                                control={form.control}
                                name="from"
                                render={({ field }) => (
                                  <FormItem className="lg:w-[45%] w-full">
                                    <FormControl {...field}>
                                      <InputText
                                        {...field}
                                        placeholder="From"
                                        divProps="lg:mb-0 mb-4"
                                        LeftComponent={
                                          <IoLocationSharp
                                            size={18}
                                            className="text-gray2"
                                          />
                                        }
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              {checked ? (
                                <FormField
                                  control={form.control}
                                  name="from"
                                  render={({ field }) => (
                                    <FormItem className="lg:w-[45%] w-full">
                                      <FormControl {...field}>
                                        <DurationPicker
                                          onTimeChange={handleDurationChange}
                                          className="w-full"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              ) : (
                                <FormField
                                  control={form.control}
                                  name="to"
                                  render={({ field }) => (
                                    <FormItem className="lg:w-[45%] w-full">
                                      <FormControl {...field}>
                                        <InputText
                                          {...field}
                                          placeholder="To"
                                          LeftComponent={
                                            <MdLocationSearching
                                              size={18}
                                              className="text-gray2"
                                            />
                                          }
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="w-full flex flex-row justify-start items-center">
                        {dateParam && timeParam ? (
                          <div className="flex lg:flex-row flex-col justify-center lg:items-center gap-2">
                            <span className="flex flex-row justify-start items-center gap-2 rounded-full p-2 bg-gray1 text-gray2 text-xs">
                              <FaRegCalendarAlt size={15} />
                              {formValues.date &&
                                format(formValues.date, "PPP")}
                            </span>
                            <span className="flex flex-row justify-start items-center gap-2 rounded-full p-2 bg-gray1 text-gray2 text-xs">
                              <MdWatch size={15} />
                              {formValues.hour}
                            </span>
                            {checkedParam === "true" && (
                              <span className="flex flex-row justify-start items-center gap-2 rounded-full p-2 bg-gray1 text-gray2 text-xs">
                                <TbClockPin size={15} />
                                {formValues.duration}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="w-full lg:flex-row flex-col flex justify-between items-center">
                            <FormField
                              control={form.control}
                              name="date"
                              render={({ field }) => (
                                <FormItem className="lg:w-[45%] w-full lg:mb-0 mb-4">
                                  <FormControl {...field}>
                                    <Popover>
                                      <PopoverTrigger
                                        asChild
                                        className="w-full"
                                      >
                                        <Button
                                          className={cn(
                                            "justify-start text-left text-black font-normal bg-white shadow-sm hover:bg-white",
                                            !formValues.date &&
                                              "text-muted-foreground"
                                          )}
                                        >
                                          <CalendarIcon className="mr-1 h-4 w-4" />
                                          {formValues.date ? (
                                            format(formValues.date, "PPP")
                                          ) : (
                                            <span>Date</span>
                                          )}
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-auto p-0">
                                        <Calendar
                                          mode="single"
                                          selected={
                                            formValues.date
                                              ? new Date(formValues.date)
                                              : undefined
                                          }
                                          onSelect={(date) =>
                                            form.setValue(
                                              "date",
                                              date ? date.toISOString() : ""
                                            )
                                          }
                                          initialFocus
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="hour"
                              render={({ field }) => (
                                <FormItem className="lg:w-[45%] w-full">
                                  <FormControl {...field}>
                                    <TimePicker onChange={handleTimeChange} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-gray2">
                        Estimated Arrival at 04:45 PM (GMT) - 4.4km
                      </span>
                    </div>
                    <FormField
                      control={form.control}
                      name="car_class"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl {...field}>
                            <div className="flex flex-col justify-center items-center space-y-5 mt-10">
                              <h1 className="text-gray2 font-bold text-start w-full">
                                Choose your class
                              </h1>
                              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-10 ">
                                {isFetchingVehicles ? (
                                  <Loading />
                                ) : (
                                  vehicles?.map((car) =>
                                    formValues.car_class === car.car_type ? (
                                      <div
                                        key={car.id}
                                        onClick={() => {
                                          form.setValue(
                                            "car_class",
                                            car.car_type
                                          );
                                          form.setValue(
                                            "price",
                                            Number(car.price)
                                          );
                                          console.log(
                                            "console watch:",
                                            form.watch("car_class")
                                          );
                                          console.log(car.car_type);
                                        }}
                                        className="border border-black h-[400px] lg:w-[260px] w-full flex flex-col justify-center items-center bg-gray1 rounded-xl p-10 space-y-3"
                                      >
                                        <Image
                                          width={220}
                                          height={130}
                                          src={
                                            (process.env
                                              .NEXT_PUBLIC_IMAGE_URL ?? "") +
                                              car.car_image || ""
                                          }
                                          alt={car.car_name}
                                        />
                                        <span className="text-gray2 font-bold">
                                          {car.car_type}
                                        </span>
                                        <span className="text-gray2  mt-2">
                                          {car.car_name}
                                        </span>
                                        <div className="w-20 flex flex-row justify-between items-center">
                                          <span className="flex flex-row justify-between items-center gap-2">
                                            <MdPeopleAlt className="w-4 h-4 text-gray2" />
                                            {car.quantity_seats}
                                          </span>
                                          <span className="flex flex-row justify-between items-center gap-2">
                                            <MdLuggage className="w-4 h-4 text-gray2" />
                                            {car.quantity_luggage}
                                          </span>
                                        </div>
                                        <span className="text-gray2 font-extrabold">
                                          ${car.price}
                                        </span>
                                        <Button className="px-8 border border-gray2 text-sm font-thin rounded-full hover:text-gray1 lg:mt-0 mt-8">
                                          Select
                                        </Button>
                                      </div>
                                    ) : (
                                      <div
                                        key={car.id}
                                        onClick={() => {
                                          form.setValue(
                                            "car_class",
                                            car.car_type
                                          );
                                          form.setValue(
                                            "price",
                                            Number(car.price)
                                          );
                                          console.log(
                                            "console watch:",
                                            form.watch("car_class")
                                          );
                                          console.log(car.car_type);
                                        }}
                                        className="h-[400px] lg:w-[260px] w-full flex flex-col justify-center items-center bg-gray1 rounded-xl p-10 space-y-3"
                                      >
                                        <Image
                                          width={220}
                                          height={130}
                                          src={
                                            (process.env
                                              .NEXT_PUBLIC_IMAGE_URL ?? "") +
                                              car.car_image || ""
                                          }
                                          alt={car.car_name}
                                        />
                                        <span className="text-gray2 font-bold">
                                          {car.car_type}
                                        </span>
                                        <span className="text-gray2  mt-2">
                                          {car.car_name}
                                        </span>
                                        <div className="w-20 flex flex-row justify-between items-center">
                                          <span className="flex flex-row justify-between items-center gap-2">
                                            <MdPeopleAlt className="w-4 h-4 text-gray2" />
                                            {car.quantity_seats}
                                          </span>
                                          <span className="flex flex-row justify-between items-center gap-2">
                                            <MdLuggage className="w-4 h-4 text-gray2" />
                                            {car.quantity_luggage}
                                          </span>
                                        </div>
                                        <span className="text-gray2 font-extrabold">
                                          ${car.price}
                                        </span>
                                        <Button className="px-8 border border-gray2 rounded-full text-sm font-thin hover:text-gray1 lg:mt-0 mt-8">
                                          Select
                                        </Button>
                                      </div>
                                    )
                                  )
                                )}
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="w-full flex flex-col justify-center items-center mt-10 space-y-5">
                      <h1 className="text-gray2 font-bold text-start w-full">
                        Who are you booking for?
                      </h1>
                      <div className="w-full flex flex-col justify-center items-start space-y-5  bg-white2 rounded-xl p-10">
                        <FormField
                          control={form.control}
                          name="booking_for"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl {...field}>
                                <RadioGroup
                                  onValueChange={(value) => {
                                    form.setValue(
                                      "booking_for",
                                      value as "myself" | "someoneElse"
                                    );
                                    console.log(
                                      "console watch:",
                                      form.watch("booking_for")
                                    );
                                    console.log(value);
                                    console.log(
                                      "Form: ",
                                      formValues.booking_for
                                    );
                                  }}
                                  defaultValue={
                                    formValues.booking_for
                                      ? formValues.booking_for
                                      : "myself"
                                  }
                                  className="flex flex-row gap-10"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="myself"
                                      id="myself"
                                    />
                                    <Label htmlFor="myself">
                                      Book for Myself
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="someoneElse"
                                      id="someoneElse"
                                    />
                                    <Label htmlFor="someoneElse">
                                      Book for Someone else
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {formValues.booking_for === "someoneElse" && (
                          <div className="w-full flex flex-col justify-center items-start space-y-5">
                            <Separator />
                            <div className="hidden lg:flex lg:flex-row flex-col justify-between items-center w-full ">
                              <FormField
                                control={form.control}
                                name="first_name"
                                render={({ field }) => (
                                  <FormItem className="lg:w-[45%] w-full">
                                    <FormControl {...field}>
                                      <Input
                                        {...field}
                                        variant="white"
                                        placeholder="First name"
                                        className="w-full"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="last_name"
                                render={({ field }) => (
                                  <FormItem className="lg:w-[45%] w-full">
                                    <FormControl {...field}>
                                      <Input
                                        {...field}
                                        variant="white"
                                        placeholder="Last name"
                                        className="w-full"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <FormField
                              control={form.control}
                              name="first_name"
                              render={({ field }) => (
                                <FormItem className="lg:hidden block w-full">
                                  <FormControl {...field}>
                                    <Input
                                      {...field}
                                      variant="white"
                                      placeholder="First name"
                                      className="w-full"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="last_name"
                              render={({ field }) => (
                                <FormItem className="lg:hidden block w-full">
                                  <FormControl {...field}>
                                    <Input
                                      {...field}
                                      variant="white"
                                      placeholder="Last name"
                                      className="w-full"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="title"
                              render={({ field }) => (
                                <FormItem className="lg:w-[45%] w-full">
                                  <FormControl {...field}>
                                    <Select
                                      onValueChange={(value) => {
                                        form.setValue(
                                          "title",
                                          value as "Mr" | "Ms"
                                        );
                                        console.log(
                                          "console watch:",
                                          form.watch("title")
                                        );
                                        console.log(value);
                                        console.log("Form: ", formValues.title);
                                      }}
                                    >
                                      <SelectTrigger className="bg-white">
                                        <SelectValue placeholder="Title" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Mr">Mr.</SelectItem>
                                        <SelectItem value="Ms">Ms.</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem className="lg:w-[45%] w-full">
                                  <FormControl {...field}>
                                    <Input
                                      {...field}
                                      variant="white"
                                      placeholder="E-mail"
                                      className="w-full"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem className="lg:w-[45%] w-full">
                                  <FormControl {...field}>
                                    <IMaskInput
                                      className="flex h-9 w-full bg-white focus:border-black text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm outline-none rounded-md focus:border focus:border-input bg-transparent px-3 py-1 shadow-sm"
                                      mask="+00 (00) 0000-0000"
                                      placeholder="Phone number"
                                    />
                                    {/* <Input
                                      {...field}
                                      variant="white"
                                      placeholder="Phone number"
                                      className="w-full"
                                    /> */}
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center mt-10 space-y-5">
                      <h1 className="text-gray2 font-bold text-start w-full">
                        Provide additional information
                      </h1>
                      <div className="w-full flex flex-col justify-center items-start space-y-5  bg-white2 rounded-xl p-5">
                        <FormField
                          control={form.control}
                          name="additional_information"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl {...field}>
                                <Textarea
                                  {...field}
                                  placeholder="Notes for the chauffeur"
                                  className="w-full bg-white resize-none"
                                  rows={5}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <span className="text-xs text-gray2">
                          Include any special requests, such as the number of
                          bags, child seats, or similar needs. Avoid sharing any
                          confidential information.
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <LoginForBook />
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <TravelTopInfo />
                    <div className="w-full flex flex-col justify-center items-center mt-10 space-y-5">
                      <h1 className="text-gray2 font-bold text-start w-full">
                        Add credit card
                      </h1>
                      <div className="w-full flex flex-col justify-center items-start space-y-5  bg-white2 rounded-xl p-10">
                        <FormField
                          control={form.control}
                          name="name_on_card"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl {...field}>
                                <Input
                                  {...field}
                                  onChange={(e) => {
                                    form.setValue(
                                      "name_on_card",
                                      e.target.value
                                    );
                                    console.log(form.watch("name_on_card"));
                                  }}
                                  variant="white"
                                  placeholder="Name on card"
                                  className="w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="card_number"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl {...field}>
                                <Input
                                  {...field}
                                  type="text"
                                  maxLength={19}
                                  onChange={(e) => {
                                    const digitsOnly = e.target.value.replace(
                                      /\D/g,
                                      ""
                                    );
                                    const formattedValue =
                                      formatCardNumber(digitsOnly);
                                    form.setValue("card_number", digitsOnly);
                                    e.target.value = formattedValue;
                                    console.log(form.watch("card_number"));
                                  }}
                                  value={formatCardNumber(
                                    form.watch("card_number")
                                  )}
                                  variant="white"
                                  placeholder="Card number"
                                  className="w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="w-full hidden lg:flex flex-row justify-between items-center">
                          <FormField
                            control={form.control}
                            name="expiration_date"
                            render={({ field }) => (
                              <FormItem className="w-[45%]">
                                <FormControl {...field}>
                                  <Input
                                    {...field}
                                    onChange={(e) => {
                                      const digitsOnly = e.target.value.replace(
                                        /\D/g,
                                        ""
                                      );
                                      const formattedValue =
                                        formatExpiryDate(digitsOnly);
                                      form.setValue(
                                        "expiration_date",
                                        formatExpiryDate(formattedValue)
                                      );
                                      console.log(
                                        form.watch("expiration_date")
                                      );
                                    }}
                                    value={formatExpiryDate(
                                      form.watch("expiration_date")
                                    )}
                                    variant="white"
                                    maxLength={5}
                                    placeholder="Expiration date"
                                    className="w-full"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="cvv"
                            render={({ field }) => (
                              <FormItem className="w-[45%]">
                                <FormControl {...field}>
                                  <Input
                                    {...field}
                                    maxLength={4}
                                    variant="white"
                                    placeholder="CVV"
                                    className="w-full"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="expiration_date"
                          render={({ field }) => (
                            <FormItem className="lg:hidden block w-full">
                              <FormControl {...field}>
                                <Input
                                  {...field}
                                  onChange={(e) => {
                                    const digitsOnly = e.target.value.replace(
                                      /\D/g,
                                      ""
                                    );
                                    const formattedValue =
                                      formatExpiryDate(digitsOnly);
                                    form.setValue(
                                      "expiration_date",
                                      formatExpiryDate(formattedValue)
                                    );
                                    console.log(form.watch("expiration_date"));
                                  }}
                                  value={formatExpiryDate(
                                    form.watch("expiration_date")
                                  )}
                                  variant="white"
                                  maxLength={5}
                                  placeholder="Expiration date"
                                  className="w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem className="lg:hidden block w-full">
                              <FormControl {...field}>
                                <Input
                                  {...field}
                                  maxLength={4}
                                  variant="white"
                                  placeholder="CVV"
                                  className="w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Separator />
                        <div className="flex flex-col justify-between items-start gap-2">
                          <div className="flex flex-row items-center justify-between text-sm gap-2 text-gray2">
                            <div>
                              <FaRegCheckCircle size={18} />
                            </div>
                            <span>
                              Our servers are encrypted with TLS/SSL to ensure
                              security and privacy.
                            </span>
                          </div>
                          <div className="flex flex-row items-center justify-center text-sm gap-2 text-gray2">
                            <div>
                              <FaRegCheckCircle size={18} />
                            </div>
                            <span>
                              We only charge you after the ride is finished
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="space-y-10"
                  >
                    <div className="w-full bg-white2 flex rounded-xl flex-col justify-between items-start p-10 space-y-3">
                      <div className="w-full flex flex-row justify-start items-center gap-10">
                        <span className="text-xs text-gray2">
                          {formValues.from}
                        </span>
                        <FaArrowRightLong size={20} />
                        <span className="text-xs text-gray2">
                          {formValues.to}
                        </span>
                      </div>
                      <div className="w-full flex flex-row justify-start items-center gap-10">
                        <span className="flex flex-row justify-start items-center gap-2 rounded-full p-2 bg-gray1 text-gray2 text-xs">
                          <FaRegCalendarAlt size={15} />
                          {format(formValues.date, "PPP")}
                        </span>
                        <span className="flex flex-row justify-start items-center gap-2 rounded-full p-2 bg-gray1 text-gray2 text-xs">
                          <MdWatch size={15} />
                          {formValues.hour}
                        </span>
                      </div>
                      <span className="text-sm text-gray2">
                        Estimated Arrival at 04:45 PM (GMT) - 4.4km
                      </span>
                      <Separator />
                      <span className="font-bold text-gray2 text-sm">
                        {`${userValues.title ? userValues.title : ""} ${
                          userValues.first_name
                        } ${userValues.last_name}`}
                      </span>
                      <span className="text-gray2 text-sm">
                        {formValues.car_class}
                      </span>
                      <span className="text-gray2 text-sm">
                        {userValues.email}
                      </span>
                      <span className="text-gray2 text-sm">
                        +{userValues.phone}
                      </span>
                      <Separator />
                      <span className="font-bold text-gray2 text-sm">
                        Payment
                      </span>
                      <button onClick={() => console.log(formValues)}>
                        testa aui
                      </button>
                      <div className="flex gap-2 flex-row justify-between items-center">
                        <FiCreditCard size={20} />
                        <span className="text-gray2 text-sm">
                          {formatCardNumberForShow(formValues.card_number)}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-white2 flex rounded-xl flex-col justify-between items-start p-10 space-y-5">
                      <div className="flex flex-row items-center justify-center text-sm gap-2 text-gray2">
                        <div>
                          <FaRegCheckCircle size={18} />
                        </div>
                        <span>
                          Cancel free of charge up to 1 hour before pickup.
                        </span>
                      </div>
                      <div className="flex flex-row items-center justify-center text-sm gap-2 text-gray2">
                        <div>
                          <FaRegCheckCircle size={18} />
                        </div>
                        <span>
                          Enjoy 15 minutes of complimentary waiting time.
                        </span>
                      </div>
                      <div className="flex flex-row items-center justify-center text-sm gap-2 text-gray2">
                        <div>
                          <FaRegCheckCircle size={18} />
                        </div>
                        <span>Personal Meet & Greet service included. </span>
                      </div>
                      <div className="flex flex-row items-center justify-center text-sm gap-2 text-gray2">
                        <div>
                          <FaRegCheckCircle size={18} />
                        </div>
                        <span>Complimentary bottled water provided. </span>
                      </div>

                      <Separator />
                      <div className="flex flex-row items-center justify-between text-sm gap-2 text-gray2">
                        <div>
                          <FaRegCheckCircle size={18} />
                        </div>
                        <span>
                          For safety, adhere to guest and luggage capacity
                          limits. If unsure, choose a larger vehicle class, as
                          exceeding these limits may result in service refusal.
                        </span>
                      </div>
                      <div className="flex flex-row items-center justify-center text-sm gap-2 text-gray2">
                        <div>
                          <FaRegCheckCircle size={18} />
                        </div>
                        <span>
                          For safety, adhere to guest and luggage capacity
                          limits. If unsure, choose a larger vehicle class, as
                          exceeding these limits may result in service refusal.
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              {/* Navigation */}
              <div className="mt-8 pt-5">
                <div
                  className={`flex items-center ${
                    currentStep === 0 ? "justify-end" : "justify-between"
                  }`}
                >
                  <button
                    type="button"
                    onClick={prev}
                    disabled={currentStep === 0}
                    className={`${
                      currentStep === 0 ? "hidden" : ""
                    } rounded-full bg-white p-3 text-sm font-semibold shadow-sm ring-1 ring-inset ring-black hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    <FaArrowLeft size={20} />
                  </button>
                  {currentStep !== 3 ? (
                    <button
                      type={"button"}
                      onClick={next}
                      disabled={!areFieldsFilled()}
                      className={`rounded-full ${
                        currentStep === 2
                          ? "bg-black py-3 px-4  text-white"
                          : "bg-white p-3 font-semibold"
                      } text-sm shadow-sm ring-1 ring-inset ring-black hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-50`}
                    >
                      {currentStep === 2 ? (
                        "Proceed to checkout"
                      ) : currentStep === 3 ? (
                        "Complete Reservation"
                      ) : (
                        <FaArrowRight size={20} />
                      )}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!areFieldsFilled()}
                      className={`rounded-full bg-white p-3 font-semibold text-sm shadow-sm ring-1 ring-inset ring-black hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-50`}
                    >
                      Complete Reservation
                    </button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </section>
      )}
    </div>
  );
}

export default function BookATrip() {
  return (
    <Suspense fallback={<Loading />}>
      <BookATripComponent />
    </Suspense>
  );
}
