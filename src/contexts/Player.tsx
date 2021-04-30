import { createContext, FC, useContext, useState } from "react";
import { Episode, PlayerContextData } from "./Player.types";

export const PlayerContext = createContext({} as PlayerContextData);

export const PlayerContextProvider: FC = ({ children }) => {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = episodeList.length > (currentEpisodeIndex + 1);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function playNext() {
    if (hasNext) setCurrentEpisodeIndex(currentEpisodeIndex + 1);
  }

  function playPrevious() {
    if (hasPrevious) setCurrentEpisodeIndex(currentEpisodeIndex - 1);
  }

  return (
    <PlayerContext.Provider
      value={{
        currentEpisodeIndex,
        setPlayingState,
        playPrevious,
        episodeList,
        hasPrevious,
        togglePlay,
        isPlaying,
        playNext,
        playList,
        hasNext,
        play,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext);
}
