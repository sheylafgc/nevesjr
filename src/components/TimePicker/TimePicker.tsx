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
  const [hours, setHours] = useState("12");
  const [minutes, setMinutes] = useState("00");
  const [isOpen, setIsOpen] = useState(false);
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const time = `${hours}:${minutes}`;

  const handleConfirm = () => {
    onChange(`${time} ${period}`);
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
                min="1"
                max="12"
                placeholder="HH"
                className="w-16 mx-1"
                onChange={(e) => {
                  const hour = e.target.value;
                  setHours(hour);
                }}
              />
              <Input
                type="number"
                min="0"
                max="59"
                placeholder="MM"
                className="w-16 mx-1"
                onChange={(e) => {
                  const minute = e.target.value;
                  setMinutes(minute);
                }}
              />
              <Select
                value={period}
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
            <Button onClick={handleConfirm} className="mt-4">
              Confirmar
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TimePicker;
