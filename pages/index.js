import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header className={styles.header}>
        <h1>Mini games</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.siteSinop}>Test your abilityes</div>
        <div className={styles.linkBox}>
          <Link href={`/miniGames/memoryGame`} className={styles.elemet}>
            <div>Memory game</div>
          </Link>
          <Link href={`/miniGames/numberRemembering`} className={styles.elemet}>
            <div>Number remembering</div>
          </Link>
          <Link href={`/miniGames/wordRemembering`} className={styles.elemet}>
            <div>Word remembering</div>
          </Link>
          <Link href={`/miniGames/testReflexes`} className={styles.elemet}>
            <div>Testing reflexes</div>
          </Link>
          <Link href={`/miniGames/aimTraining`} className={styles.elemet}>
            <div>Aim training</div>
          </Link>
          <Link href={`/miniGames/sequenceMemory`} className={styles.elemet}>
            <div>Sequence memory</div>
          </Link>
        </div>
      </main>
      <footer className={styles.footer}>by Lazar Djurkovic</footer>
    </div>
  );
}
