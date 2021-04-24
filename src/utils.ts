import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";

export const currentDate = format(new Date(), "EEEEEE, d MMMM", {
  locale: ptBR,
});

export const MakeAPIUrl = (resource: string) => `http://localhost:8000/${resource}`;

export const calculateRevalidateInHours = (hours: number) => 60 * 60 * hours;
