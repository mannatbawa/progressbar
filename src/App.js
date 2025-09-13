import "./index.css";
import ProgressBar from "./progressBar.js";
import React, { useEffect, useState } from "react";
import moment from "moment";

function App() {
  const startTime = moment("2025-08-25T00:00:00");
  const endTime = moment("2026-05-01T00:00:00");
  const totalTime = moment.duration(endTime.diff(startTime));
  const totalSeconds = totalTime.asSeconds();

  const [currentTime, setCurrentTime] = useState(
    moment().format("YYYY-MM-DD HH:mm:ss")
  );

  const [elapsedTime, setElapsedTime] = useState(() => {
    const now = moment();
    const elapsedTime = moment.duration(now.diff(startTime));
    if (elapsedTime >= totalTime) {
      return totalTime;
    }
    if (elapsedTime < 0) {
      return moment.duration(0);
    }
    return elapsedTime;
  });

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
      const now = moment();
      const elapsedTime = moment.duration(now.diff(startTime));
      let newElapsedTime;
      if (elapsedTime >= totalTime) {
        newElapsedTime = totalTime;
      } else if (elapsedTime < 0) {
        newElapsedTime = moment.duration(0);
      } else {
        newElapsedTime = elapsedTime;
      }
      setElapsedTime(newElapsedTime);
    };

    const myInterval = setInterval(updateElap, 100);

    return () => clearInterval(myInterval);
  }, [startTime, totalTime]);

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
