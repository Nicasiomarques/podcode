import axios from "axios";
import { formatDuration, formatPublishedAt } from "../utils";
import { GetEpisodeResponse, GetEpisodesResponse } from "./Api.types";

export const api = axios.create({ baseURL: "http://localhost:8000" });

export const getEpisodes = async () => {
  const { data } = await api.get<GetEpisodesResponse[]>("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes = data.map(episode => ({
    id: episode.id,
    title: episode.title,
    thumbnail: episode.thumbnail,
    members: episode.members,
    url: episode.file.url,
    duration: Number(episode.file.duration),
    publishedAt: formatPublishedAt(episode.published_at),
    durationAsString: formatDuration(episode.file.duration),
  }));

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    latestEpisodes,
    allEpisodes,
  };
};

export const getEpisode = async (slug: string) => {
  const { data } = await api.get<GetEpisodeResponse>(`episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    description: data.description,
    url: data.file.url,
    duration: Number(data.file.duration),
    publishedAt: formatPublishedAt(data.published_at),
    durationAsString: formatDuration(data.file.duration),
  };

  return episode;
};
