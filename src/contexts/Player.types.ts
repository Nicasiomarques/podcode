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
  isShuffling: boolean;
  isPlaying: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
  isLooping: boolean;
  play: (episode: Episode) => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  setPlayingState: (state: boolean) => void;
  playList: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
}
