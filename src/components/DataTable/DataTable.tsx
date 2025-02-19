"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full flex flex-row justify-between items-center py-5">
        <Link href={"/BookATrip"}>
          <button className="px-8 py-3 text-xs text-white bg-black rounded-full hover:opacity-85">
            Book new trip
          </button>
        </Link>
        <Button className="px-11 py-5 text-xs text-black shadow-none bg-white2 rounded-full hover:text-white">
          <FiFilter size={18} />
          filters
        </Button>
      </div>
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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="h-20 text-gray2 text-xs text-center"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
