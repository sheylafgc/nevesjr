"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IoLocationSharp } from "react-icons/io5";
import { MdLocationSearching } from "react-icons/md";
import { RiSettings3Line } from "react-icons/ri";
import InvoiceDownload from "../InvoiceDownload/InvoiceDownload";
import { format } from "date-fns";
import { BookingProps } from "@/domain/Bookings/Bookings";
import ActionsCell from "../ActionsCell/ActionsCell";

export const columns: ColumnDef<BookingProps>[] = [
  // {
  //   accessorKey: "rideClassData",
  //   header: "Ride",
  //   cell: ({ row }) => {
  //     const vehicle = row.getValue<VehicleProps>("vehicleData");

  //     return (
  //       <div className="w-full flex justify-center items-center">
  //         <div className="p-2 w-12 h-12 flex justify-center items-center border bg-gray1 rounded-lg">
  //           <Image
  //             width={100}
  //             height={100}
  //             src={
  //               (process.env.NEXT_PUBLIC_IMAGE_URL ?? "") + vehicle.car_image ||
  //               ""
  //             }
  //             alt={vehicle.car_name}
  //           />
  //         </div>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "from_route",
    header: () => (
      <div className="flex justify-center items-center gap-2">
        From
        <IoLocationSharp size={18} className="text-gray2" />
      </div>
    ),
  },
  {
    accessorKey: "to_route",
    header: () => (
      <div className="flex justify-center items-center gap-2">
        <MdLocationSearching size={18} className="text-gray2" />
        To
      </div>
    ),
    cell: ({ row }) => {
      const to_route = row.getValue<string>("to_route");

      return <div>{to_route === "" ? "no location" : to_route}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue<string>("date"));

      return (
        <div>
          <div>{format(date, "PPP")}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "hour",
    header: "Hour",
    cell: ({ row }) => {
      const hour = row.getValue<BookingProps>("hour");

      function formatTime(timeValue: string) {
        const timePattern = /^(0?[0-9]|1[0-9]|2[0-3]):([0-5]\d):([0-5]\d)$/;
        if (!timePattern.test(timeValue)) {
          throw new Error(
            "Invalid time format. Please use HH:mm:ss or H:mm:ss."
          );
        }

        const [hours, minutes] = timeValue.split(":").map(Number);

        const formattedHours = hours % 12 || 12;
        const period = hours < 12 ? "AM" : "PM";

        return `${formattedHours}:${String(minutes).padStart(
          2,
          "0"
        )} ${period}`;
      }

      return (
        <div>
          <div>{formatTime(String(hour))}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div>Price</div>,
    cell: ({ row }) => {
      const amount = row.getValue<string>("amount");
      const price = parseFloat(amount) / 100;

      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(price);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "payment_brand",
    header: "Payment",
    cell: ({ row }) => {
      const payment_brand = row.getValue<string>("payment_brand");

      return <div className="capitalize">{payment_brand}</div>;
    },
  },
  {
    accessorKey: "payment_status",
    header: "Payment Status",
    cell: ({ row }) => {
      const payment_status = row.getValue<string>("payment_status");

      return (
        <div
          className={`capitalize ${
            payment_status === "approved" ? "text-green-900" : "text-red-900"
          }`}
        >
          {payment_status}
        </div>
      );
    },
  },
  {
    accessorKey: "payment_intent_id",
    header: "Invoice",
    cell: ({ row }) => {
      return (
        <InvoiceDownload
          payment_intent_id={row.getValue<string>("payment_intent_id")}
        />
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <RiSettings3Line size={18} className="text-gray2" />,
    cell: ({ row }) => {
      const booking = row.original;

      return <ActionsCell booking={booking} />;
    },
  },
];
