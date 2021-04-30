import { parseISO } from "date-fns";
import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";

export const formatPublishedAt = (date: string) =>
  format(parseISO(date), "d MMM yy", { locale: ptBR });

export const currentDate = format(new Date(), "EEEEEE, d MMMM", {
  locale: ptBR,
});

export const calculateRevalidateInHours = (hours: number) => 60 * 60 * hours;

export const formatDuration = (time: number) => {
  const duration = Number(time);
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const formattedTime = [hours, minutes, seconds]
    .map(unit => String(unit).padStart(2, "0"))
    .join(":");
  return formattedTime;
};
