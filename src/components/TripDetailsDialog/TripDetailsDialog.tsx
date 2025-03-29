"use client";

import { BookingProps } from "@/src/domain/Bookings/Bookings";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdWatch } from "react-icons/md";
import { TbClockPin } from "react-icons/tb";
import { Separator } from "../ui/separator";
import { formatDate, formatHourWithSec, formatTime } from "@/utils/formatTime";
import { useQuery } from "@tanstack/react-query";
import { getVehicles } from "@/src/domain/Vehicles/Vehicles";
import { Skeleton } from "../ui/skeleton";
import { useLocale, useTranslations } from "next-intl";

type CancelTripDialogProps = {
  booking: BookingProps;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export default function TripDetailsDialog({
  booking,
  isOpen,
  onOpenChange,
}: CancelTripDialogProps) {
  const t = useTranslations("InternalPage");
  const tButton = useTranslations("Buttons");
  const tBook = useTranslations("Book_a_trip");
  const locale = useLocale();

  const { data: vehicles, isFetching: isFetchingVehicles } = useQuery({
    queryKey: ["getVehicles", locale],
    queryFn: async () => {
      const data = await getVehicles({ locale });
      return data;
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("trip_details")}</DialogTitle>
          <DialogDescription>{t("trip_card_details")}</DialogDescription>
        </DialogHeader>
        <div className="w-full bg-white2 flex rounded-xl flex-col justify-between items-start p-10 space-y-3">
          <div className="w-full flex flex-row justify-start items-center gap-10">
            <span className="text-xs text-gray2">{booking.from_route}</span>
            {booking.to_route !== "" && (
              <>
                <FaArrowRightLong size={20} />
                <span className="text-xs text-gray2">{booking.to_route}</span>
              </>
            )}
          </div>
          <div className="flex lg:flex-row flex-col justify-center lg:items-center gap-2">
            <span className="flex flex-row justify-start items-center gap-2 rounded-full p-2 bg-gray1 text-gray2 text-xs">
              <FaRegCalendarAlt size={15} />
              {formatDate(booking.date)}
            </span>
            <span className="flex flex-row justify-start items-center gap-2 rounded-full p-2 bg-gray1 text-gray2 text-xs">
              <MdWatch size={15} />
              {booking.hour !== "" && formatTime(booking.hour)}
            </span>

            {booking.duration !== "00:00:00" && (
              <span className="flex flex-row justify-start items-center gap-2 rounded-full p-2 bg-gray1 text-gray2 text-xs">
                <TbClockPin size={15} />
                {formatHourWithSec(booking.duration)}
              </span>
            )}
          </div>

          {booking.estimated_time !== "0.0" && booking.estimated_time && (
            <span className="text-sm text-gray2">
              {tBook("estimated_arrival")}{" "}
              {booking.estimated_time ? formatTime(booking.estimated_time) : ""}{" "}
              (GMT) - {booking.distance_km.toFixed(1)} km
            </span>
          )}
          <Separator />
          <span className="font-bold text-gray2 text-sm">
            {`${booking.title ? booking.title : ""}. ${booking.first_name} ${
              booking.last_name
            }`}
          </span>
          {isFetchingVehicles ? (
            <Skeleton />
          ) : (
            <span className="text-gray2 text-sm">
              {vehicles?.find((car) => car.id === booking.vehicle)?.car_type}
            </span>
          )}

          <span className="text-gray2 text-sm">{booking.email}</span>
          <span className="text-gray2 text-sm">+{booking.phone_number}</span>
          {booking.notes && (
            <>
              <Separator />
              <span className="font-bold text-gray2 text-sm">{t("notes")}</span>
              <span className="text-gray2 text-sm"> {booking.notes}</span>
            </>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {tButton("close")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
