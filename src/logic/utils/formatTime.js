import { format, getTime, formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || "dd MMM yyyy";

  return date ? format(new Date(date), fm, { locale: vi }) : "";
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || "p dd MMM yyyy";

  return date ? format(new Date(date), fm, { locale: vi }) : "";
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : "";
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : "";
}
