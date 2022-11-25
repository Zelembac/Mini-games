import { useState } from "react";
import styles from "../../styles/aimTraining.module.css";
import Link from "next/link";

export default function aimTraining() {
  const [display, setDisplay] = useState("none");
  const [targetsLeft, setTargetsLeft] = useState(20);
  const [rndTop, setRndTop] = useState(0);
  const [rndLeft, setRndLeft] = useState(0);
  const [see, setSee] = useState(false);
  const [firstTime, setFirstTime] = useState(0);
  const [avgTime, setAvgTime] = useState("");
  function startAiming() {
    reset();
    let time = Date.now();
    setFirstTime(time);
    getRnd();
    setSee(false);
  }
  function getRnd() {
    let top = Math.floor(Math.random() * 40);
    let lef = Math.floor(Math.random() * 63);
    setRndTop(top);
    setRndLeft(lef);
    setDisplay("flex");
  }
  function hit() {
    setTargetsLeft(targetsLeft - 1);

    if (targetsLeft == 1) {
      setSee(true);
      let time = Date.now();
      let avg = (time - firstTime) / 20;
      setDisplay("none");
      setAvgTime(avg);
    } else {
      getRnd();
    }
  }
  function reset() {
    setDisplay("none");
    setRndLeft(0);
    setRndTop(0);
    setTargetsLeft(20);
    setFirstTime(0);
    setAvgTime("");
  }
  return (
    <>
      <header className={styles.header}>
        <h1>Aim trainig</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.box}>
          <div className={styles.targetCountBox}>
            Targets left : {targetsLeft}
          </div>
          <div
            className={styles.targetBoard}
            style={
              see
                ? {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }
                : {}
            }
          >
            {see ? `Averege time between targets was ${avgTime} ms` : ""}
            <div
              onClick={hit}
              style={{
                top: `${rndTop}vh`,
                left: `${rndLeft}vw`,
                display: `${display}`,
              }}
              className={styles.target}
            >
              +
            </div>
          </div>
          <button
            onClick={startAiming}
            className={
              targetsLeft == 20 || targetsLeft == 0
                ? styles.active
                : styles.notActive
            }
          >
            Start
          </button>
        </div>

        <Link href={"/"} className={styles.homeLink}>
          Home page
        </Link>
      </main>
      <footer className={styles.footer}>by Lazar Djurkovic</footer>
    </>
  );
}
