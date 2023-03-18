import { action, makeAutoObservable, makeObservable, observable } from "mobx";

class Timer {
  constructor() {
    this.count = 0;
    makeAutoObservable(this);
  }

  increase() {
    this.count += 1;
  }
  decrease() {
    this.count -= 1;
  }
  reset() {
    this.count = 0;
  }
}

export default Timer;
