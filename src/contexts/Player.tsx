import { createContext, FC, useState } from "react";
import { Episode, PlayerContextData } from "./Player.types";

export const PlayerContext = createContext({} as PlayerContextData);

export const PlayerContextProvider: FC = ({ children }) => {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  return (
    <PlayerContext.Provider
      value={{
        currentEpisodeIndex,
        setPlayingState,
        episodeList,
        togglePlay,
        isPlaying,
        play,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
