"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RiSettings3Line } from "react-icons/ri";
import InvoiceDownload from "../InvoiceDownload/InvoiceDownload";
import { format } from "date-fns";
import { BookingProps } from "@/src/domain/Bookings/Bookings";
import ActionsCell from "../ActionsCell/ActionsCell";
import Image from "next/image";
import {
  DateHeader,
  FromHeader,
  HourHeader,
  InvoiceHeader,
  PaymentHeader,
  PaymentStatusHeader,
  PriceHeader,
  ToHeader,
} from "../TableHeaders/TableHeaders";

export const columns: ColumnDef<BookingProps>[] = [
  {
    accessorKey: "vehicle_details",
    header: "Ride",
    cell: ({ row }) => {
      const vehicle =
        row.getValue<BookingProps["vehicle_details"]>("vehicle_details");

      return (
        <div className="w-full flex justify-center items-center">
          <div className="p-2 w-12 h-12 flex justify-center items-center border bg-gray1 rounded-lg">
            <Image
              width={100}
              height={100}
              src={
                (process.env.NEXT_PUBLIC_IMAGE_URL ?? "") + vehicle.car_image ||
                ""
              }
              alt={vehicle.car_name}
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "from_route",
    header: () => <FromHeader />,
  },
  {
    accessorKey: "to_route",
    header: () => <ToHeader />,
    cell: ({ row }) => {
      const to_route = row.getValue<string>("to_route");

      return <div>{to_route === "" ? "no location" : to_route}</div>;
    },
  },
  {
    accessorKey: "date",
    header: () => <DateHeader />,
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
    header: () => <HourHeader />,
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
    header: () => <PriceHeader />,
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
    header: () => <PaymentHeader />,
    cell: ({ row }) => {
      const payment_brand = row.getValue<string>("payment_brand");

      return <div className="capitalize">{payment_brand}</div>;
    },
  },
  {
    accessorKey: "payment_status",
    header: () => <PaymentStatusHeader />,
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
    header: () => <InvoiceHeader />,
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
