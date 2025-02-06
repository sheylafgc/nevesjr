"use client";
import { useForm } from "react-hook-form";
import { BookATripSchema, BookATripSchemaType } from "./BookATripSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { IoCarOutline } from "react-icons/io5";
import { RxExit } from "react-icons/rx";
import { MdLuggage, MdOutlinePayment, MdPeopleAlt } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
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
import { carsClasses } from "@/app/constants/classesData";
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

const steps = [
  {
    id: "Step 1",
    name: "Service",
    fields: [
      "from",
      "to",
      "carClass",
      "date",
      "hour",
      "bookingFor",
      "title",
      "firstName",
      "lastName",
      "email",
      "phone",
      "additionalInformation",
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
    fields: ["nameOnCard", "cardNumber", "expirationDate", "cvv"],
  },
  {
    id: "Step 4",
    name: "Checkout",
  },
];

export default function BookATrip() {
  const form = useForm<BookATripSchemaType>({
    resolver: zodResolver(BookATripSchema),
    defaultValues: {
      from: "",
      to: "",
      carClass: "",
      date: "",
      hour: "",
      bookingFor: "myself",
      title: undefined,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      additionalInformation: "",
      nameOnCard: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    },
    mode: "onChange",
  });
  const formValues = form.watch();
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const user = true;

  const onSubmit = form.handleSubmit((data) => console.log(data));

  // type FieldName = keyof BookATripSchemaType;

  const areFieldsFilled = () => {
    if (currentStep === 0) {
      const isBasicFieldsFilled = formValues.carClass !== "";
      const isOtherFiledFilled =
        formValues.firstName !== "" &&
        formValues.lastName !== "" &&
        formValues.email !== "" &&
        formValues.phone !== "" &&
        (formValues.title !== "Mr" || "Ms");
      if (formValues.bookingFor === "myself") {
        return isBasicFieldsFilled;
      }

      if (formValues.bookingFor === "someoneElse") {
        return isBasicFieldsFilled && isOtherFiledFilled;
      }
    }
    if (currentStep === 1 && user) {
      return true;
    }
    if (currentStep === 2) {
      return (
        formValues.nameOnCard !== "" &&
        formValues.cardNumber !== "" &&
        formValues.expirationDate !== "" &&
        formValues.cvv !== ""
      );
    }

    return false;
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiryDate = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, "");

    // Limit to four numeric characters
    const formattedValue = numericValue.slice(0, 4);

    // Add the '/' separator after the first two characters
    if (formattedValue.length > 2) {
      return formattedValue.slice(0, 2) + "/" + formattedValue.slice(2); // Sem espaços ao redor do '/'
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
            >
              {steps.map((step, index) => (
                <Step
                  className=""
                  key={index}
                  onClick={() => areFieldsFilled() && setCurrentStep(index)}
                  placeholder={step.name}
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

          {/* Form */}
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <div className="mt-12 w-full">
                {currentStep === 0 && (
                  <motion.div
                    initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <TravelTopInfo />
                    <FormField
                      control={form.control}
                      name="carClass"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl {...field}>
                            <div className="flex flex-col justify-center items-center space-y-5 mt-10">
                              <h1 className="text-gray2 font-bold text-start w-full">
                                Choose your class
                              </h1>
                              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-10 ">
                                {carsClasses.map((car) =>
                                  formValues.carClass === car.className ? (
                                    <div
                                      key={car.id}
                                      onClick={() => {
                                        form.setValue(
                                          "carClass",
                                          car.className
                                        );
                                        console.log(
                                          "console watch:",
                                          form.watch("carClass")
                                        );
                                        console.log(car.className);
                                      }}
                                      className="border border-black h-[400px] lg:w-[260px] w-full flex flex-col justify-center items-center bg-gray1 rounded-xl p-10 space-y-3"
                                    >
                                      <Image
                                        width={220}
                                        height={130}
                                        src={car.carImage}
                                        alt={car.carName}
                                      />
                                      <span className="text-gray2 font-bold">
                                        {car.className}
                                      </span>
                                      <span className="text-gray2  mt-2">
                                        {car.carName}
                                      </span>
                                      <div className="w-20 flex flex-row justify-between items-center">
                                        <span className="flex flex-row justify-between items-center gap-2">
                                          <MdPeopleAlt className="w-4 h-4 text-gray2" />
                                          {car.maxPassengers}
                                        </span>
                                        <span className="flex flex-row justify-between items-center gap-2">
                                          <MdLuggage className="w-4 h-4 text-gray2" />
                                          {car.maxLugage}
                                        </span>
                                      </div>
                                      <span className="text-gray2 font-extrabold">
                                        ${car.value}
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
                                          "carClass",
                                          car.className
                                        );
                                        console.log(
                                          "console watch:",
                                          form.watch("carClass")
                                        );
                                        console.log(car.className);
                                      }}
                                      className="h-[400px] lg:w-[260px] w-full flex flex-col justify-center items-center bg-gray1 rounded-xl p-10 space-y-3"
                                    >
                                      <Image
                                        width={220}
                                        height={130}
                                        src={car.carImage}
                                        alt={car.carName}
                                      />
                                      <span className="text-gray2 font-bold">
                                        {car.className}
                                      </span>
                                      <span className="text-gray2  mt-2">
                                        {car.carName}
                                      </span>
                                      <div className="w-20 flex flex-row justify-between items-center">
                                        <span className="flex flex-row justify-between items-center gap-2">
                                          <MdPeopleAlt className="w-4 h-4 text-gray2" />
                                          {car.maxPassengers}
                                        </span>
                                        <span className="flex flex-row justify-between items-center gap-2">
                                          <MdLuggage className="w-4 h-4 text-gray2" />
                                          {car.maxLugage}
                                        </span>
                                      </div>
                                      <span className="text-gray2 font-extrabold">
                                        ${car.value}
                                      </span>
                                      <Button className="px-8 border border-gray2 rounded-full text-sm font-thin hover:text-gray1 lg:mt-0 mt-8">
                                        Select
                                      </Button>
                                    </div>
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
                          name="bookingFor"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl {...field}>
                                <RadioGroup
                                  onValueChange={(value) => {
                                    form.setValue(
                                      "bookingFor",
                                      value as "myself" | "someoneElse"
                                    );
                                    console.log(
                                      "console watch:",
                                      form.watch("bookingFor")
                                    );
                                    console.log(value);
                                    console.log(
                                      "Form: ",
                                      formValues.bookingFor
                                    );
                                  }}
                                  defaultValue={
                                    formValues.bookingFor
                                      ? formValues.bookingFor
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
                        {formValues.bookingFor === "someoneElse" && (
                          <div className="w-full flex flex-col justify-center items-start space-y-5">
                            <Separator />
                            <div className="hidden lg:flex lg:flex-row flex-col justify-between items-center w-full ">
                              <FormField
                                control={form.control}
                                name="firstName"
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
                                name="lastName"
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
                              name="firstName"
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
                              name="lastName"
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
                                    <Input
                                      {...field}
                                      variant="white"
                                      placeholder="Phone number"
                                      className="w-full"
                                    />
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
                          name="additionalInformation"
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
                          name="nameOnCard"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl {...field}>
                                <Input
                                  {...field}
                                  onChange={(e) => {
                                    form.setValue("nameOnCard", e.target.value);
                                    console.log(form.watch("nameOnCard"));
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
                          name="cardNumber"
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
                                    form.setValue("cardNumber", digitsOnly);
                                    e.target.value = formattedValue;
                                    console.log(form.watch("cardNumber"));
                                  }}
                                  value={formatCardNumber(
                                    form.watch("cardNumber")
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
                            name="expirationDate"
                            render={({ field }) => (
                              <FormItem className="w-[45%]">
                                <FormControl {...field}>
                                  <Input
                                    {...field}
                                    onChange={(e) => {
                                      const digitsOnly = e.target.value.replace(
                                        /\D/g,
                                        ""
                                      ); // Re
                                      const formattedValue =
                                        formatExpiryDate(digitsOnly);
                                      form.setValue(
                                        "expirationDate",
                                        formatExpiryDate(formattedValue)
                                      );
                                      console.log(form.watch("expirationDate"));
                                    }}
                                    value={formatExpiryDate(
                                      form.watch("expirationDate")
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
                          name="expirationDate"
                          render={({ field }) => (
                            <FormItem className="lg:hidden block w-full">
                              <FormControl {...field}>
                                <Input
                                  {...field}
                                  onChange={(e) => {
                                    const digitsOnly = e.target.value.replace(
                                      /\D/g,
                                      ""
                                    ); // Re
                                    const formattedValue =
                                      formatExpiryDate(digitsOnly);
                                    form.setValue(
                                      "expirationDate",
                                      formatExpiryDate(formattedValue)
                                    );
                                    console.log(form.watch("expirationDate"));
                                  }}
                                  value={formatExpiryDate(
                                    form.watch("expirationDate")
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
                          <span className="flex flex-row items-center justify-center text-sm gap-2 text-gray2">
                            <FaRegCheckCircle
                              size={18}
                              className="text-gray2"
                            />
                            Our servers are encrypted with TLS/SSL to ensure
                            security and privacy.
                          </span>
                          <span className="flex flex-row items-center justify-center text-sm gap-2 text-gray2">
                            <FaRegCheckCircle
                              size={18}
                              className="text-gray2"
                            />
                            We only charge you after the ride is finished
                          </span>
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
                  >
                    <div className="w-full bg-white2 flex rounded-xl flex-col justify-between items-start p-10 space-y-3">
                      <div className="w-full flex flex-row justify-start items-center gap-10">
                        <span className="text-xs text-gray2">
                          1 Kensington Palace Gardens, <br /> London, W8 4QP
                        </span>
                        <FaArrowRightLong size={20} />
                        <span className="text-xs text-gray2">
                          22 Eaton Square, Belgravia, <br /> London SW1W 9DF
                        </span>
                      </div>
                      <div className="w-full flex flex-row justify-start items-center gap-10">
                        <span className="flex flex-row justify-start items-center gap-2 rounded-full p-2 bg-gray1 text-gray2 text-xs">
                          <FaRegCalendarAlt size={15} />
                          Tue. Dec 10, 2024
                        </span>
                        <span className="flex flex-row justify-start items-center gap-2 rounded-full p-2 bg-gray1 text-gray2 text-xs">
                          <FaRegClock size={15} />
                          Tue. Dec 10, 2024
                        </span>
                      </div>
                      <span className="text-sm text-gray2">
                        Estimated Arrival at 04:45 PM (GMT) - 4.4km
                      </span>
                      <Separator />
                      <span className="font-bold text-gray2 text-sm">
                        {`${formValues.title ? formValues.title : ""} ${
                          formValues.firstName
                        } ${formValues.lastName}`}
                      </span>
                      <span className="text-gray2 text-sm">
                        {formValues.carClass}
                      </span>
                      <span className="text-gray2 text-sm">
                        {formValues.email}
                      </span>
                      <span className="text-gray2 text-sm">
                        {formValues.phone}
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </form>
          </Form>

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
              <button
                type="button"
                onClick={next}
                disabled={
                  currentStep === steps.length - 1 || !areFieldsFilled()
                }
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
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
