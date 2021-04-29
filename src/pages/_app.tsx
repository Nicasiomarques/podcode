import { useState } from 'react'

import '../styles/global.scss'
import styles from '../styles/app.module.scss'

import { Header, Player } from '../components'
import { PlayerContext } from '../contexts/Player'

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
  }

  return (
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play }}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>s
    </PlayerContext.Provider>
  )
}

export default MyApp
