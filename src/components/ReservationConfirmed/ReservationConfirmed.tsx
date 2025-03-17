import Link from "next/link";
import { Button } from "../ui/button";
import { CiCircleCheck } from "react-icons/ci";

type ReservationCompletedProps = {
  onClick: () => void;
};

export default function ReservationCompleted({
  onClick,
}: ReservationCompletedProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center h-[450px] bg-white2 rounded-xl">
      <CiCircleCheck size={80} className="text-gray2 mb-3" />
      <div className="flex flex-col justify-center items-center gap-3 lg:p-0 p-5">
        <h1 className="font-bold text-gray2">Reservation Confirmed</h1>
        <span className="text-gray2 text-center text-sm">
          Your reservation has been confirmed. <br /> You can view the status of
          your bookings in the user area.
        </span>
        <Link
          href={"/Internal"}
          className="w-full rounded-full py-3 text-white hover:opacity-85 text-center text-sm bg-black"
        >
          See my trips
        </Link>
        <Button
          onClick={onClick}
          className="w-full rounded-full bg-transparent border border-black py-5 text-gray2 hover:text-gray1"
        >
          Book another trip
        </Button>
      </div>
    </div>
  );
}
