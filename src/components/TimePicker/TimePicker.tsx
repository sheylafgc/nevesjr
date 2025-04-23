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

interface TimePickerProps {
  onChange: (time: string) => void;
}

const TimePicker = ({ onChange }: TimePickerProps) => {
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [period, setPeriod] = useState<"AM" | "PM" | null>(null);

  const time = `${
    hours === "" && minutes === "" && !period
      ? ""
      : hours + ":" + minutes + " " + period
  }`;

  function formattedTime(hour: string, period: string) {
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

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = Number(value);

    if (
      /^\d{0,2}$/.test(value) &&
      (value === "" || (numericValue >= 1 && numericValue <= 12))
    ) {
      setHours(value);
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = Number(value);

    if (
      /^\d{0,2}$/.test(value) &&
      (value === "" || (numericValue >= 0 && numericValue <= 59))
    ) {
      setMinutes(value);
    }
  };

  const handleConfirm = () => {
    const timeFormatted = formattedTime(hours, period ?? "AM");
    onChange(timeFormatted);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <InputText
            value={time}
            placeholder="Selecione o horário"
            onClick={() => setIsOpen(!isOpen)}
            readOnly
            LeftComponent={<MdWatch size={18} />}
          />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col p-4">
            <div className="flex">
              <Input
                type="number"
                min="0"
                max="12"
                placeholder="HH"
                className="w-16 mx-1"
                onInput={handleHourChange}
                value={hours}
                maxLength={2}
              />
              <Input
                type="number"
                min="0"
                max="59"
                placeholder="MM"
                className="w-16 mx-1"
                onInput={handleMinuteChange}
                value={minutes}
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
              Confirm
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TimePicker;
