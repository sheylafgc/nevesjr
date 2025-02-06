"use client";
import Image from "next/image";
import LogoBlack from "@/brand/logoBlack.svg";
import NavLink from "./Navlink";
import { useState } from "react";
import { FaBars, FaChevronDown, FaRegUser } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FaGlobe } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { Menu, MenuHandler, MenuList, MenuItem } from "@/components/Mtailwind";
import { Button } from "../ui/button";
import { BiColumns } from "react-icons/bi";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [language, setLanguage] = useState("en");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openMobileUserMenu, setOpenMobileUserMenu] = useState(false);
  const router = useRouter();
  const user = true;

  return (
    <div className="w-full bg-red flex items-center justify-center fixed top-0 z-20">
      <div className="flex items-center justify-between w-full lg:w-[80%] bg-gray1 h-24 rounded-b-[16px] px-6 lg:px-9 shadow-md">
        {/* Logo */}
        <Image src={LogoBlack} alt="logoImage" priority />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-10">
          <NavLink href="/" title="Home" />
          <NavLink href="/pages/OurServices" title="Our services" />
          <NavLink href="/pages/About" title="About" />
          <NavLink href="/pages/Blog" title="Blog" />
          <NavLink href="/pages/Contact" title="Contact" />
          <div className="flex items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-transparent shadow-none hover:bg-transparent">
                  <FaGlobe size={18} className="text-gray2" />
                  <span className="text-gray2">{language}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={language}
                  onValueChange={setLanguage}
                >
                  <DropdownMenuRadioItem value="pt">
                    Portuguese
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="en">
                    English
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="es">
                    Spanish
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {user ? (
            <Menu open={openUserMenu} handler={setOpenUserMenu}>
              <MenuHandler>
                <Button className="bg-gray2/10 shadow-none rounded-full hover:bg-gray2/20">
                  <span className="text-gray2">Edward Harrington</span>
                  <FaChevronDown
                    size={18}
                    className={`text-gray2 transition-transform ${
                      openUserMenu ? "rotate-180" : ""
                    } `}
                  />
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem
                  onClick={() => router.push("/pages/BookATrip")}
                  className="w-full h-full flex justify-start items-center gap-3"
                >
                  <FaRegUser size={18} className="text-gray2" />
                  Account
                </MenuItem>
                <MenuItem
                  onClick={() => router.push("/pages/Internal")}
                  className="flex justify-start items-center gap-3"
                >
                  <BiColumns size={18} className="text-gray2" />
                  My trips
                </MenuItem>
                <hr className="my-2 border-blue-gray-50" />
                <MenuItem className="flex justify-start items-center gap-3">
                  <PiSignOutBold size={18} className="text-gray2" />
                  Log out
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <NavLink href="/auth/Login" title="Sign in" />
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

      {/* Mobile Navigation (Below Navbar when open) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute flex flex-col justify-center bg-gray1 w-full h-[600px] p-5 space-y-10 shadow-lg top-20 mt-0 z-10">
          <NavLink href="/" title="Home" />
          <NavLink href="/pages/OurServices" title="Our services" />
          <NavLink href="/pages/About" title="About" />
          <NavLink href="/pages/Blog" title="Blog" />
          <NavLink href="/pages/Contact" title="Contact" />
          <div className="flex justify-center items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-transparent shadow-none hover:bg-transparent">
                  <FaGlobe size={18} className="text-gray2" />
                  <span className="text-gray2">{language}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={language}
                  onValueChange={setLanguage}
                >
                  <DropdownMenuRadioItem value="pt">
                    Portuguese
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="en">
                    English
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="es">
                    Spanish
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {user ? (
            <div className="flex justify-center items-center">
              <Menu open={openMobileUserMenu} handler={setOpenMobileUserMenu}>
                <MenuHandler>
                  <Button className="bg-gray2/10 shadow-none rounded-full hover:bg-gray2/20">
                    <span className="text-gray2">Edward Harrington</span>
                    <FaChevronDown
                      size={18}
                      className={`text-gray2 transition-transform ${
                        openMobileUserMenu ? "rotate-180" : ""
                      } `}
                    />
                  </Button>
                </MenuHandler>
                <MenuList>
                  <MenuItem
                    onClick={() => router.push("/pages/BookATrip")}
                    className="w-full h-full flex justify-start items-center gap-3"
                  >
                    <FaRegUser size={18} className="text-gray2" />
                    Account
                  </MenuItem>
                  <MenuItem
                    onClick={() => router.push("/pages/Internal")}
                    className="flex justify-start items-center gap-3"
                  >
                    <BiColumns size={18} className="text-gray2" />
                    My trips
                  </MenuItem>
                  <hr className="my-2 border-blue-gray-50" />
                  <MenuItem className="flex justify-start items-center gap-3">
                    <PiSignOutBold size={18} className="text-gray2" />
                    Log out
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          ) : (
            <NavLink href="/auth/Login" title="Sign in" />
          )}
        </div>
      )}
    </div>
  );
}
