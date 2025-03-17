"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCancelBooking } from "@/domain/Bookings/Bookings";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bounce, toast } from "react-toastify";

type CancelTripDialogProps = {
  booking_id: number;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export default function CancelTripDialog({
  booking_id,
  isOpen,
  onOpenChange,
}: CancelTripDialogProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => postCancelBooking(booking_id),
    onSuccess: () => {
      onOpenChange(false);
      queryClient.invalidateQueries({
        queryKey: ["futureUserBookings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["pastUserBookings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["canceledUserBookings"],
      });

      toast.success("Trip canceled successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(
        "An error occurred while canceling the trip. Please try again later.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
    },
  });

  const handleCancelTrip = () => {
    mutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Trip</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this trip? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="lg:gap-0 md:gap-0 gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancelTrip}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Canceling..." : "Confirm Cancellation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
