import '../styles/global.scss'
import styles from '../styles/app.module.scss'
import { Header, Player } from '../components'
import { PlayerContextProvider } from '../contexts/Player'

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  )
}

export default MyApp
