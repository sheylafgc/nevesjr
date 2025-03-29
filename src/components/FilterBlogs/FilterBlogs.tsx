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
import { getBlogCategories } from "@/src/domain/BlogCategories/BlogCategories";
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
import { cn } from "@/src/lib/utils";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

interface FilterBlogsProps {
  onFilter: (categoryValue: string) => void;
  currentFilter: string;
}

export default function FilterBlogs({
  onFilter,
  currentFilter,
}: FilterBlogsProps) {
  const tButton = useTranslations("Buttons");
  const t = useTranslations("BlogsPage");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(currentFilter);
  const locale = useLocale();

  const { data: BlogCategories } = useQuery({
    queryKey: ["blogCategories", locale],
    queryFn: async () => {
      const categories = await getBlogCategories({ locale });
      return categories;
    },
  });

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    setOpen(false);
    onFilter(newValue);
  };

  const handleClearFilter = () => {
    setValue("");
    onFilter("");
    setOpen(false);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-gray1 rounded-full px-8 py-3 text-black shadow-sm hover:text-gray1">
            <FaFilter size={20} />
            {tButton("filters")}
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-xl lg:w-full w-[90%]">
          <DialogHeader>
            <DialogTitle>{t("filter_blogs")}</DialogTitle>
            <DialogDescription>{t("by_category")}</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-4">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[300px] justify-between"
                >
                  {value
                    ? BlogCategories?.find(
                        (category) => category.label === value
                      )?.label
                    : t("select_category")}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder={t("search_category")} />
                  <CommandList>
                    <CommandEmpty>{t("no_category_found")}</CommandEmpty>
                    <CommandGroup>
                      {BlogCategories?.map((category) => (
                        <CommandItem
                          key={category.label}
                          value={category.label}
                          onSelect={handleSelect}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === category.label
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
                {tButton("close")}
              </Button>
            </DialogClose>
            <Button
              variant="outline"
              onClick={handleClearFilter}
              disabled={!value}
            >
              {tButton("clear_filters")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
