import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";

export const getCurrentDate = () =>
  format(new Date(), "EEEEEE, d MMMM", {
    locale: ptBR,
  });
