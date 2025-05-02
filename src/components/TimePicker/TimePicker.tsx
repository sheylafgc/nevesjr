"use client";
import React, { useState } from "react";
import InputText from "../InputText/InputText";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MdWatch } from "react-icons/md";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTranslations } from "next-intl";

interface TimePickerProps {
  onChange: (time: string) => void;
}

const TimePicker = ({ onChange }: TimePickerProps) => {
  const t = useTranslations("TimeComponents");
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [period, setPeriod] = useState<"AM" | "PM" | null>(null);

  const time = `${
    hours === "" || minutes === "" || !period
      ? ""
      : hours + ":" + minutes + " " + period
  }`;

  function formattedTime(hour: string, minutes: string, period: string) {
    if (!hour || !minutes || !period) return "";

    let hourNum = parseInt(hour || "0");

    if (period === "PM" && hourNum < 12) {
      hourNum += 12;
    } else if (period === "AM" && hourNum === 12) {
      hourNum = 0;
    }

    const formattedHour = hourNum.toString().padStart(2, "0");
    const formattedMinutes = minutes.padStart(2, "0");

    return `${formattedHour}:${formattedMinutes}:00`;
  }

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const numericValue = parseInt(value || "0");

    if (value === "" || (numericValue >= 0 && numericValue <= 59)) {
      setMinutes(value.slice(0, 2));
    }
  };

  const handleBlur = (type: "hours" | "minutes") => {
    if (type === "hours" && hours) {
      const num = parseInt(hours);
      if (num < 1) setHours("1");
      if (num > 12) setHours("12");
      setHours(hours.padStart(2, "0"));
    }
    if (type === "minutes" && minutes) {
      const num = parseInt(minutes);
      if (num < 0) setMinutes("00");
      if (num > 59) setMinutes("59");
      setMinutes(minutes.padStart(2, "0"));
    }
  };

  const hourOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleConfirm = () => {
    if (hours && minutes && period) {
      const formatted = formattedTime(hours, minutes, period);
      onChange(formatted);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <InputText
            value={time}
            placeholder={t("select_hour")}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            readOnly
            LeftComponent={<MdWatch size={18} />}
          />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col p-4">
            <div className="flex items-center gap-2">
              <Select value={hours} onValueChange={(value) => setHours(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="HH" />
                </SelectTrigger>
                <SelectContent>
                  {hourOptions.map((hour) => (
                    <SelectItem
                      key={hour}
                      value={hour.toString().padStart(2, "0")}
                    >
                      {hour.toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="MM"
                onChange={handleMinuteChange}
                onBlur={() => handleBlur("minutes")}
                value={minutes}
                style={{ borderWidth: "1px" }}
                maxLength={2}
              />

              <Select
                value={period ?? ""}
                onValueChange={(value) => setPeriod(value as "AM" | "PM")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="AM/PM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              disabled={!hours || !minutes || !period}
              onClick={handleConfirm}
              className="mt-4"
            >
              {t("confirm")}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TimePicker;
