import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
class Timer {
  secondsPassed = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increaseTimer() {
    this.secondsPassed += 1;
  }
}

const myTimer = new Timer();

const Test = observer(() => {
  useEffect(() => {
    const i = setInterval(() => {
      myTimer.secondsPassed += 1;
    }, 1000);

    return () => {
      clearInterval(i);
    };
  }, []);

  return <>{myTimer.secondsPassed}</>;
});

export default Test;
