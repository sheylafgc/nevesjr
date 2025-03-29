"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCancelBooking } from "@/src/domain/Bookings/Bookings";
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
import { useTranslations } from "next-intl";

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
  const t = useTranslations("InternalPage");
  const tButton = useTranslations("Buttons");
  const tToast = useTranslations("Toasts");
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

      toast.success(tToast("trip_canceled_successfully"), {
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
      toast.error(tToast("error_canceling_trip"), {
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
  });

  const handleCancelTrip = () => {
    mutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("cancel_trip")}</DialogTitle>
          <DialogDescription>{t("cancel_trip_detail")}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="lg:gap-0 md:gap-0 gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {tButton("close")}
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancelTrip}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? t("canceling") : t("confirm_cancelation")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
