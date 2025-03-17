import { FaFilter } from "react-icons/fa";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { getBlogCategories } from "@/domain/BlogCategories/BlogCategories";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function FilterBlogs() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { data: BlogCategories } = useQuery({
    queryKey: ["blogCategories"],
    queryFn: getBlogCategories,
  });

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-gray1 rounded-full px-8 py-3 text-black shadow-sm hover:text-gray1">
            <FaFilter size={20} />
            Filters
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-xl lg:w-full w-[90%]">
          <DialogHeader>
            <DialogTitle>Filter blogs</DialogTitle>
            <DialogDescription>Filter blogs by category</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {value
                    ? BlogCategories?.find(
                        (category) => category.value === value
                      )?.label
                    : "Select category..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search category..." />
                  <CommandList>
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {BlogCategories?.map((category) => (
                        <CommandItem
                          key={category.value}
                          value={category.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === category.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {category.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
