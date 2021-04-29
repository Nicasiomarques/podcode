import { useContext } from 'react'
import Image from 'next/image'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import { PlayerContext } from '../../contexts/Player'
import styles from './styles.module.scss'

export default function Player() {
  const { episodeList, currentEpisodeIndex } = useContext(PlayerContext);
  const episode = episodeList[currentEpisodeIndex];

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
          <span>00:00</span>
          {episode ?
            (
              <Slider
                trackStyle={{ backgroundColor: '#84d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#84d361', borderWidth: 4 }}
              />
            ) :
            (
              <div className={styles['player__slider--empty']} />
            )
          }
          <span>00:00</span>
        </div>

        <div className={styles.player__buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Tocar aleatoria" />
          </button>

          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>

          <button type="button" disabled={!episode}>
            <img src="/play.svg" className={styles.play__button} alt="Tocar" />
          </button>

          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="Tocar proxima" />
          </button>

          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  )
}
