import { FaRegCalendarAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdWatch } from "react-icons/md";

export default function TravelTopInfo() {
  return (
    <div className="w-full bg-white2 flex rounded-xl flex-col justify-between items-start p-10 space-y-3">
      <div className="w-full flex flex-row justify-start items-center gap-10">
        <span className="text-xs text-gray2">
          1 Kensington Palace Gardens, <br /> London, W8 4QP
        </span>
        <FaArrowRightLong size={20} />
        <span className="text-xs text-gray2">
          22 Eaton Square, Belgravia, <br /> London SW1W 9DF
        </span>
      </div>
      <div className="w-full flex flex-row justify-start items-center gap-10">
        <span className="flex flex-row justify-start items-center gap-2 rounded-full p-2 bg-gray1 text-gray2 text-xs">
          <FaRegCalendarAlt size={15} />
          Tue. Dec 10, 2024
        </span>
        <span className="flex flex-row justify-start items-center gap-2 rounded-full p-2 bg-gray1 text-gray2 text-xs">
          <MdWatch size={15} />
          Tue. Dec 10, 2024
        </span>
      </div>
      <span className="text-sm text-gray2">
        Estimated Arrival at 04:45 PM (GMT) - 4.4km
      </span>
    </div>
  );
}
