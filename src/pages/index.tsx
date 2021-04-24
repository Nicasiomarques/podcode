import { calculateRevalidateInHours, MakeAPIUrl } from "../utils"

export default function Home({ episodes }) {
  return (
    <div>{JSON.stringify(episodes)}</div>
  )
}

export async function getStaticProps() {
  const response = await fetch(MakeAPIUrl('episodes'))
  const episodes = await response.json()

  return {
    props: {
      episodes
    },
    revalidate: calculateRevalidateInHours(8),
  }
}
