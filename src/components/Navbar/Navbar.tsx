"use client";
import Image from "next/image";
import LogoBlack from "@/src/brand/logoBlack.svg";
import NavLink from "./Navlink";
import { useContext, useState } from "react";
import { FaBars, FaCar, FaChevronDown } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@/src/components/Mtailwind";
import { Button } from "../ui/button";
import { BiColumns } from "react-icons/bi";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AuthContext } from "@/src/context/AuthContext/AuthContext";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { useRouter } from "@/src/i18n/navigation";

export default function Navbar() {
  const t = useTranslations("Header");
  const { user, signOut } = useContext(AuthContext);
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openMobileUserMenu, setOpenMobileUserMenu] = useState(false);

  return (
    <div className="w-full flex items-center justify-center fixed top-0 z-20">
      <div className="flex items-center justify-between w-full lg:w-[80%] bg-gray1 h-24 rounded-b-[16px] px-6 lg:px-9 shadow-md">
        <Link href={"/"}>
          <Image src={LogoBlack} priority alt="logoImage" />
        </Link>

        <div className="hidden lg:flex items-center space-x-10">
          <NavLink href="/" title={t("nav1")} />
          <NavLink href="/OurServices" title={t("nav2")} />
          <NavLink href="/About" title={t("nav3")} />
          <NavLink href="/Blog" title={t("nav4")} />
          <NavLink href="/Contact" title={t("nav5")} />
          <LanguageSelector />
          {user ? (
            <Menu open={openUserMenu} handler={setOpenUserMenu}>
              <MenuHandler>
                <Button className="bg-gray2/10 shadow-none rounded-full hover:bg-gray2/20">
                  <span className="text-gray2">
                    {user.first_name} {user.last_name}
                  </span>
                  <FaChevronDown
                    size={18}
                    className={`text-gray2 transition-transform ${
                      openUserMenu ? "rotate-180" : ""
                    } `}
                  />
                </Button>
              </MenuHandler>
              <MenuList
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <MenuItem
                  onClick={() => router.push("/BookATrip")}
                  className="w-full h-full flex justify-start items-center gap-3"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  <FaCar size={18} className="text-gray2" />
                  {t("book_a_trip")}
                </MenuItem>
                <MenuItem
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  onClick={() => router.push("/Internal")}
                  className="flex justify-start items-center gap-3"
                >
                  <BiColumns size={18} className="text-gray2" />
                  {t("my_trips")}
                </MenuItem>
                <hr className="my-2 border-blue-gray-50" />
                <MenuItem
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  onClick={() => signOut()}
                  className="flex justify-start items-center gap-3"
                >
                  <PiSignOutBold size={18} className="text-gray2" />
                  {t("logout")}
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <NavLink href="/auth/Login" title={t("nav6")} />
          )}
        </div>

        <button
          className="lg:hidden text-gray2 text-2xl"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? (
            <FaTimes size={25} className="text-black" />
          ) : (
            <FaBars size={25} className="text-black" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute flex flex-col justify-center bg-gray1 w-full h-[600px] p-5 space-y-10 shadow-lg top-20 mt-0 z-10">
          <NavLink
            closeMobile={() => {
              setIsMobileMenuOpen(false);
              router.push("/");
            }}
            href="/"
            title={t("nav1")}
          />
          <NavLink
            closeMobile={() => {
              setIsMobileMenuOpen(false);
              router.push("/OurServices");
            }}
            href="/OurServices"
            title={t("nav2")}
          />
          <NavLink
            closeMobile={() => {
              setIsMobileMenuOpen(false);
              router.push("/About");
            }}
            href="/About"
            title={t("nav3")}
          />
          <NavLink
            closeMobile={() => {
              setIsMobileMenuOpen(false);
              router.push("/Blog");
            }}
            href="/Blog"
            title={t("nav4")}
          />
          <NavLink
            closeMobile={() => {
              setIsMobileMenuOpen(false);
              router.push("/Contact");
            }}
            href="/Contact"
            title={t("nav5")}
          />
          <div className="flex justify-center items-center space-x-3">
            <LanguageSelector />
          </div>
          {user ? (
            <div className="flex justify-center items-center">
              <Menu open={openMobileUserMenu} handler={setOpenMobileUserMenu}>
                <MenuHandler>
                  <Button className="bg-gray2/10 shadow-none rounded-full hover:bg-gray2/20">
                    <span className="text-gray2">
                      {user.first_name} {user.last_name}
                    </span>
                    <FaChevronDown
                      size={18}
                      className={`text-gray2 transition-transform ${
                        openMobileUserMenu ? "rotate-180" : ""
                      } `}
                    />
                  </Button>
                </MenuHandler>
                <MenuList
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  <MenuItem
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push("/BookATrip");
                    }}
                    className="w-full h-full flex justify-start items-center gap-3"
                  >
                    <FaCar size={18} className="text-gray2" />
                    {t("book_a_trip")}
                  </MenuItem>
                  <MenuItem
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push("/Internal");
                    }}
                    className="flex justify-start items-center gap-3"
                  >
                    <BiColumns size={18} className="text-gray2" />
                    {t("my_trips")}
                  </MenuItem>
                  <hr className="my-2 border-blue-gray-50" />
                  <MenuItem
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      signOut();
                    }}
                    className="flex justify-start items-center gap-3"
                  >
                    <PiSignOutBold size={18} className="text-gray2" />
                    {t("logout")}
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          ) : (
            <NavLink
              closeMobile={() => {
                setIsMobileMenuOpen(false);
                router.push("/auth/Login");
              }}
              href="/auth/Login"
              title={t("nav6")}
            />
          )}
        </div>
      )}
    </div>
  );
}
