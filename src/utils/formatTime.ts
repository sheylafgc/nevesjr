import { format, parse } from "date-fns";

function formatTime(timeValue: string) {
  const timePattern = /^(0?[0-9]|1[0-9]|2[0-3]):([0-5]\d):([0-5]\d)$/;
  if (!timePattern.test(timeValue)) {
    throw new Error("Invalid time format. Please use HH:mm:ss or H:mm:ss.");
  }

  const [hours, minutes] = timeValue.split(":").map(Number);

  const formattedHours = hours % 12 || 12;
  const period = hours < 12 ? "AM" : "PM";

  return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period}`;
}

function formatHourWithSec(time: string) {
  const parsedTime = parse(time, "HH:mm:ss", new Date());

  return format(parsedTime, "HH:mm");
}

function formatDate(date: string) {
  return format(date, "PPP");
}

export { formatTime, formatHourWithSec, formatDate };
