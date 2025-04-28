/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { BookATripSchema, BookATripSchemaType } from "./BookATripSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoCarOutline, IoLocationSharp } from "react-icons/io5";
import {
  MdLocationSearching,
  MdLuggage,
  MdOutlineLogin,
  // MdOutlinePayment,
  MdPeopleAlt,
  MdWatch,
} from "react-icons/md";
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
import { AuthContext } from "@/src/context/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getVehicles } from "@/src/domain/Vehicles/Vehicles";
import Loading from "@/components/Loading/Loading";

// import { loadStripe } from "@stripe/stripe-js";
// import
// CardCvcElement,
// CardExpiryElement,
// CardNumberElement,
// Elements,
// useElements,
// useStripe,
// "@stripe/react-stripe-js";
import InputText from "@/components/InputText/InputText";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/src/lib/utils";
import { useSearchParams } from "next/navigation";
import DurationPicker from "@/components/DurationPicker/DurationPicker";
import TimePicker from "@/components/TimePicker/TimePicker";
import { TbClockPin } from "react-icons/tb";
import {
  Autocomplete,
  Libraries,
  useJsApiLoader,
} from "@react-google-maps/api";
import { api } from "@/src/api/api";
import { formatDate, formatHourWithSec, formatTime } from "@/utils/formatTime";
import { Bounce, toast } from "react-toastify";
import { useLocale, useTranslations } from "next-intl";
import useStepTranslations from "@/src/components/StepConfig/StepConfig";
import { useRouter } from "@/src/i18n/navigation";
import { PhoneInput } from "react-international-phone";

// if (process.env.NEXT_PUBLIC_STRIPE_PUB_KEY === undefined) {
//   throw new Error("NEXT_PUBLIC_STRIPE_PUB_KEY is not defined");
// }

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY);

