import Link from 'next/link'
import Image from "next/image"
import { GetStaticPaths, GetStaticProps } from 'next'

import { EpisodeProps } from './episodes.types'
import { getEpisode } from '../../services/Api'
import styles from './style.module.scss';
import { usePlayer } from '../../contexts/Player'

export default function Episode({ episode }: EpisodeProps) {
  const { play } = usePlayer();

  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <Link href='/'>
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>
        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />
        <button type="button">
          <img
            onClick={() => play(episode)}
            alt="Tocar episódio"
            src="/play.svg"
          />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const episode = await getEpisode(slug as string);
  return {
    props: { episode }
  }
}