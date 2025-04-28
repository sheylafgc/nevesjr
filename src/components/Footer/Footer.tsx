"use client";
import Image from "next/image";
import LogoWhite from "@/src/brand/logoWhite.svg";
import LogoBlack from "@/src/brand/logoBlack.svg";
import NavLink from "../Navbar/Navlink";
import Link from "next/link";

import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useRouter } from "@/src/i18n/navigation";

interface FooterProps {
  isLogged?: boolean;
}

export default function Footer({ isLogged }: FooterProps) {
  const t = useTranslations("Footer");
  const router = useRouter();

  return (
    <footer
      className={`w-full ${
        isLogged ? "lg:h-44 border-t" : " bg-black lg:h-[540px]"
      } flex justify-center items-center`}
    >
      {isLogged ? (
        <div className="lg:w-[80%] w-[90%] h-full flex lg:flex-row lg:py-0 py-16 flex-col justify-around lg:items-center items-start lg:gap-0 gap-10">
          <button
            onClick={() => router.push("/privacy-policy")}
            className="lg:text-sm text-gray2 order-2"
          >
            {t("privacy_policy")}
          </button>
          <span className="lg:text-sm text-gray2 order-3">
            {t("all_rights_reserved")}
          </span>
          <Image
            width={150}
            height={150}
            src={LogoBlack}
            className="order-1"
            alt="NevesJr Logo"
          />
        </div>
      ) : (
        <div className="lg:w-[80%] w-[90%] h-full justify-evenly flex flex-col lg:py-0 py-16">
          <div className="flex lg:flex-row flex-col justify-between lg:items-center items-start lg:gap-0 gap-10 mb-10">
            <Image src={LogoWhite} alt="NevesJr Logo" />
            <p className="lg:hidden text-gray1 font-light text-xs">
              {t("message")}
            </p>
            <div className="lg:hidden h-[1px] bg-gray1/50 w-full" />
            <div className="flex flex-col lg:gap-1 gap-10">
              <h1 className="font-bold text-gray1">{t("quick_links")}</h1>
              <div className="flex lg:flex-row flex-col lg:items-center items-start gap-10">
                <NavLink isFooter href="/" title={t("nav1")} />
                <NavLink isFooter href="/OurServices" title={t("nav2")} />
                <NavLink isFooter href="/About" title={t("nav3")} />
                <NavLink isFooter href="/Blog" title={t("nav4")} />
                <NavLink isFooter href="/Contact" title={t("nav5")} />
                <NavLink isFooter href="/auth/Login" title={t("nav6")} />
              </div>
            </div>
            <div className="lg:hidden h-[1px] bg-gray1/50 w-full" />

            <div className="flex flex-col">
              <h1 className="font-bold text-gray1">{t("company")}</h1>
              <span className="text-gray1/75 font-light">
                {t("company_name")}
              </span>
            </div>
          </div>

          <div className="flex lg:flex-row flex-col justify-between items-center text-sm lg:my-0 lg:gap-0 gap-10">
            <div className="lg:hidden h-[1px] bg-gray1/50 w-full" />
            {/* WhatsApp Section */}
            <div className="lg:w-auto w-full flex flex-col items-start lg:flex-row lg:items-center gap-2 order-1 lg:order-0">
              <div className="rounded-full bg-gray1 p-2">
                <FaWhatsapp size={18} />
              </div>
              <div className="flex flex-col lg:flex-row gap-2">
                <span className="font-light text-gray1">
                  {t("phones/whatsapp")}
                </span>
                <div className="flex gap-2">
                  <a
                    href="https://wa.me/447777141356"
                    className="font-light text-gray1 underline cursor-pointer"
                  >
                    +44 7777 141356
                  </a>
                  <span className="font-light text-gray1">|</span>
                  <a
                    href="https://wa.me/447777141357"
                    className="font-light text-gray1 underline cursor-pointer"
                  >
                    +44 7777 141357
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:hidden h-[1px] bg-gray1/50 w-full order-1" />
            {/* Social Media Section */}
            <div className="lg:w-auto w-full gap-2 flex lg:flex-row flex-col items-start lg:items-center order-1 lg:order-first">
              <span className="text-gray1 font-bold lg:mr-3">
                {t("follow_us")}
              </span>
              <div className="flex flex-row gap-3">
                <Link href={"#"} className="p-2 bg-gray1 rounded-full">
                  <FaFacebookF size={18} />
                </Link>
                <Link href={"#"} className="p-2 bg-gray1 rounded-full">
                  <FaXTwitter size={18} />
                </Link>
                <Link href={"#"} className="p-2 bg-gray1 rounded-full">
                  <FaInstagram size={18} />
                </Link>
              </div>
            </div>

            <div className="lg:hidden h-[1px] bg-gray1/50 w-full order-1" />

            <div className="flex flex-row order-1 lg:order-0">
              <span className="font-light text-gray1">
                {t("all_rights_reserved")}
              </span>
            </div>

            <div className="hidden lg:flex flex-row lg:order-last">
              <button
                onClick={() => router.push("/privacy-policy")}
                className="underline font-light text-gray1"
              >
                {t("privacy_policy")}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
