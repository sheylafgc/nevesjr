"use client";
import Image from "next/image";
import LogoWhite from "@/brand/logoWhite.svg";
import LogoBlack from "@/brand/logoBlack.svg";
import NavLink from "../Navbar/Navlink";
import Link from "next/link";

import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

interface FooterProps {
  isLogged?: boolean;
}

export default function Footer({ isLogged }: FooterProps) {
  return (
    <footer
      className={`w-full ${
        isLogged ? "lg:h-44 border-t" : " bg-black lg:h-[540px]"
      } flex justify-center items-center`}
    >
      {isLogged ? (
        <div className="lg:w-[80%] w-[90%] h-full flex lg:flex-row lg:py-0 py-16 flex-col justify-around lg:items-center items-start lg:gap-0 gap-10">
          <span className="lg:text-sm text-gray2 order-2">
            Política de privacidade
          </span>
          <span className="lg:text-sm text-gray2 order-3">
            NevesJR - All Rights Reserved - 2024
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
              Trust Neves JR for a journey that blends quality, safety, and
              reliability. With unparalleled service and professionalism, we’re
              here to exceed your expectations every mile. Your satisfaction
              drives us.
            </p>
            <div className="lg:hidden h-[1px] bg-gray1/50 w-full" />
            <div className="flex flex-col lg:gap-1 gap-10">
              <h1 className="font-bold text-gray1">Quick links</h1>
              <div className="flex lg:flex-row flex-col lg:items-center items-start gap-10">
                <NavLink isFooter href="/" title="Home" />
                <NavLink
                  isFooter
                  href="/pages/OurServices"
                  title="Our services"
                />
                <NavLink isFooter href="#" title="About" />
                <NavLink isFooter href="#" title="Contact" />
                <NavLink isFooter href="#" title="SignIn" />
                <NavLink isFooter href="#" title="Blog" />
              </div>
            </div>
            <div className="lg:hidden h-[1px] bg-gray1/50 w-full" />

            <div className="flex flex-col">
              <h1 className="font-bold text-gray1">Company</h1>
              <span className="text-gray1/75 font-light">
                NevesJR Executive Services
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
                <span className="font-light text-gray1">Phones/Whatsapp: </span>
                <div className="flex gap-2">
                  <span className="font-light text-gray1 underline cursor-pointer">
                    +44 7777 141356
                  </span>
                  <span className="font-light text-gray1">|</span>
                  <span className="font-light text-gray1 underline cursor-pointer">
                    +44 7777 141357
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:hidden h-[1px] bg-gray1/50 w-full order-1" />
            {/* Social Media Section */}
            <div className="lg:w-auto w-full gap-2 flex lg:flex-row flex-col items-start lg:items-center order-1 lg:order-first">
              <span className="text-gray1 font-bold lg:mr-3">Follow us</span>
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

            {/* Footer Info */}
            <div className="flex flex-row order-1 lg:order-0">
              <span className="font-light text-gray1">
                NevesJR - All Rights Reserved - 2024
              </span>
            </div>

            {/* Privacy Policy */}
            <div className="hidden lg:flex flex-row lg:order-last">
              <span className="underline font-light text-gray1">
                Privacy policy
              </span>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
