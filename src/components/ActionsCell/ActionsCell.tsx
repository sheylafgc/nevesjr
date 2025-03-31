"use client";

import { useState } from "react";
import CancelTripDialog from "../CancelTripDialog/CancelTripDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Info, MoreHorizontal, XCircle } from "lucide-react";
import { BookingProps } from "@/src/domain/Bookings/Bookings";
import TripDetailsDialog from "../TripDetailsDialog/TripDetailsDialog";
import { useTranslations } from "next-intl";

interface ActionCellProps {
  booking: BookingProps;
}

export default function ActionsCell({ booking }: ActionCellProps) {
  const t = useTranslations("InternalPage");
  const [isCanceledDialogOpen, setIsCanceledDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  return (
    <>
      <CancelTripDialog
        booking_id={booking.id}
        isOpen={isCanceledDialogOpen}
        onOpenChange={setIsCanceledDialogOpen}
      />

      <TripDetailsDialog
        booking={booking}
        isOpen={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-56 p-2 space-y-1 rounded-lg shadow-lg border border-gray-200 bg-white"
        >
          <DropdownMenuLabel className="px-2 py-1.5 font-semibold text-sm">
            {t("trip_actions")}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-200" />

          <DropdownMenuItem
            onSelect={() => setIsDetailDialogOpen(true)}
            className="px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-100 transition-colors duration-150 text-sm"
          >
            <Info className="mr-2 h-4 w-4 text-blue-600" />
            <span>{t("details")}</span>
          </DropdownMenuItem>

          {booking.payment_status === "approved" && (
            <DropdownMenuItem
              onSelect={() => setIsCanceledDialogOpen(true)}
              className="px-2 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors duration-150 text-sm"
            >
              <XCircle className="mr-2 h-4 w-4" />
              <span>{t("cancel_trip")}</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
