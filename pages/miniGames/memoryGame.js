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
        let lenght = board.length;
        let root = Math.sqrt(lenght);
        root += 1;
        let newN = Math.pow(root, 2);
        let newArray = [];
        for (let i = 0; i < newN; i++) {
          newArray.push(i);
        }
        setBoard(newArray);

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
    setShow(true);
    setClicked([]);
  }

  function getRnd() {
    let brL = [...board].length;
    console.log(brL);
    let lenght = rndArray.length;
    let niz = [];

    for (let i = 0; i < lenght + 1; i++) {
      let rnd = Math.floor(Math.random() * brL);
      if (niz.indexOf(rnd) === -1) {
        niz.push(rnd);
      } else {
        i -= 1;
      }
    }
    setRndArray(niz);
  }
  function getStarted() {
    getRnd();
    setStep(0);
  }
  function startGuessing() {
    setShow(false);
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
              let size = Math.floor(100 / Math.sqrt(board.length)) - 2;

              return (
                <div
                  style={
                    rndArray.length != 0 && show != true
                      ? { height: `${size}%`, width: `${size}%` }
                      : {
                          height: `${size}%`,
                          width: `${size}%`,
                          cursor: "not-allowed",
                          pointerEvents: "none",
                        }
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
              className={
                br == 0 && rndArray.length != 0
                  ? styles.active
                  : styles.notActive
              }
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
