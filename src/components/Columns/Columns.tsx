"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IoLocationSharp } from "react-icons/io5";
import { MdLocationSearching } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { RiSettings3Line } from "react-icons/ri";
import Image from "next/image";
import { CarClassesProps } from "@/app/constants/classesData";

export type DateTimeProps = {
  date: string;
  time: string;
};

export type TripDataProps = {
  id: string;
  from: string;
  to: string;
  dateTime: DateTimeProps;
  price: number;
  paymentType: string;
  paymentStatus: "pending" | "processing" | "success" | "failed";
  invoice: string;
  rideClassData: CarClassesProps;
};

export const columns: ColumnDef<TripDataProps>[] = [
  {
    accessorKey: "rideClassData",
    header: "Ride",
    cell: ({ row }) => {
      const rideClass = row.getValue<CarClassesProps>("rideClassData");

      return (
        <div className="w-full flex justify-center items-center">
          <div className="p-2 w-12 h-12 flex justify-center items-center border bg-gray1 rounded-lg">
            <Image
              width={100}
              height={100}
              src={rideClass.carImage}
              alt={rideClass.className}
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "from",
    header: () => (
      <div className="flex justify-center items-center gap-2">
        From
        <IoLocationSharp size={18} className="text-gray2" />
      </div>
    ),
  },
  {
    accessorKey: "to",
    header: () => (
      <div className="flex justify-center items-center gap-2">
        <MdLocationSearching size={18} className="text-gray2" />
        To
      </div>
    ),
  },
  {
    accessorKey: "dateTime",
    header: "Date/Time",
    cell: ({ row }) => {
      const dateTime = row.getValue<DateTimeProps>("dateTime");

      return (
        <div>
          <div>{dateTime.date}</div>
          <div>{dateTime.time}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div>Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(price);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "paymentType",
    header: "Payment",
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const paymentStatus = row.getValue("paymentStatus");

      return (
        <div
          className={`${
            paymentStatus === "success"
              ? "text-green-500"
              : paymentStatus === "processing"
              ? "text-blue-500"
              : paymentStatus === "pending"
              ? "text-yellow-900"
              : "text-red-500"
          } capitalize`}
        >
          {row.getValue("paymentStatus")}
        </div>
      );
    },
  },
  {
    accessorKey: "invoice",
    header: "Invoice",
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <RiSettings3Line size={18} className="text-gray2 w-full" />,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy trip ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit trip</DropdownMenuItem>
            <DropdownMenuItem>Cancel trip</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
