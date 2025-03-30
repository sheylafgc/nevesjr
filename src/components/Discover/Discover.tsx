"use client";
import { useRouter } from "@/src/i18n/navigation";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import ChofferImage from "@/public/Choffer.svg";

interface DiscoverProps {
  isInService?: boolean;
  backgroundImage?: string;
  title?: string;
}

export default function Discover({
  isInService,
  backgroundImage,
  title,
}: DiscoverProps) {
  const tButton = useTranslations("Buttons");
  const router = useRouter();

  return isInService ? (
    <div className="w-full h-28 bg-gray4 flex flex-col lg:flex-row justify-between items-center px-6 lg:px-10 py-5 rounded-xl gap-4">
      <h1 className="text-lg lg:text-xl font-ppMonument text-gray1 text-center lg:text-left">
        {title ? title : "Discover the difference with NevesJR"}
      </h1>
      <Button
        onClick={() => router.push("/BookATrip")}
        className="rounded-full px-8 lg:px-10 hover:bg-gray1 hover:text-black"
      >
        {tButton("button_book_now")}
      </Button>
    </div>
  ) : (
    <div
      style={{
        backgroundImage: `url(${
          backgroundImage
            ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${backgroundImage}`
            : ChofferImage.src
        })`,
      }}
      className="w-full h-96 bg-center lg:bg-current bg-cover"
    >
      <div className="w-full h-96 bg-gradient-to-l flex items-center justify-center from-transparent via-gray4 via-80% to-black">
        <div className="w-[90%] lg:w-[80%] flex flex-col gap-4 lg:gap-5 text-left">
          <h1 className="text-2xl lg:text-3xl font-ppMonument text-gray1 leading-s50 lg:leading-s56">
            {title ? title : "Discover the difference with NevesJR"}
          </h1>
          <div className="w-full">
            <Button
              onClick={() => router.push("/BookATrip")}
              className="lg:w-auto w-full rounded-full px-8 lg:px-10 lg:py-0 py-5 hover:bg-gray1 hover:text-black"
            >
              {tButton("button_book_now")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
