"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterLayout() {
  const pathname = usePathname();
  const isNotAuthPath = !pathname.includes("/auth");
  const pathsToCheck = ["/BookATrip", "/Internal"];
  const isFooterLoggedNeeded = pathsToCheck.some((path) =>
    pathname.includes(path)
  );
  const FooterComponent =
    isNotAuthPath && (isFooterLoggedNeeded ? <Footer isLogged /> : <Footer />);

  return FooterComponent;
}
