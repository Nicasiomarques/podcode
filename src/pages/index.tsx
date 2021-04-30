import Link from "next/link"
import Image from "next/image"
import { GetStaticProps } from "next"

import styles from './styles.module.scss'
import { getEpisodes } from "../services/Api"
import { calculateRevalidateInHours } from "../utils"
import { usePlayer } from "../contexts/Player"

interface Episode {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
}

interface HomeProps {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const { playList } = usePlayer();
  const episodesList = [...latestEpisodes, ...allEpisodes];

  return (
    <div className={styles.homePage}>
      <section className={styles.latestEpisodes}>
        <h2>Ultimos lançamentos</h2>

        <ul>
          {latestEpisodes.map(((episode, index) => (
            <li key={episode.id}>
              <Image
                width={192}
                height={192}
                src={episode.thumbnail}
                alt={episode.title}
                objectFit='cover'
              />

              <div className={styles.episode__details}>
                <Link href={`/episodes/${episode.id}`}>
                  <a>{episode.title}</a>
                </Link>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
              </div>

              <button type="button">
                <img
                  onClick={() => playList(episodesList, index)}
                  src="/play-green.svg"
                  alt="Tocar episodio"
                />
              </button>
            </li>
          )))}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos os episodios</h2>

        <table className={styles.allEpisodes} cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode, index) => (
              <tr key={episode.id}>
                <td style={{ width: 100 }}>
                  <Image
                    width={150}
                    height={150}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit='cover'
                  />
                </td>
                <td>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                </td>
                <td>{episode.members}</td>
                <td style={{ width: 130 }}>{episode.publishedAt}</td>
                <td>{episode.durationAsString}</td>
                <td>
                  <button>
                    <img
                      onClick={() => playList(episodesList, index + latestEpisodes.length)}
                      src="/play-green.svg"
                      alt="Tocar episodio"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { latestEpisodes, allEpisodes } = await getEpisodes()

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: calculateRevalidateInHours(8),
  }
}
