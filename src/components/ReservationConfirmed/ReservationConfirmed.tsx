import { Button } from "../ui/button";
import { CiCircleCheck } from "react-icons/ci";

type ReservationCompletedProps = {
  isCompleted: boolean;
  setIsCompleted: (value: boolean) => void;
};

export default function ReservationCompleted({
  isCompleted,
  setIsCompleted,
}: ReservationCompletedProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center h-[450px] bg-white2 rounded-xl">
      <div className="lg:w-[60%] md-[60%] w-full"></div>
      <CiCircleCheck size={80} className="text-gray2 mb-3" />

      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="font-bold text-gray2">Reservation Confirmed</h1>
        <span className="text-gray2 text-center text-sm">
          Your reservation has been confirmed. <br /> You can view the status of
          your bookings in the user area.
        </span>
        <Button className="w-full rounded-full py-5">See my trips</Button>
        <Button
          onClick={() => setIsCompleted(!isCompleted)}
          className="w-full rounded-full bg-transparent border border-black py-5 text-gray2 hover:text-gray1"
        >
          Book another trip
        </Button>
      </div>
    </div>
  );
}
