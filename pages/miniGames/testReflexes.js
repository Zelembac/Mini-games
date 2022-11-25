import { useState } from "react";
import styles from "../../styles/testReflexes.module.css";
import Link from "next/link";

import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

export default function testReflexes() {
  const [firstTime, setFirstTime] = useState(0);
  const [reactionTime, setReactionTime] = useState("");
  const [color, setColor] = useState(true);
  let timeout;

  function getSecundTime() {
    let time = Date.now();
    if (firstTime == 0) {
      Store.addNotification({
        title: "Too soon!",
        message: "wait until it changes color",
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

      clearInterval(timeout);
      reset();
    } else {
      let difrence = time - firstTime;
      console.log(difrence);
      setReactionTime(difrence);
    }
  }
  function getTime() {
    if (color) {
      let rnd = Math.floor(Math.random() * 1000);
      timeout = setTimeout((e) => getingTime(), 2000 + rnd);
    } else {
      reset();
    }
  }
  function getingTime() {
    let time = Date.now();
    setFirstTime(time);
    setColor(false);
  }
  function reset() {
    setColor(true);
    setFirstTime(0);
    setReactionTime("");
  }

  return (
    <>
      <ReactNotifications />
      <header className={styles.header}>
        <h1>Test reflexes</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.box}>
          <div className={styles.text}>
            Click on it when it changes color as fast as you can{" "}
          </div>
          <div
            style={
              reactionTime > 0
                ? { cursor: "not-allowed", pointerEvents: "none" }
                : {}
            }
            className={color ? styles.red : styles.green}
            onClick={getSecundTime}
          >
            {reactionTime > 0 && reactionTime + " ms"}
          </div>
          <button onClick={getTime}>{color ? "Start" : "Restart"}</button>
        </div>

        <Link href={"/"} className={styles.homeLinks}>
          Home page
        </Link>
      </main>
      <footer className={styles.footer}>by Lazar Djurkovic</footer>
    </>
  );
}
