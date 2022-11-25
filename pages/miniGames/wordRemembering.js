import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../../styles/wordRemembering.module.css";
import { wordsList } from "../../data/words";

import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

export default function wordRemembering() {
  const [wordList, setWordList] = useState([]);
  const [step, setStep] = useState(0);
  const [words, setWords] = useState(wordsList);
  const [chosenWord, setChosenWord] = useState("");

  const [isNew, setIsNew] = useState(true);

  function startGuessing() {
    let rndF = Math.floor(Math.random() * 2);

    if (step == 0) {
      rndF = 0;
    }
    console.log("rndF " + rndF);
    if (rndF == 0) {
      setIsNew(true);
      let niz = [...words];
      console.log(niz);

      for (let i = 0; i < wordList.length; i++) {
        if (niz.indexOf(wordList[i]) != -1) {
          console.log("id " + niz.indexOf(wordList[i]));
          console.log("word " + niz[niz.indexOf(wordList[i])]);
          niz.splice(niz.indexOf(wordList[i]), 1);
          console.log(wordList);
          console.log(niz);
        }
      }
      let rndN = Math.floor(Math.random() * niz.length);
      let chosen0 = niz[rndN];
      let wL = [...wordList];
      wL.push(chosen0);
      setWordList(wL);
      setChosenWord(chosen0);
    } else if (rndF == 1) {
      setIsNew(false);
      let wLNiz = [...wordList];
      let rndWL = Math.floor(Math.random() * wLNiz.length);
      let chosen1 = wLNiz[rndWL];
      setChosenWord(chosen1);
    }

    setStep(step + 1);
  }

  function isItNew() {
    if (isNew) {
      startGuessing();
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
  function isItSeen() {
    if (!isNew) {
      startGuessing();
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
    setWordList([]);
    setChosenWord("");
    setIsNew(true);
  }

  return (
    <>
      <ReactNotifications />
      <header className={styles.header}>
        <h1>Word Remembering</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.box}>
          <div className={styles.lvl}>Level : {step}</div>

          <div className={styles.word}>{chosenWord}</div>
          <div className={styles.buttonBox}>
            <button
              style={{
                borderColor: "rgb(170, 170, 234)",
                border: "solid",
                borderRadius: "10px",
                width: "45%",
                height: "80%",
              }}
              onClick={isItSeen}
              className={step != 0 ? styles.active : styles.notActive}
            >
              Seen
            </button>
            <button
              style={{
                borderColor: "rgb(170, 170, 234)",
                border: "solid",
                borderRadius: "10px",
                width: "45%",
                height: "80%",
              }}
              onClick={isItNew}
              className={step != 0 ? styles.active : styles.notActive}
            >
              New
            </button>
          </div>
          <button
            style={{
              borderColor: "rgb(170, 170, 234)",
              border: "solid",
              borderRadius: "10px",
              width: "20%",
              height: "15%",
            }}
            onClick={startGuessing}
            className={step == 0 ? styles.active : styles.notActive}
          >
            Start
          </button>
        </div>

        <Link href={"/"} className={styles.homeLinks}>
          Home page
        </Link>
      </main>
      <footer className={styles.footer}>by Lazar Djurkovic</footer>
    </>
  );
}
