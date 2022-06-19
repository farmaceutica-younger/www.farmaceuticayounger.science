import dayjs from "dayjs";
import "dayjs/locale/it";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (date: Date) =>
  dayjs(date).tz("europe/rome").locale("it").format("dddd DD MMMM YYYY");

export const formatTime = (date: Date) =>
  dayjs(date).tz("europe/rome").locale("it").format("HH:mm");

export const formatDateTime = (date: Date) =>
  dayjs(date).tz("europe/rome").locale("it").format("DD MMMM YYYY HH:mm");

export { dayjs };

export const getEventDate = (start: Date, stop: Date) => {
  if (start.toDateString() === stop.toDateString()) {
    return `${formatDate(start)} ${formatTime(start)} - ${formatTime(stop)}`;
  }
  return `${formatDateTime(start)} - ${formatDateTime(stop)}`;
};
