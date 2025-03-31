/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import WomanTravelling from "@/public/WomanTravelling.svg";
import { FaFacebookF, FaInstagram, FaPlus, FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import BeAPartner from "@/components/BeAPartner/BeAPartner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ContactSchema, ContactSchemaType } from "./ContactSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { api } from "@/src/api/api";
import {
  getSocialMedia,
  SocialMediaType,
} from "@/src/domain/Content/SociaMedia";
import { Bounce, toast } from "react-toastify";

interface ContactPageDataType {
  id: number;
  section1_form_title: string;
  section1_form_description: string;
  section2_banner_title: string;
  section1_banner: string;
  section2_banner: string;
  section1_social_media: {
    email: string;
    facebook: string;
    instagram: string;
    phone_whatsapp1: string;
    x: string;
  };
}

export default function Contact() {
  const t = useTranslations("Contact");
  const tToast = useTranslations("Toasts");
  const locale = useLocale();
  const [pageData, setPageData] = useState<ContactPageDataType | null>(null);
  const [socialMedia, setSocialMedia] = useState<SocialMediaType[] | null>(
    null
  );
  const whatsapp = socialMedia ? socialMedia[0] : null;

  const email = socialMedia?.find(
    (media) => media.label.toLowerCase() === "email"
  );

  const facebook = socialMedia?.find(
    (media) => media.label.toLowerCase() === "facebook"
  );

  const instagram = socialMedia?.find(
    (media) => media.label.toLowerCase() === "instagram"
  );
  const form = useForm<ContactSchemaType>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get<ContactPageDataType>(
        `/content/contact-page/?lang=${locale}`
      );
      console.log(data);
      setPageData(data);
    };

    const fetchSocialMedia = async () => {
      const data = await getSocialMedia({ locale });
      console.log(data);
      if (data) {
        setSocialMedia(data);
      }
    };
    fetchSocialMedia();
    fetchData();
  }, []);

  async function onSubmit(data: ContactSchemaType) {
    try {
      await api.post("/contact/create", data);
      toast.success(tToast("feedback_submitted"), {
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
      console.log(error);
    } finally {
      form.reset();
    }
  }

  return (
    <div className="w-full flex flex-col justify-center items-center bg-gradient-to-b from-gray4 to-black lg:bg-gradient-to-l lg:from-black lg:to-gray4">
      <div className="lg:w-[80%] w-[90%] flex flex-col lg:flex-row justify-between items-center py-40 gap-4">
        <div className="flex-[6] h-full w-full lg:flex flex-col justify-between items-center hidden">
          <div
            className="w-full h-[500px] rounded-xl bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                pageData?.section1_banner
                  ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${pageData.section1_banner}`
                  : WomanTravelling
              })`,
            }}
          />

          <div className="w-full flex flex-row justify-between gap-4 items-center mt-4">
            <a
              href={`https://wa.me/${whatsapp?.value}`}
              className="w-[140px] h-[120px] bg-gray4 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer no-underline"
            >
              <div className="rounded-full bg-gray1 p-2">
                <FaWhatsapp size={18} />
              </div>
              <span className="text-white text-xs">Phone/WhatsApp</span>
              <div className="w-[80%] h-[1px] bg-gradient-to-r from-gray4 via-gray1 to-gray4" />
              <span className="text-white text-xs">+44 7777 141356</span>
            </a>
            <a
              href={`https://wa.me/${whatsapp?.value}`}
              className="w-[140px] h-[120px] bg-gray4 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer no-underline"
            >
              <div className="rounded-full bg-gray1 p-2">
                <FaWhatsapp size={18} />
              </div>
              <span className="text-white text-xs">Phone/WhatsApp</span>
              <div className="w-[80%] h-[1px] bg-gradient-to-r from-gray4 via-gray1 to-gray4" />
              <span className="text-white text-xs">+44 7777 141357</span>
            </a>
            <a
              href={`mailto:${email?.value}`}
              className="w-[140px] h-[120px] bg-gray4 rounded-xl flex flex-col items-center justify-center gap-2 no-underline"
            >
              <div className="rounded-full bg-gray1 p-2">
                <MdOutlineEmail size={18} />
              </div>
              <span className="text-white text-xs">Email</span>
              <div className="w-[80%] h-[1px] bg-gradient-to-r from-gray4 via-gray1 to-gray4" />
              <span className="text-white text-xs">contact@nevesjr.com</span>
            </a>
            <div className="w-[140px] h-[120px] bg-gray4 rounded-xl flex flex-col items-center justify-center gap-2">
              <div className="rounded-full bg-gray1 p-2">
                <FaPlus size={18} />
              </div>
              <span className="text-white text-xs">Follow us</span>
              <div className="w-[80%] h-[1px] bg-gradient-to-r from-gray4 via-gray1 to-gray4" />
              <div className="flex flex-row gap-2">
                <Link
                  href={`${facebook?.value}`}
                  className="p-1 bg-gray1 rounded-full"
                >
                  <FaFacebookF size={12} />
                </Link>
                <Link
                  href={`${instagram?.value}`}
                  className="p-1 bg-gray1 rounded-full"
                >
                  <FaXTwitter size={12} />
                </Link>
                <Link
                  href={`${instagram?.value}`}
                  className="p-1 bg-gray1 rounded-full"
                >
                  <FaInstagram size={12} />
                </Link>
                <Link
                  href={`https://wa.me/${whatsapp?.value}`}
                  className="p-1 bg-gray1 rounded-full"
                >
                  <FaWhatsapp size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-full h-[500px] rounded-xl lg:hidden block bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              pageData?.section1_banner
                ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${pageData.section1_banner}`
                : WomanTravelling
            })`,
          }}
        />

        <div className="lg:flex-[4] bg-gray4 rounded-xl gap-10 lg:p-10 p-6 w-full h-[635] flex flex-col justify-center items-start">
          <h1 className="font-ppMonument text-3xl text-gray1 leading-s50">
            {pageData?.section1_form_title}
          </h1>
          <span className="text-xs text-gray1 font-light">
            {pageData?.section1_form_description}
          </span>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-8 w-full"
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
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
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        variant="underlined"
                        placeholder={t("message_input")}
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

        <div className="lg:hidden w-full grid grid-cols-2 gap-4 mt-4">
          <a
            href={`https://wa.me/${whatsapp?.value}`}
            className="w-full h-[150px] bg-gray4 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer no-underline"
          >
            <div className="rounded-full bg-gray1 p-2">
              <FaWhatsapp size={18} />
            </div>
            <span className="text-white text-xs">Phone/WhatsApp</span>
            <div className="w-[80%] h-[1px] bg-gradient-to-r from-gray4 via-gray1 to-gray4" />
            <span className="text-white text-xs">+44 7777 141356</span>
          </a>
          <a
            href={`https://wa.me/${whatsapp?.value}`}
            className="w-full h-[150px] bg-gray4 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer no-underline"
          >
            <div className="rounded-full bg-gray1 p-2">
              <FaWhatsapp size={18} />
            </div>
            <span className="text-white text-xs">Phone/WhatsApp</span>
            <div className="w-[80%] h-[1px] bg-gradient-to-r from-gray4 via-gray1 to-gray4" />
            <span className="text-white text-xs">+44 7777 141356</span>
          </a>
          <a
            href={`mailto:${email?.value}`}
            className="w-full h-[150px] bg-gray4 rounded-xl flex flex-col items-center justify-center gap-2 no-underline"
          >
            <div className="rounded-full bg-gray1 p-2">
              <MdOutlineEmail size={18} />
            </div>
            <span className="text-white text-xs">Email</span>
            <div className="w-[80%] h-[1px] bg-gradient-to-r from-gray4 via-gray1 to-gray4" />
            <span className="text-white text-xs">contact@nevesjr.com</span>
          </a>
          <div className="w-full h-[150px] bg-gray4 rounded-xl flex flex-col items-center justify-center gap-2">
            <div className="rounded-full bg-gray1 p-2">
              <FaPlus size={18} />
            </div>
            <span className="text-white text-xs">Follow us</span>
            <div className="w-[80%] h-[1px] bg-gradient-to-r from-gray4 via-gray1 to-gray4" />
            <div className="flex flex-row gap-2">
              <Link
                href={`${facebook?.value}`}
                className="p-2 bg-gray1 rounded-full"
              >
                <FaFacebookF size={15} />
              </Link>
              <Link
                href={`${instagram?.value}`}
                className="p-2 bg-gray1 rounded-full"
              >
                <FaXTwitter size={15} />
              </Link>
              <Link
                href={`${instagram?.value}`}
                className="p-2 bg-gray1 rounded-full"
              >
                <FaInstagram size={15} />
              </Link>
              <Link
                href={`https://wa.me/${whatsapp?.value}`}
                className="p-2 bg-gray1 rounded-full"
              >
                <FaWhatsapp size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <BeAPartner
        backgroundImage={pageData?.section2_banner}
        title={pageData?.section2_banner_title}
      />
    </div>
  );
}
