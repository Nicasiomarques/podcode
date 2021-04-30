export interface GetEpisodeResponse {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  description: string;
  file: {
    url: string;
    duration: number;
  };
  published_at: string;
}

export interface GetEpisodesResponse extends Omit<GetEpisodeResponse, "description"> {}
