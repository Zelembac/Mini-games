import { useState } from "react";
import Link from "next/link";
import styles from "../../styles/sequenceMemory.module.css";

import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

export default function sequenceMemory() {
  const [rndArray, setRndArray] = useState([]);
  const [chosen, setChosen] = useState(10);
  const [board, setBoard] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [step, setStep] = useState(0);
  const [clicks, setCicks] = useState(0);

  function getRnd() {
    let niz = [...rndArray];

    let rnd = Math.floor(Math.random() * board.length);

    niz.push(rnd);
    setRndArray(niz);

    for (let i = 0; i < niz.length; i++) {
      setTimeout((e) => setChosen(10), 1000 * (i + 1) - 100);

      setTimeout((e) => setChosen(niz[i]), 1000 * (i + 1));
    }
  }
  function check(e) {
    setChosen(10);
    let click = clicks;
    let x = e.target.classList.value;

    let value = e.target.innerHTML;
    console.log(value);
    let niz = [...rndArray];

    if (rndArray[click] == value) {
      if (x.indexOf("chosen") != -1) {
        setTimeout((e) => setChosen(10), 200);
        setTimeout((e) => setChosen(rndArray[click - 1]), 300);
      }
      setChosen(rndArray[click]);
      click += 1;
      setCicks(click);

      if (niz.length == click) {
        setStep(step + 1);
        setTimeout(getRnd, 800);

        setCicks(0);
      }
    } else {
      Store.addNotification({
        title: "Wrong!",
        message: "you made wrong guess try again",
        type: "default",

        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
          showIcon: true,
        },
        width: 400,
      });
      reset();
    }
  }

  function reset() {
    setStep(0);
    setChosen(10);
    setRndArray([]);
    setCicks(0);
    let id = window.setTimeout(function () {}, 0);

    while (id--) {
      window.clearTimeout(id);
    }
  }

  function start() {
    getRnd();
  }
  return (
    <>
      <ReactNotifications />
      <header className={styles.header}>
        <h1>Sequence memory</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.box}>
          <div className={styles.lvl}>Level : {step}</div>
          <div className={styles.board}>
            {board.map((element) => {
              return (
                <div
                  style={
                    rndArray.length < 1
                      ? { cursor: "not-allowed", pointerEvents: "none" }
                      : {}
                  }
                  key={element}
                  className={
                    chosen == element ? styles.chosenShow : styles.notChose
                  }
                  onClick={(e) => check(e)}
                >
                  {element}
                </div>
              );
            })}
          </div>
          <button
            onClick={start}
            className={step < 1 ? styles.active : styles.notActive}
          >
            start
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
