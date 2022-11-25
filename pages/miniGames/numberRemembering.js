import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../../styles/numberRemembering.module.css";

import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

export default function numberRemembering() {
  const [number, setNumber] = useState("");
  const [step, setStep] = useState(1);
  const [show, setShow] = useState(true);
  const [chosen, setChosen] = useState("");
  const [time, setTime] = useState(20);

  function rndNumber() {
    let number = "";
    for (let i = 0; i < step; i++) {
      let rnd = Math.floor(Math.random() * 9);
      number += rnd;
    }
    setNumber(number);
    setStep(step + 1);
  }
  function startGuessing() {
    setShow(!show);
    console.log(chosen);
    console.log(time);
    countDown();
  }
  function checkingGuess(e) {
    e.preventDefault();
    setShow(!show);

    if (chosen == number) {
      rndNumber();
      setTime(20);
      setChosen("");
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
      setChosen("");
      reset();
    }
  }
  function reset() {
    setShow(true);
    setNumber("");
    setStep(1);
    setTime(20);
  }
  function countDown() {
    setTimeout(setTime(time - 1), 1000);
  }
  useEffect(() => {
    if (time != 20) {
      const timer = time > 0 && setInterval(() => setTime(time - 1), 1000);
      if (time == 0) {
        alert("Time run out");
        reset();
      }
      return () => clearInterval(timer);
    }
  }, [time]);

  return (
    <>
      <ReactNotifications />
      <header className={styles.header}>
        <h1>Number Remembering</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.box}>
          <div className={styles.lvlTimeBox}>
            <div className={styles.lvlSide}>Level : {step - 1}</div>
            <div className={styles.timeSide}>Time : {time}</div>
          </div>

          <div className={styles.number}>{show ? number : ""}</div>
          <form onSubmit={(e) => checkingGuess(e)} className={styles.form}>
            <label htmlFor="inputNumber" className={styles.label}>
              Write number{" "}
            </label>
            <input
              type="text"
              id="inputNumber"
              value={chosen}
              onChange={(e) => setChosen(e.target.value)}
              className={!show ? styles.active : styles.notActive}
            />

            <button
              type="submit"
              className={!show ? styles.active : styles.notActive}
            >
              Send
            </button>
          </form>
          <div className={styles.buttonBox}>
            <button
              onClick={rndNumber}
              className={step == 1 ? styles.active : styles.notActive}
              style={{
                borderColor: "rgb(170, 170, 234)",
                border: "solid",
                borderRadius: "10px",
                width: "45%",
                height: "80%",
              }}
            >
              get number
            </button>
            <button
              onClick={startGuessing}
              className={show && step != 1 ? styles.active : styles.notActive}
              style={{
                borderColor: "rgb(170, 170, 234)",
                border: "solid",
                borderRadius: "10px",
                width: "45%",
                height: "80%",
              }}
            >
              start guessing
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
