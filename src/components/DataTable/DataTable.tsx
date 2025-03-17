"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { Button } from "../ui/button";
import { FiFilter } from "react-icons/fi";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import NoDataCar from "../../../public/noDataCar.svg";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [pageIndex, setPageIndex] = useState(0);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      pagination: {
        pageIndex,
        pageSize: 10,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({ pageIndex, pageSize: 10 });
        setPageIndex(newState.pageIndex);
      } else {
        setPageIndex(updater.pageIndex);
      }
    },
  });

  const totalPages = table.getPageCount();

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      table.getColumn("date")?.setFilterValue(formattedDate);
    } else {
      table.getColumn("date")?.setFilterValue("");
    }
  };

  const clearFilters = () => {
    setColumnFilters([]);
    setSelectedDate(undefined);
    table.resetColumnFilters();
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full flex flex-row justify-between items-center py-5">
        <Link href={"/BookATrip"}>
          <button className="px-8 py-3 text-xs text-white bg-black rounded-full hover:opacity-85">
            Book new trip
          </button>
        </Link>
        <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
          <DialogTrigger className="px-11 py-3 flex justify-center items-center gap-2 text-xs text-black shadow-none bg-gray1 rounded-full hover:bg-gray2 hover:text-white">
            <FiFilter size={18} />
            filters
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter trips</DialogTitle>
              <DialogDescription>
                Use the filters below to narrow down your search results. You
                can filter by origin route, destination, date, and more.
              </DialogDescription>
            </DialogHeader>
            <Input
              placeholder="Filter origin..."
              value={
                (table.getColumn("from_route")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("from_route")
                  ?.setFilterValue(event.target.value)
              }
              className="border"
            />
            <Input
              placeholder="Filter destination..."
              value={
                (table.getColumn("to_route")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("to_route")?.setFilterValue(event.target.value)
              }
              className="border"
            />
            <div className="flex flex-col justify-center lg:items-start items-center gap-2">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border"
              />
            </div>
            <DialogFooter className="lg:gap-0 md:gap-0 gap-2">
              <Button onClick={clearFilters}>Clear Filters</Button>
              <Button
                variant="outline"
                onClick={() => setIsFilterDialogOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {table.getRowModel().rows?.length ? (
        <>
          <Table className="bg-white2 rounded-lg w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="h-20">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="font-bold text-gray2 text-xs lg:px-8 md:px-10 px-10 text-center"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="h-20 text-gray2 text-xs text-center"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end space-x-2 py-4">
            <button
              className="text-black p-2 disabled:opacity-50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <MdOutlineArrowBackIos size={20} />
            </button>
            {/* Navegação de páginas */}
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                className={`text-sm ${
                  pageIndex === index
                    ? "bg-gray2 text-white"
                    : "bg-transparent text-black"
                } rounded-xl hover:opacity-85 hover:text-white shadow-none`}
                onClick={() => table.setPageIndex(index)}
              >
                {index + 1}
              </Button>
            ))}
            <button
              className="text-black p-2 disabled:opacity-50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <MdOutlineArrowForwardIos size={20} />
            </button>
          </div>
        </>
      ) : (
        <div className="w-full flex flex-col justify-center gap-4 items-center rounded-3xl bg-white2 py-20">
          <Image
            src={NoDataCar}
            width={150}
            height={150}
            alt="No Bookings Image"
          />
          <p className="text-gray2 text-xs font-bold">
            You don’t have any scheduled trips.
          </p>
          <Link href={"/BookATrip"}>
            <button className="px-8 py-3 text-xs text-white bg-black rounded-full hover:opacity-85">
              Book new trip
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
