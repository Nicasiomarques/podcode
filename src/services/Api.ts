import axios from "axios";

export const api = axios.create({ baseURL: "http://localhost:8000" });

export const getEpisodes = () =>
  api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });
