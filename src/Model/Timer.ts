import { action, makeAutoObservable, makeObservable, observable } from "mobx";

class Timer {
  count: number = 0;
  constructor() {
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
