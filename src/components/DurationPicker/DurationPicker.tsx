import React, { ComponentProps, useState } from "react";
import InputText from "../InputText/InputText";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { TbClockPin } from "react-icons/tb";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DurationPickerProps extends ComponentProps<"input"> {
  onTimeChange: (time: string) => void;
}

export default function DurationPicker({
  onTimeChange,
  className,
}: DurationPickerProps) {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    const formattedTime = `${hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:00`;
    onTimeChange(formattedTime);
    setIsOpen(false);
  };

  return (
    <div className={className}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <InputText
            value={`${hours}:${minutes < 10 ? "0" + minutes : minutes}`}
            placeholder="Selecione a duração"
            onClick={() => setIsOpen(!isOpen)}
            readOnly
            LeftComponent={<TbClockPin size={18} />}
          />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col p-4">
            <div className="flex">
              <Input
                type="number"
                min="1"
                placeholder="HH"
                className="w-16 mx-1"
                value={hours}
                onChange={(e) => {
                  const hour = Math.max(1, Number(e.target.value));
                  setHours(hour);
                }}
              />
              <Select
                value={minutes.toString()}
                onValueChange={(value) => setMinutes(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 15, 30, 45].map((minute) => (
                    <SelectItem key={minute} value={minute.toString()}>
                      {minute < 10 ? "0" + minute : minute}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleConfirm} className="mt-4">
              Confirm
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
