import { createContext, FC, useContext, useState } from "react";
import { Episode, PlayerContextData } from "./Player.types";

const PlayerContext = createContext({} as PlayerContextData);

export const PlayerContextProvider: FC = ({ children }) => {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || episodeList.length > (currentEpisodeIndex + 1);

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

  function toggleLoop() {
    setIsLooping(!isLooping)
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  function resetPlayer() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(false);
  }

  return (
    <PlayerContext.Provider
      value={{
        currentEpisodeIndex,
        setPlayingState,
        toggleShuffle,
        playPrevious,
        resetPlayer,
        isShuffling,
        episodeList,
        hasPrevious,
        togglePlay,
        toggleLoop,
        isLooping,
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
