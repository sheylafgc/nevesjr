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
import { MoreHorizontal } from "lucide-react";
import { BookingProps } from "@/domain/Bookings/Bookings";
import TripDetailsDialog from "../TripDetailsDialog/TripDetailsDialog";

interface ActionCellProps {
  booking: BookingProps;
}

export default function ActionsCell({ booking }: ActionCellProps) {
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
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="space-y-1">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setIsDetailDialogOpen(true)}>
            Trip details
          </DropdownMenuItem>
          {booking.payment_status === "approved" && (
            <DropdownMenuItem
              onSelect={() => setIsCanceledDialogOpen(true)}
              className="bg-red-500 text-white"
            >
              Cancel trip
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
