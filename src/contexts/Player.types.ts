export interface Episode {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

export interface PlayerContextData {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: Episode) => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
}
