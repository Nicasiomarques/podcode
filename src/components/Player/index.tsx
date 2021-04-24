import styles from './styles.module.scss'

export default function Player() {
  return (
    <div className={styles.player}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando Agora</strong>
      </header>

      <div className={styles.player__empty}>Seleccione um podcast para ouvir</div>

      <footer>
        <div className={styles.player__progress}>
          <span>00:00</span>
          <div className={styles['player__slider--empty']} />
          <span>00:00</span>
        </div>

        <div className={styles.player__buttons}>
          <button type="button">
            <img src="/shuffle.svg" alt="Tocar aleatoria" />
          </button>

          <button type="button">
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>

          <button type="button">
            <img src="/play.svg" className={styles.play__button} alt="Tocar" />
          </button>

          <button type="button">
            <img src="/play-next.svg" alt="Tocar proxima" />
          </button>

          <button type="button">
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  )
}
