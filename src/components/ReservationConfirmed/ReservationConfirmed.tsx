import Link from "next/link";
import { Button } from "../ui/button";
import { CiCircleCheck } from "react-icons/ci";
import { useTranslations } from "next-intl";

type ReservationCompletedProps = {
  onClick: () => void;
};

export default function ReservationCompleted({
  onClick,
}: ReservationCompletedProps) {
  const t = useTranslations("Book_a_trip");

  return (
    <div className="w-full flex flex-col justify-center items-center h-[450px] bg-white2 rounded-xl">
      <CiCircleCheck size={80} className="text-gray2 lg:mb-0 mb-3" />
      <div className="flex flex-col justify-center items-center gap-3 lg:p-10 p-5">
        <h1 className="font-bold text-gray2">{t("reservation_confirmed")}</h1>
        <span className="text-gray2 text-center text-sm">
          {t("reservation_card_detail")}
        </span>
        <Link
          href={"/Internal"}
          className="w-full rounded-full py-3 text-white hover:opacity-85 text-center text-sm bg-black"
        >
          {t("see_my_trips")}
        </Link>
        <Button
          onClick={onClick}
          className="w-full rounded-full bg-transparent border border-black py-5 text-gray2 hover:text-gray1"
        >
          {t("book_another_trip")}
        </Button>
      </div>
    </div>
  );
}
