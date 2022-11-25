import { useState } from "react";
import Link from "next/link";
import styles from "../../styles/memoryGame.module.css";

import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

export default function memoryGame() {
  const [rndArray, setRndArray] = useState([]);
  const [board, setBoard] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [show, setShow] = useState(true);
  const [clicked, setClicked] = useState([]);
  const [br, setBr] = useState(0);
  const [step, setStep] = useState(0);

  function check(e) {
    let x = e.target.classList.value;
    let brr = 0;
    if (x.indexOf("chosen") !== -1) {
      setBr(br + 1);
      brr = br + 1;
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
      setRndArray([]);
      reset();
      setStep(0);
      setBoard([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    }
    let niz = [...clicked];
    niz.push(parseInt(e.target.innerHTML));

    setClicked(niz);

    console.log("inportant" + rndArray.length);
    if (brr === rndArray.length) {
      if (brr >= board.length / 2) {
        if (board.length == 9) {
          setBoard([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
        } else if (board.length == 16) {
          setBoard([
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23, 24,
          ]);
        }

        getRnd();
        reset();
        setStep(step + 1);
      } else {
        setStep(step + 1);
        getRnd();

        reset();
      }
    }
  }

  function reset() {
    setBr(0);
    setShow(!show);
    setClicked([]);
  }

  function getRnd() {
    let brL = [...board].length;
    console.log(brL);
    let lenght = rndArray.length;
    let niz = [...rndArray];
    while (niz.length === lenght) {
      let rnd = Math.floor(Math.random() * brL);
      if (niz.indexOf(rnd) === -1) {
        niz.push(rnd);
        setRndArray(niz);
      }
    }
  }
  function getStarted() {
    getRnd();
    setStep(0);
  }
  function startGuessing() {
    setShow(!show);
  }
  return (
    <>
      <ReactNotifications />
      <header className={styles.header}>
        <h1>Memory game</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.box}>
          <div className={styles.lvl}>Level : {step}</div>
          <div className={styles.board}>
            {board.map((element) => {
              let id = rndArray;

              return (
                <div
                  style={
                    board.length < 10
                      ? { height: "30%", width: "30%" }
                      : board.length > 16
                      ? { height: "18%", width: "18%" }
                      : {}
                  }
                  onClick={(e) => check(e)}
                  className={
                    id.indexOf(element) !== -1
                      ? show || clicked.indexOf(element) !== -1
                        ? styles.chosenShow
                        : styles.chosenDontShow
                      : show
                      ? styles.notChose
                      : styles.notChose
                  }
                  key={element}
                >
                  {element}
                </div>
              );
            })}
          </div>
          <div className={styles.buttonBox}>
            <button
              onClick={getStarted}
              className={rndArray.length < 1 ? styles.active : styles.notActive}
            >
              Start game
            </button>
            <button
              onClick={startGuessing}
              className={br == 0 ? styles.active : styles.notActive}
            >
              Start guessing
            </button>
          </div>
        </div>

        <Link href={"/"} className={styles.homeLink}>
          Home page
        </Link>
      </main>
      <footer className={styles.footer}>by Lazar Djurkovic</footer>
    </>
  );
}
