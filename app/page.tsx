import { NavItems } from "@/components/NavItems"
import { HomeLoop } from "@/components/HomeLoop"
import { HomepageBanner } from "@/components/HomepageBanner"
import { getEvents } from "./events/page"

import styles from "./Home.module.css"

export default async function Home() {
  const events = await getEvents()

  return (
    <>
      <div id={styles.content}>
        <HomepageBanner events={events} />
        <h1 id={styles.title}>compsigh</h1>
        <p id={styles.description}>
          compsigh is the social computer science club at USFCA for meeting cool
          people &amp;&amp; building cool things. We host high-quality,
          low-stakes events, and engage in a vibrant community.
        </p>
        <nav id={styles.navbar}>
          <NavItems />
        </nav>
      </div>
      <div id={styles.background}>
        <HomeLoop />
      </div>
    </>
  )
}
