import "./index.css";
import ProgressBar from "./progressBar.js";
import React, { useEffect, useState } from "react";
import moment from "moment";

function App() {
  const startTime = moment("2025-08-25T00:00:00");
  const endTime = moment("2025-05-16T00:00:00");
  const totalTime = moment.duration(endTime.diff(startTime));
  const totalSeconds = totalTime.asSeconds();

  const [currentTime, setCurrentTime] = useState(
    moment().format("YYYY-MM-DD HH:mm:ss")
  );

  const calcElapsed = () => {
    const now = moment();
    const remainingTime = moment.duration(endTime.diff(now));
    const elapsedTime = moment.duration(totalTime - remainingTime);
    if (elapsedTime >= totalTime) {
      return totalTime;
    }
    return elapsedTime;
  };

  const [elapsedTime, setElapsedTime] = useState(calcElapsed);

  useEffect(() => {
    const updateTime = () => {
      const now = moment().format("YYYY-MM-DD HH:mm:ss");
      setCurrentTime(now);
      console.log(now);
    };

    const myInterval = setInterval(updateTime, 100);

    return () => clearInterval(myInterval);
  }, []);

  useEffect(() => {
    const updateElap = () => {
      // const now = moment();
      setElapsedTime(calcElapsed);
      // console.log(now);
    };

    const myInterval = setInterval(updateElap, 100);

    return () => clearInterval(myInterval);
  }, []);

  return (
    <div className="App">
      <header className="header poppins-bold">
        <p>{(elapsedTime.asSeconds() / totalSeconds) * 100}% </p>
      </header>

      <div className="progress-container">
        <ProgressBar value={(elapsedTime.asSeconds() / totalSeconds) * 100} />
      </div>

      <header className="subheading">
        <p>Of School Year Complete</p>
      </header>

      {/* <p>Current moment is: {currentTime} </p>
      <p>Current elapsed time is: {elapsedTime.asSeconds()} </p>
      <p>Current percentage done: {elapsedTime.asSeconds()/totalSeconds * 100}% </p>
      <p>The total time in India is: {totalSeconds} </p> */}
    </div>
  );
}

export default App;