function BookATripComponent() {
  const t = useTranslations("Book_a_trip");
  const tButton = useTranslations("Buttons");
  const tToast = useTranslations("Toasts");
  const locale = useLocale();
  const tForm = useTranslations("LoginAndSignUp");
  const steps = useStepTranslations();
  const { user } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const form = useForm<BookATripSchemaType>({
    resolver: zodResolver(BookATripSchema),
    defaultValues: {
      user: null,
      from_route: "",
      to_route: "",
      date: "",
      hour: "",
      duration: "",
      estimated_time: undefined,
      distance_km: 0,
      vehicle: undefined,
      booking_for: "myself",
      first_name: "",
      last_name: "",
      email: "",
      title: undefined,
      phone_number: "",
      notes: "",
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
  const searchParams = useSearchParams();
  const checkedParam: string | null = searchParams.get("checked");
  const fromParam: string | null = searchParams.get("from");
  const toParam: string | null = searchParams.get("to");
  const durationParam: string | null = searchParams.get("duration");
  const dateParam: string | null = searchParams.get("date");
  const timeParam: string | null = searchParams.get("time");
  const carParam: string | null = searchParams.get("carId");
  const fromRef = useRef(null);
  const toRef = useRef(null);

  // const stripe = useStripe();
  // const elements = useElements();
  const router = useRouter();

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

  useEffect(() => {
    setChecked(checkedParam === "true" ? true : false);
    form.setValue("from_route", fromParam || "");
    form.setValue("to_route", toParam || "");
    form.setValue("duration", durationParam || "");
    form.setValue("date", dateParam || "");
    form.setValue("hour", timeParam || "Mr");
    form.setValue("vehicle", Number(carParam));
  }, [searchParams]);

  const [distance, setDistance] = useState<string | null>(null);

  const calculateDistance = async () => {
    const originPlace = searchResultFrom ? searchResultFrom.getPlace() : null;
    const destinationPlace = searchResultTo ? searchResultTo.getPlace() : null;

    const origin =
      originPlace && originPlace.formatted_address
        ? originPlace.formatted_address
        : fromParam
        ? formValues.from_route
        : "";
    const destination =
      destinationPlace && destinationPlace.formatted_address
        ? destinationPlace.formatted_address
        : toParam
        ? formValues.to_route
        : "";

    if (!origin || !destination) {
      return;
    }

    if (!fromParam && !toParam && !isLoaded) {
      console.log("Google Maps API not loaded");
      return;
    }

    try {
      const directionService = new google.maps.DirectionsService();
      const results = await directionService.route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      if (results.routes[0].legs[0].distance) {
        setDistance(results.routes[0].legs[0].distance.text);
        form.setValue(
          "distance_km",
          results.routes[0].legs[0].distance.value / 1000
        );
      }
      if (results.routes[0].legs[0].duration && formValues.hour) {
        const arrivalTimeInSeconds = results.routes[0].legs[0].duration.value;

        const formHour = formValues.hour;
        const [hour, minute, second] = formHour.split(":").map(Number);

        const now = new Date();
        const arrivalDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          hour,
          minute,
          second
        );

        const estimatedArrivalDate = new Date(
          arrivalDate.getTime() + arrivalTimeInSeconds * 1000
        );

        const arrivalTimeFormatted = estimatedArrivalDate.toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }
        );
        form.setValue("estimated_time", arrivalTimeFormatted ?? "");
      }
    } catch (error) {
      console.error("Error fetching directions: ", error);
    }
  };

  useEffect(() => {
    const hasOrigin =
      formValues.from_route ||
      (searchResultFrom && searchResultFrom.getPlace());
    const hasDestination =
      formValues.to_route || (searchResultTo && searchResultTo.getPlace());
    const hasHour = formValues.hour;
    const timePattern = /^(0?[0-9]|1[0-9]|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (hasOrigin && hasDestination && !timePattern.test(hasHour)) {
      return;
    }
    if (checkedParam === "true" || checked) {
      return;
    }
    if (distance && formValues.estimated_time) {
      return;
    }
    calculateDistance();
  }, [formValues.from_route, formValues.to_route, formValues.hour]);

  useEffect(() => {
    if (user) {
      form.setValue("first_name", user?.first_name || "");
      form.setValue("last_name", user?.last_name || "");
      form.setValue("email", user?.email || "");
      form.setValue("phone_number", user?.phone || "");
      form.setValue("title", user?.title || "Mr");
      form.setValue("user", Number(user?.id) || null);

      if (currentStep === 1) {
        next();
      }
    }
  }, [user, currentStep]);

  const handleDurationChange = (duration: string) => {
    form.setValue("duration", duration);
  };

  const handleTimeChange = (time: string) => {
    form.setValue("hour", time);
  };

  const handleSubmit: SubmitHandler<BookATripSchemaType> = async (data) => {
    if (paymentSuccessful) return;
    setLoading(true);

    try {
      // if (!stripe || !elements) {
      //   console.log("Stripe or elements not loaded.");
      //   toast.error(tToast("error_loading_stripe"), {
      //     position: "top-right",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: false,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //     transition: Bounce,
      //   });
      //   return;
      // }

      // const cardNumberElement = elements.getElement(CardNumberElement);
      // const cardExpiryElement = elements.getElement(CardExpiryElement);
      // const cardCvcElement = elements.getElement(CardCvcElement);

      // if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      //   console.log("Card elements not found.");
      //   toast.error(tToast("error_loading_credit_card"), {
      //     position: "top-right",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: false,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //     transition: Bounce,
      //   });
      //   return;
      // }

      // const { error, paymentMethod } = await stripe.createPaymentMethod({
      //   type: "card",
      //   card: cardNumberElement,
      // });

      // if (error) {
      //   console.log("Error creating payment method:", error);
      //   toast.error(`${tToast("error_processing_payment")} ${error.message}`, {
      //     position: "top-right",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: false,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //     transition: Bounce,
      //   });
      //   return;
      // }
      if (!data.user) {
        toast.error("User ID is missing");
        return;
      }
      await api.post("/booking/create/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setPaymentSuccessful(true);

      // if (response.data && response.data.client_secret) {
      //   const { error, paymentIntent } = await stripe.confirmCardPayment(
      //     response.data.client_secret,
      //     {
      //       payment_method: paymentMethod.id,
      //     }
      //   );
      //   if (error) {
      //     console.log("Error confirming payment:", error);
      //     toast.error(
      //       `${tToast("error_confirming_payment")} ${error.message}`,
      //       {
      //         position: "top-right",
      //         autoClose: 3000,
      //         hideProgressBar: false,
      //         closeOnClick: false,
      //         pauseOnHover: true,
      //         draggable: true,
      //         progress: undefined,
      //         theme: "light",
      //         transition: Bounce,
      //       }
      //     );
      //   } else if (paymentIntent.status === "succeeded") {
      //     setPaymentSuccessful(true);
      //     toast.success(tToast("payment_successful"), {
      //       position: "top-right",
      //       autoClose: 3000,
      //       hideProgressBar: false,
      //       closeOnClick: false,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //       theme: "light",
      //       transition: Bounce,
      //     });
      //   }
      // } else {
      //   console.log("Unexpected response:", response.data);
      //   toast.error(tToast("unexpected_error_processing_payment"), {
      //     position: "top-right",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: false,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //     transition: Bounce,
      //   });
      // }
    } catch (error) {
      console.log("Error fetching clientSecret:", error);
      toast.error(tToast("error_processing_request"), {
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
    } finally {
      setLoading(false);
    }
  };

  const { data: vehicles, isFetching: isFetchingVehicles } = useQuery({
    queryKey: ["getVehicles", locale],
    queryFn: async () => {
      const data = await getVehicles({ locale });
      return data;
    },
  });

  const areFieldsFilled = () => {
    const isBasicFieldsFilled = formValues.vehicle !== undefined;
    const checkDurationFieldsFilled =
      formValues.from_route !== "" &&
      formValues.hour !== "" &&
      formValues.date !== "" &&
      formValues.duration !== "";
    const routeFieldsFilled =
      formValues.from_route !== "" &&
      formValues.to_route !== "" &&
      formValues.date !== "" &&
      formValues.hour !== "" &&
      formValues.estimated_time !== undefined;
    const isOtherFiledFilled =
      formValues.first_name !== "" &&
      formValues.last_name !== "" &&
      formValues.email !== "" &&
      formValues.phone_number !== "" &&
      (formValues.title !== "Mr" || "Ms");
    if (currentStep === 0) {
      if (formValues.booking_for === "myself") {
        return (
          isBasicFieldsFilled &&
          (checked ? checkDurationFieldsFilled : routeFieldsFilled)
        );
      }

      return (
        isBasicFieldsFilled &&
        isOtherFiledFilled &&
        (checked ? checkDurationFieldsFilled : routeFieldsFilled)
      );
    }

    if (currentStep === 1 && user) {
      return true;
    }
    if (currentStep === 2) {
      return true;
    }

    // if (currentStep === 3) {
    //   return true;
    // }

    return false;
  };

  // const calculateTripAmount = () => {
  //   const { vehicle, distance_km, duration } = formValues;

  //   if (!vehicle) return 0;

  //   const selectedVehicle = vehicles?.find((v) => v.id === vehicle);
  //   if (!selectedVehicle) return 0;

  //   let amount = 0;

  //   if (checked && selectedVehicle.price_hour && duration) {
  //     const [hours, minutes, seconds] = duration.split(":").map(Number);
  //     const totalHours = hours + minutes / 60 + seconds / 3600;
  //     amount = Number(selectedVehicle.price_hour) * totalHours * 100;
  //   } else if (!checked && selectedVehicle.price_km && distance_km) {
  //     amount = Number(selectedVehicle.price_km) * distance_km * 100;
  //   }

  //   return Math.floor(amount);
  // };

  const next = () => {
    setPreviousStep(currentStep);
    console.log("currentStep", currentStep);
    window.scrollTo(0, 10);
    console.log(formValues);
    if (!isLastStep) {
      setCurrentStep((cur) => cur + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0 && !isFirstStep) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
      console.log(formValues);
      window.scrollTo(0, 10);
    }
  };

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {paymentSuccessful ? (
        <div className="lg:w-[60%] w-[90%] flex flex-col justify-between pt-40 pb-20">
          <ReservationCompleted
            onClick={() => {
              router.push("/BookATrip");
              form.reset();
              setCurrentStep(0);
              setChecked(false);

              setPaymentSuccessful(false);
            }}
          />
        </div>
      ) : (
        <section className="lg:w-[80%] w-[90%] flex flex-col justify-between lg:p-24 py-32">
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
                        <MdOutlineLogin className="text-white" size={20} />
                      ) : step.id === "Step 3" ? (
                        <FiCheckCircle className="text-white" size={20} />
                      ) : // : step.id === "Step 4" ? (
                      //   <MdOutlinePayment className="text-white" size={20} />
                      // )
                      null}
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
                        <MdOutlineLogin className="text-white" size={20} />
                      ) : step.id === "Step 3" ? (
                        <FiCheckCircle className="text-white" size={20} />
                      ) : //  : step.id === "Step 4" ? (
                      //   <MdOutlinePayment className="text-white" size={20} />
                      // )
                      null}
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
                        <MdOutlineLogin className="text-gray2" size={20} />
                      ) : step.id === "Step 3" ? (
                        <FiCheckCircle className="text-gray2" size={20} />
                      ) : // : step.id === "Step 4" ? (
                      //   <MdOutlinePayment className="text-gray2" size={20} />
                      // )
                      null}
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
            <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                              {formValues.from_route}
                            </span>
                            {checkedParam === "false" && (
                              <>
                                <FaArrowRightLong size={20} />
                                <span className="text-xs text-gray2">
                                  {formValues.to_route}
                                </span>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="w-full flex-col flex items-center justify-between">
                            <div className="w-full flex items-center justify-between px-2 gap-2 mb-6">
                              <span className="text-base">{t("by_hour")}</span>
                              <Switch
                                className="w-14 h-6"
                                checked={checked}
                                onClick={() => {
                                  setChecked(!checked);
                                }}
                              />
                            </div>
                            <div className="w-full lg:flex-row flex-col flex justify-between items-center">
                              <Autocomplete
                                onLoad={onLoadFrom}
                                onPlaceChanged={() => {
                                  if (searchResultFrom) {
                                    const place = searchResultFrom.getPlace();
                                    form.setValue(
                                      "from_route",
                                      place.formatted_address ?? ""
                                    );
                                  }
                                }}
                                className="lg:w-[45%] w-full"
                              >
                                <FormField
                                  control={form.control}
                                  name="from_route"
                                  render={({ field }) => (
                                    <FormItem className="w-full">
                                      <FormControl {...field}>
                                        <InputText
                                          ref={fromRef}
                                          placeholder={t("from_input")}
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
                              </Autocomplete>

                              {checked ? (
                                <FormField
                                  control={form.control}
                                  name="duration"
                                  render={() => (
                                    <FormItem className="lg:w-[45%] w-full">
                                      <FormControl>
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
                                <Autocomplete
                                  onLoad={onLoadTo}
                                  onPlaceChanged={() => {
                                    if (searchResultTo) {
                                      const place = searchResultTo.getPlace();
                                      form.setValue(
                                        "to_route",
                                        place.formatted_address ?? ""
                                      );
                                    }
                                  }}
                                  className="lg:w-[45%] w-full"
                                >
                                  <FormField
                                    control={form.control}
                                    name="to_route"
                                    render={({ field }) => (
                                      <FormItem className="w-full">
                                        <FormControl {...field}>
                                          <InputText
                                            ref={toRef}
                                            placeholder={t("to_input")}
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
                                </Autocomplete>
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
                              {formValues.date && formatDate(formValues.date)}
                            </span>
                            <span className="flex flex-row justify-start items-center gap-2 rounded-full p-2 bg-gray1 text-gray2 text-xs">
                              <MdWatch size={15} />
                              {formValues.hour !== "" &&
                                formatTime(formValues.hour)}
                            </span>
                            {checkedParam === "true" && (
                              <span className="flex flex-row justify-start items-center gap-2 rounded-full p-2 bg-gray1 text-gray2 text-xs">
                                <TbClockPin size={15} />
                                {formatHourWithSec(formValues.duration ?? "")}
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
                                          type="button"
                                          className={cn(
                                            "justify-start text-left text-black font-normal bg-white shadow-sm hover:bg-white",
                                            !formValues.date &&
                                              "text-muted-foreground"
                                          )}
                                        >
                                          <CalendarIcon className="mr-1 h-4 w-4" />
                                          {formValues.date ? (
                                            formatDate(formValues.date)
                                          ) : (
                                            <span>{t("date_input")}</span>
                                          )}
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-auto p-0">
                                        <Calendar
                                          mode="single"
                                          fromDate={new Date()}
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
                      {distance &&
                        formValues.estimated_time !== "" &&
                        (!checked || checkedParam === "false") && (
                          <span className="text-sm text-gray2">
                            {t("estimated_arrival")}{" "}
                            {formValues.estimated_time
                              ? formatTime(formValues.estimated_time)
                              : ""}{" "}
                            (GMT) - {distance}
                          </span>
                        )}
                    </div>
                    <FormField
                      control={form.control}
                      name="vehicle"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl {...field}>
                            <div className="flex flex-col justify-center items-center space-y-5 mt-10">
                              <h1 className="text-gray2 font-bold text-start w-full">
                                {t("choose_your_class")}
                              </h1>
                              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-10 ">
                                {isFetchingVehicles ? (
                                  <Loading />
                                ) : (
                                  vehicles?.map((car) =>
                                    formValues.vehicle === car.id ? (
                                      <div
                                        key={car.id}
                                        onClick={() => {
                                          form.setValue("vehicle", car.id);
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
                                        {/* <span className="text-gray2 font-extrabold">
                                          £
                                          {checked
                                            ? car.price_hour
                                            : car.price_km}{" "}
                                          <span className="text-xs text-black/50">
                                            {checked ? "per hour" : "per km"}
                                          </span>
                                        </span> */}
                                        <Button
                                          type="button"
                                          className="px-8 border border-gray2 text-sm font-thin rounded-full hover:text-gray1 lg:mt-0 mt-8"
                                        >
                                          {tButton("select")}
                                        </Button>
                                      </div>
                                    ) : (
                                      <div
                                        key={car.id}
                                        onClick={() => {
                                          form.setValue("vehicle", car.id);
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
                                        {/* <span className="text-gray2 font-extrabold">
                                          £
                                          {checked
                                            ? car.price_hour
                                            : car.price_km}{" "}
                                          <span className="text-xs text-black/50">
                                            {checked ? "per hour" : "per km"}
                                          </span>
                                        </span> */}
                                        <Button
                                          type="button"
                                          className="px-8 border border-gray2 rounded-full text-sm font-thin hover:text-gray1 lg:mt-0 mt-8"
                                        >
                                          {tButton("select")}
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
                        {t("who_are_booking")}
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
                                      value as "myself" | "someone_else"
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
                                      {t("book_for_myself")}
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="someone_else"
                                      id="someone_else"
                                    />
                                    <Label htmlFor="someone_else">
                                      {t("book_for_someone_else")}
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {formValues.booking_for === "someone_else" && (
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
                                        placeholder={tForm("first_name")}
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
                                        placeholder={tForm("last_name")}
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
                                      placeholder={tForm("first_name")}
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
                                      placeholder={tForm("last_name")}
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
                                      }}
                                    >
                                      <SelectTrigger className="bg-white">
                                        <SelectValue
                                          placeholder={tForm("title")}
                                        />
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
                                      placeholder={tForm("email")}
                                      className="w-full"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="phone_number"
                              render={({ field }) => (
                                <FormItem className="lg:w-[45%] w-full">
                                  <FormControl {...field}>
                                    <PhoneInput
                                      defaultCountry="gb"
                                      inputStyle={{
                                        width: "100%",
                                        borderEndEndRadius: "6px",
                                        borderStartEndRadius: "6px",
                                      }}
                                      {...field}
                                      placeholder={tForm("phone_number")}
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
                        {t("addicinal_info")}
                      </h1>
                      <div className="w-full flex flex-col justify-center items-start space-y-5  bg-white2 rounded-xl p-5">
                        <FormField
                          control={form.control}
                          name="notes"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl {...field}>
                                <Textarea
                                  {...field}
                                  placeholder={t("notes_for_the_chauffeur")}
                                  className="w-full bg-white resize-none"
                                  rows={5}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <span className="text-xs text-gray2">
                          {t("include_any_special_requests")}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="space-y-10"
                  >
                    <div className="w-full bg-white2 flex rounded-xl flex-col justify-between items-start p-10 space-y-3">
                      <div className="w-full flex flex-row justify-start items-center gap-10">
                        <span className="text-xs text-gray2">
                          {formValues.from_route}
                        </span>
                        {(checkedParam === "false" || !checked) && (
                          <>
                            <FaArrowRightLong size={20} />
                            <span className="text-xs text-gray2">
                              {formValues.to_route}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex lg:flex-row flex-col justify-center lg:items-center gap-2">
                        <span className="flex flex-row justify-start items-center gap-2 rounded-full p-2 bg-gray1 text-gray2 text-xs">
                          <FaRegCalendarAlt size={15} />
                          {formatDate(formValues.date)}
                        </span>
                        <span className="flex flex-row justify-start items-center gap-2 rounded-full p-2 bg-gray1 text-gray2 text-xs">
                          <MdWatch size={15} />
                          {formValues.hour !== "" &&
                            formatTime(formValues.hour)}
                        </span>
                        {(checkedParam === "true" || checked) && (
                          <span className="flex flex-row justify-start items-center gap-2 rounded-full p-2 bg-gray1 text-gray2 text-xs">
                            <TbClockPin size={15} />
                            {formatHourWithSec(formValues.duration ?? "")}
                          </span>
                        )}
                      </div>
                      {distance &&
                        formValues.estimated_time !== "" &&
                        (!checked || checkedParam === "false") && (
                          <span className="text-sm text-gray2">
                            {t("estimated_arrival")}{" "}
                            {formValues.estimated_time
                              ? formatTime(formValues.estimated_time)
                              : ""}{" "}
                            (GMT) - {distance}
                          </span>
                        )}
                      {/* <div className="flex flex-row justify-between items-center gap-1">
                        <span className="text-sm text-gray2">
                          {t("trip_cost")}
                        </span>
                        <span className="text-gray2 font-bold">
                          {new Intl.NumberFormat("en-GB", {
                            style: "currency",
                            currency: "GBP",
                          }).format(calculateTripAmount() / 100)}
                        </span>
                      </div> */}
                      <Separator />
                      <span className="font-bold text-gray2 text-sm">
                        {`${userValues.title ? userValues.title : ""}. ${
                          userValues.first_name
                        } ${userValues.last_name}`}
                      </span>
                      <span className="text-gray2 text-sm">
                        {
                          vehicles?.find((car) => car.id === formValues.vehicle)
                            ?.car_type
                        }
                      </span>
                      <span className="text-gray2 text-sm">
                        {userValues.email}
                      </span>
                      <span className="text-gray2 text-sm">
                        +{user ? user.phone : formValues.phone_number}
                      </span>
                      {formValues.notes && (
                        <>
                          <Separator />
                          <span className="text-gray2 text-sm">
                            {formValues.notes}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="w-full bg-white2 flex rounded-xl flex-col justify-between items-start p-10 space-y-5">
                      <div className="flex flex-row items-center justify-center text-sm gap-2 text-gray2">
                        <div>
                          <FaRegCheckCircle size={18} />
                        </div>
                        <span>{t("cancel_free_of_chage")}</span>
                      </div>
                      <div className="flex flex-row items-center justify-center text-sm gap-2 text-gray2">
                        <div>
                          <FaRegCheckCircle size={18} />
                        </div>
                        <span>{t("enjoy_15_minutes")}</span>
                      </div>
                      <div className="flex flex-row items-center justify-center text-sm gap-2 text-gray2">
                        <div>
                          <FaRegCheckCircle size={18} />
                        </div>
                        <span>{t("personal_meet")}</span>
                      </div>
                      <div className="flex flex-row items-center justify-center text-sm gap-2 text-gray2">
                        <div>
                          <FaRegCheckCircle size={18} />
                        </div>
                        <span>{t("complimentary_bottled")}</span>
                      </div>

                      <Separator />
                      <div className="flex flex-row items-center justify-between text-sm gap-2 text-gray2">
                        <div>
                          <FaRegCheckCircle size={18} />
                        </div>
                        <span>{t("for_safety_adhere")}</span>
                      </div>
                      <div className="flex flex-row items-center justify-center text-sm gap-2 text-gray2">
                        <div>
                          <FaRegCheckCircle size={18} />
                        </div>
                        <span>{t("vehicle_images")}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* {currentStep === 3 && (
                  <motion.div
                    initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="w-full bg-white2 flex rounded-xl flex-col justify-between items-start p-10 space-y-3">
                      <div className="w-full flex flex-row justify-start items-center gap-10">
                        <span className="text-xs text-gray2">
                          {formValues.from_route}
                        </span>
                        {(checkedParam === "false" || !checked) && (
                          <>
                            <FaArrowRightLong size={20} />
                            <span className="text-xs text-gray2">
                              {formValues.to_route}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex lg:flex-row flex-col justify-center lg:items-center gap-2">
                        <span className="flex flex-row justify-start items-center gap-2 rounded-full p-2 bg-gray1 text-gray2 text-xs">
                          <FaRegCalendarAlt size={15} />
                          {formValues.date && formatDate(formValues.date)}
                        </span>
                        <span className="flex flex-row justify-start items-center gap-2 rounded-full p-2 bg-gray1 text-gray2 text-xs">
                          <MdWatch size={15} />
                          {formValues.hour !== "" &&
                            formatTime(formValues.hour)}
                        </span>
                        {(checkedParam === "true" || checked) && (
                          <span className="flex flex-row justify-start items-center gap-2 rounded-full p-2 bg-gray1 text-gray2 text-xs">
                            <TbClockPin size={15} />
                            {formatHourWithSec(formValues.duration ?? "")}
                          </span>
                        )}
                      </div>
                      {distance &&
                        formValues.estimated_time !== "" &&
                        (!checked || checkedParam === "false") && (
                          <span className="text-sm text-gray2">
                            {t("estimated_arrival")}{" "}
                            {formValues.estimated_time
                              ? formatTime(formValues.estimated_time)
                              : ""}{" "}
                            (GMT) - {distance}
                          </span>
                        )}

                      <div className="flex flex-row justify-between items-center gap-1">
                        <span className="text-sm text-gray2">
                          {t("trip_cost")}
                        </span>
                        <span className="text-gray2 font-bold">
                          {new Intl.NumberFormat("en-GB", {
                            style: "currency",
                            currency: "GBP",
                          }).format(calculateTripAmount() / 100)}
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center mt-10 space-y-5">
                      <h1 className="text-gray2 font-bold text-start w-full">
                        {t("add_credit_card")}
                      </h1>
                      <div className="w-full flex flex-col justify-center items-start space-y-5 bg-white2 rounded-xl p-10 overflow-y-auto">
                        <div className="w-full flex-1 bg-white px-3 rounded-md">
                          <label className="text-xs">
                            {t("card_number")}
                            <CardNumberElement
                              options={{
                                style: {
                                  base: {
                                    color: "#32325d",
                                    fontFamily: "Arial, sans-serif",
                                    fontSize: "16px",
                                    fontSmoothing: "antialiased",
                                    fontWeight: "400",
                                    letterSpacing: "0.025em",
                                    padding: "10px",
                                  },
                                  invalid: {
                                    color: "#fa755a",
                                    iconColor: "#fa755a",
                                  },
                                },
                              }}
                              className="w-full mt-2"
                            />
                          </label>
                        </div>
                        <div className="w-full flex-1 bg-white px-3 rounded-md">
                          <label className="text-xs">
                            {t("expiration_date")}
                            <CardExpiryElement
                              options={{
                                style: {
                                  base: {
                                    backgroundColor: "#fff",
                                    color: "#32325d",
                                    fontFamily: "Arial, sans-serif",
                                    fontSize: "16px",
                                    fontSmoothing: "antialiased",
                                    fontWeight: "400",
                                    letterSpacing: "0.025em",
                                    padding: "10px 12px",
                                  },
                                  invalid: {
                                    color: "#fa755a",
                                    iconColor: "#fa755a",
                                  },
                                },
                              }}
                              className="w-full mt-2"
                            />
                          </label>
                        </div>
                        <div className="w-full flex-1 bg-white px-3 rounded-md">
                          <label className="text-xs">
                            {t("cvc")}
                            <CardCvcElement
                              options={{
                                style: {
                                  base: {
                                    color: "#32325d",
                                    fontFamily: "Arial, sans-serif",
                                    fontSize: "16px",
                                    fontSmoothing: "antialiased",
                                    fontWeight: "400",
                                    letterSpacing: "0.025em",
                                    padding: "10px",
                                  },
                                  invalid: {
                                    color: "#fa755a",
                                    iconColor: "#fa755a",
                                  },
                                },
                              }}
                              className="w-full mt-2"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )} */}
              </div>
              {/* Navigation */}
              <div
                className={`${
                  currentStep === 1 ? "hidden" : "block"
                } mt-8 pt-5`}
              >
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
                  {
                    // currentStep === 3 ? (
                    //   <button
                    //     type="submit"
                    //     disabled={
                    //       !areFieldsFilled() ||
                    //        || !stripe
                    //         || !elements
                    //       loading
                    //     }
                    //     className={`rounded-full bg-white p-3 font-semibold text-sm shadow-sm ring-1 ring-inset ring-black hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-50`}
                    //   >
                    //     {t("complete_reservation")}
                    //   </button>
                    // ) :
                    currentStep === 2 ? (
                      <button
                        // type="button"
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   next();
                        // }}
                        type="submit"
                        onClick={() => console.log(formValues)}
                        disabled={!areFieldsFilled() || loading}
                        className={`rounded-full bg-black py-3 px-4  text-white
                       text-sm shadow-sm ring-1 ring-inset ring-black hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-50`}
                      >
                        {t("complete_reservation")}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log(formValues);
                          next();
                        }}
                        disabled={!areFieldsFilled()}
                        className={`rounded-full bg-white p-3 font-semibold text-sm shadow-sm ring-1 ring-inset ring-black hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-50`}
                      >
                        <FaArrowRight size={20} />
                      </button>
                    )
                  }
                </div>
              </div>
            </form>
          </Form>
          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <LoginForBook />
            </motion.div>
          )}
        </section>
      )}
    </div>
  );
}

export default function BookATrip() {
  return (
    <Suspense fallback={<Loading />}>
      {/* <Elements stripe={stripePromise}> */}
      <BookATripComponent />
      {/* </Elements> */}
    </Suspense>
  );
}
