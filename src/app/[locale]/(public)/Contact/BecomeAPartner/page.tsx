/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  BecomeAPartnerSchema,
  BecomeAPartnerSchemaType,
} from "./BecomeAPartnerSchema";
import { useEffect, useState } from "react";
import { api } from "@/src/api/api";
import { useLocale, useTranslations } from "next-intl";
import SmileyWoman from "@/public/SmileyBusinessWomanCar.svg";
import { Bounce, toast } from "react-toastify";
import { PhoneInput } from "react-international-phone";

interface BePartnerPageDataType {
  section1_banner: string;
  section1_banner_title: string;
  section1_banner_description: string;
  section1_form_title: string;
  section1_form_description: string;
}

export default function Contact() {
  const t = useTranslations("BePartner");
  const tToast = useTranslations("Toasts");
  const locale = useLocale();
  const [pageData, setPageData] = useState<BePartnerPageDataType | null>(null);
  const form = useForm<BecomeAPartnerSchemaType>({
    resolver: zodResolver(BecomeAPartnerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      car_model: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get<BePartnerPageDataType>(
        `/content/be-a-partner-page/?lang=${locale}`
      );
      console.log(data);
      setPageData(data);
    };
    fetchData();
  }, []);

  async function onSubmit(data: BecomeAPartnerSchemaType) {
    try {
      await api.post("/be-partner/create", data);
      toast.success(tToast("your_data_was_sent"), {
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
    } catch (error) {
      console.error(error);
      toast.error(tToast("an_error_occurred"), {
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
      form.reset();
    }
  }

  return (
    <div className="w-full flex flex-col justify-center items-center bg-gradient-to-l from-black to-gray4">
      <div className="lg:w-[80%] w-[90%] lg:h-[1000px] flex flex-col lg:flex-row items-center py-40 gap-4">
        <div className="flex-[6] h-full flex flex-col justify-center items-center">
          <div
            style={{
              backgroundImage: `url(${
                pageData?.section1_banner
                  ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${pageData.section1_banner}`
                  : SmileyWoman
              })`,
            }}
            className="bg-smileyWoman rounded-xl w-full h-[600px] lg:h-full bg-cover bg-center"
          >
            <div className="bg-gradient-to-tr via-60% via-transparent from-black to-transparent rounded-xl w-full h-full flex flex-col justify-end items-start p-10">
              <h1 className="font-ppMonument text-3xl text-white leading-s50 whitespace-pre-line">
                {pageData?.section1_banner_title}
              </h1>
              <p className="font-light text-xs text-white mt-4 whitespace-pre-line">
                {pageData?.section1_banner_description}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-[4] w-full h-full bg-gray4 rounded-xl gap-10 lg:p-10 p-6 flex flex-col justify-center">
          <h1 className="font-ppMonument text-3xl text-white leading-s50 whitespace-pre-line">
            {pageData?.section1_form_title}
          </h1>
          <span className="text-xs text-white font-light whitespace-pre-line">
            {pageData?.section1_form_description}
          </span>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        variant="underlined"
                        placeholder={t("name_input")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col lg:flex-row gap-8 lg:justify-between w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-1/2 lg:mr-2">
                      <FormControl>
                        <Input
                          variant="underlined"
                          placeholder={t("email_input")}
                          {...field}
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
                    <FormItem className="w-full lg:w-1/2 lg:ml-2">
                      <FormControl>
                        <PhoneInput
                          defaultCountry="gb"
                          inputStyle={{
                            width: "100%",
                            backgroundColor: "transparent",
                            border: "none",
                            borderBottom: "1px solid white",
                            borderRadius: "0",
                            color: "white",
                          }}
                          countrySelectorStyleProps={{
                            buttonStyle: {
                              backgroundColor: "transparent",
                              border: "none",
                              borderBottom: "1px solid white",
                              borderRadius: "0",
                              color: "white",
                            },
                          }}
                          {...field}
                          placeholder={t("phone_input")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="car_model"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        variant="underlined"
                        placeholder={t("car_model_input")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={!form.formState.isValid}
                className="rounded-full w-full"
                type="submit"
              >
                {t("button_submit")}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
