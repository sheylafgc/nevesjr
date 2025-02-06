"use client";
import Image from "next/image";
import WomanTravelling from "../../../../../public/WomanTravelling.svg";
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

export default function Contact() {
  const form = useForm<ContactSchemaType>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    mode: "onChange",
  });

  function onSubmit(data: ContactSchemaType) {
    console.log(data);
  }

  return (
    <div className="w-full flex flex-col justify-center items-center bg-gradient-to-b from-gray4 to-black lg:bg-gradient-to-l lg:from-black lg:to-gray4">
      <div className="lg:w-[80%] w-[90%] lg:h-screen flex flex-col lg:flex-row justify-center items-center py-40 gap-4">
        <div className="hidden flex-[6] h-full lg:flex flex-col justify-center items-center">
          <Image
            width={700}
            height={600}
            unoptimized
            priority
            src={WomanTravelling}
            alt="Woman travelling"
            className="rounded-xl w-full h-full object-cover"
          />
          <div className="w-full flex flex-row justify-between gap-4 items-center mt-4">
            <div className="w-[140px] h-[120px] bg-gray4 rounded-xl flex flex-col items-center justify-center gap-2">
              <div className="rounded-full bg-gray1 p-2">
                <FaWhatsapp size={18} />
              </div>
              <span className="text-white text-xs">Phone/whatsapp</span>
              <div className="w-[80%] h-[1px] bg-gradient-to-r from-gray4 via-gray1 to-gray4" />
              <span className="text-white text-xs">+44 7777 141356</span>
            </div>
            <div className="w-[140px] h-[120px] bg-gray4 rounded-xl flex flex-col items-center justify-center gap-2">
              <div className="rounded-full bg-gray1 p-2">
                <FaWhatsapp size={18} />
              </div>
              <span className="text-white text-xs">Phone/whatsapp</span>
              <div className="w-[80%] h-[1px] bg-gradient-to-r from-gray4 via-gray1 to-gray4" />
              <span className="text-white text-xs">+44 7777 141356</span>
            </div>
            <div className="w-[140px] h-[120px] bg-gray4 rounded-xl flex flex-col items-center justify-center gap-2">
              <div className="rounded-full bg-gray1 p-2">
                <MdOutlineEmail size={18} />
              </div>
              <span className="text-white text-xs">Email</span>
              <div className="w-[80%] h-[1px] bg-gradient-to-r from-gray4 via-gray1 to-gray4" />
              <span className="text-white text-xs">contact@nevesjr.com</span>
            </div>
            <div className="w-[140px] h-[120px] bg-gray4 rounded-xl flex flex-col items-center justify-center gap-2">
              <div className="rounded-full bg-gray1 p-2">
                <FaPlus size={18} />
              </div>
              <span className="text-white text-xs">Follow us</span>
              <div className="w-[80%] h-[1px] bg-gradient-to-r from-gray4 via-gray1 to-gray4" />
              <div className="flex flex-row gap-2">
                <Link href={"#"} className="p-1 bg-gray1 rounded-full">
                  <FaFacebookF size={12} />
                </Link>
                <Link href={"#"} className="p-1 bg-gray1 rounded-full">
                  <FaXTwitter size={12} />
                </Link>
                <Link href={"#"} className="p-1 bg-gray1 rounded-full">
                  <FaInstagram size={12} />
                </Link>
                <Link href={"#"} className="p-1 bg-gray1 rounded-full">
                  <FaWhatsapp size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Image
          width={700}
          height={600}
          unoptimized
          priority
          src={WomanTravelling}
          alt="Woman travelling"
          className="w-full rounded-xl lg:hidden block h-full object-cover"
        />

        <div className="lg:flex-[4] h-full bg-gray4 rounded-xl gap-10 p-14 flex flex-col justify-center">
          <h1 className="font-ppMonument text-3xl text-gray1 leading-s50">
            Have a <br /> sugestion or <br /> a problem?
          </h1>
          <span className="text-xs text-gray1 font-light">
            We&apos;re here to help. Send us a message and we&apos;ll <br />{" "}
            respond within 24hours.
          </span>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        variant="underlined"
                        placeholder="Name"
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
                        placeholder="Email"
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
                        placeholder="Message"
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
                Submit
              </Button>
            </form>
          </Form>
        </div>

        <div className="lg:hidden w-full grid grid-cols-2 gap-4 mt-4">
          <div className="w-full h-[150px] bg-gray4 rounded-xl flex flex-col items-center justify-center gap-2">
            <div className="rounded-full bg-gray1 p-2">
              <FaWhatsapp size={18} />
            </div>
            <span className="text-white text-xs">Phone/whatsapp</span>
            <div className="w-[80%] h-[1px] bg-gradient-to-r from-gray4 via-gray1 to-gray4" />
            <span className="text-white text-xs">+44 7777 141356</span>
          </div>
          <div className="w-full h-[150px] bg-gray4 rounded-xl flex flex-col items-center justify-center gap-2">
            <div className="rounded-full bg-gray1 p-2">
              <FaWhatsapp size={18} />
            </div>
            <span className="text-white text-xs">Phone/whatsapp</span>
            <div className="w-[80%] h-[1px] bg-gradient-to-r from-gray4 via-gray1 to-gray4" />
            <span className="text-white text-xs">+44 7777 141356</span>
          </div>
          <div className="w-full h-[150px] bg-gray4 rounded-xl flex flex-col items-center justify-center gap-2">
            <div className="rounded-full bg-gray1 p-2">
              <MdOutlineEmail size={18} />
            </div>
            <span className="text-white text-xs">Email</span>
            <div className="w-[80%] h-[1px] bg-gradient-to-r from-gray4 via-gray1 to-gray4" />
            <span className="text-white text-xs">contact@nevesjr.com</span>
          </div>
          <div className="w-full h-[150px] bg-gray4 rounded-xl flex flex-col items-center justify-center gap-2">
            <div className="rounded-full bg-gray1 p-2">
              <FaPlus size={18} />
            </div>
            <span className="text-white text-xs">Follow us</span>
            <div className="w-[80%] h-[1px] bg-gradient-to-r from-gray4 via-gray1 to-gray4" />
            <div className="flex flex-row gap-2">
              <Link href={"#"} className="p-2 bg-gray1 rounded-full">
                <FaFacebookF size={12} />
              </Link>
              <Link href={"#"} className="p-2 bg-gray1 rounded-full">
                <FaXTwitter size={12} />
              </Link>
              <Link href={"#"} className="p-2 bg-gray1 rounded-full">
                <FaInstagram size={12} />
              </Link>
              <Link href={"#"} className="p-2 bg-gray1 rounded-full">
                <FaWhatsapp size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <BeAPartner />
    </div>
  );
}
