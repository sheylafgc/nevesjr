import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import BecomePartner from "@/public/BecomePartner.svg";
import { useRouter } from "@/src/i18n/navigation";

interface BeAPartnerProps {
  backgroundImage?: string;
  title?: string;
}

export default function BeAPartner({
  backgroundImage,
  title,
}: BeAPartnerProps) {
  const tButton = useTranslations("Buttons");
  const router = useRouter();

  return (
    <div
      className="w-full h-96 bg-center lg:bg-current bg-cover"
      style={{
        backgroundImage: `url(${
          backgroundImage
            ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${backgroundImage}`
            : BecomePartner
        })`,
      }}
    >
      <div className="w-full h-96 bg-gradient-to-l flex items-center justify-center from-transparent via-gray4 via-80% to-black">
        <div className="w-[90%] lg:w-[80%] flex flex-col gap-4 lg:gap-5 text-left">
          <h1 className="text-2xl lg:text-3xl font-ppMonument text-gray1 leading-s50 lg:leading-s56">
            {title}
          </h1>
          <div className="w-full">
            <Button
              onClick={() => router.push("/Contact/BecomeAPartner")}
              className="lg:w-auto w-full rounded-full px-8 lg:mt-0 mt-5 lg:py-0 py-5 bg-gray2 lg:px-10 hover:bg-gray1 hover:text-black"
            >
              {tButton("see_more")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
