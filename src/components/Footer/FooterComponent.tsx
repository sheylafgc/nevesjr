"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterLayout() {
  const pathname = usePathname();
  const pathsToCheck = ["/pages/BookATrip", "/pages/Internal"];
  const isFooterLoggedNeeded = pathsToCheck.some((path) =>
    pathname.includes(path)
  );
  const FooterComponent = isFooterLoggedNeeded ? (
    <Footer isLogged />
  ) : (
    <Footer />
  );
  return FooterComponent;
}
