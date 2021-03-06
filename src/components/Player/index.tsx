import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import { usePlayer } from '../../contexts/Player'
import styles from './styles.module.scss'
import { formatDuration } from '../../utils'

export default function Player() {
  const {
    currentEpisodeIndex,
    setPlayingState,
    toggleShuffle,
    playPrevious,
    episodeList,
    resetPlayer,
    hasPrevious,
    isShuffling,
    toggleLoop,
    togglePlay,
    isPlaying,
    isLooping,
    playNext,
    hasNext,
  } = usePlayer();
  const episode = episodeList[currentEpisodeIndex];
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  const setupProgressListener = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime))
    });
  }

  function handleEpisodeEnded() {
    hasNext ? playNext() : resetPlayer();
  }

  const handleSeek = (amount: number) => {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying])

  return (
    <div className={styles.player}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando Agora</strong>
      </header>
      {episode ?
        (<div className={styles.player__currentEpisode}>
          <Image
            height={592}
            width={592}
            src={episode.thumbnail}
            objectFit='cover'
          />

          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>)
        :
        (<div className={styles.player__empty}>
          Seleccione um podcast para ouvir
        </div>)
      }

      <footer>
        <div className={styles.player__progress}>
          <span>{formatDuration(Math.floor(progress))}</span>
          {episode ?
            (<Slider
              value={progress}
              max={episode.duration}
              onChange={handleSeek}
              trackStyle={{ backgroundColor: '#84d361' }}
              railStyle={{ backgroundColor: '#9f75ff' }}
              handleStyle={{ borderColor: '#84d361', borderWidth: 4 }}
            />)
            :
            (<div className={styles['player__slider--empty']} />)
          }
          <span>
            {formatDuration(episode?.duration ?? 0)}
          </span>
        </div>

        {episode && (
          <audio
            ref={audioRef}
            src={episode.url}
            loop={isLooping}
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onLoadedMetadata={setupProgressListener}
            onEnded={handleEpisodeEnded}
          />
        )}

        <div className={styles.player__buttons}>
          <button
            onClick={toggleShuffle}
            className={isShuffling ? styles.isActive : ''}
            type="button" disabled={!episode}
          >
            <img src="/shuffle.svg" alt="Tocar aleatoria" />
          </button>

          <button
            onClick={playPrevious}
            type="button"
            disabled={!episode || !hasPrevious}
          >
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className={styles.play__button}
            disabled={!episode}>
            {isPlaying
              ? <img src="/pause.svg" alt="Pausar" />
              : <img src="/play.svg" alt="Tocar" />}
          </button>

          <button
            onClick={playNext}
            type="button"
            disabled={!episode || !hasNext}
          >
            <img src="/play-next.svg" alt="Tocar proxima" />
          </button>

          <button
            className={isLooping ? styles.isActive : ''}
            onClick={toggleLoop}
            disabled={!episode}
            type="button"
          >
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  )
}
