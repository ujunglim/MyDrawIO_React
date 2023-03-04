import { Consts } from "../Common/consts";

// load and save data
export default class DataManager {
  constructor(controller) {
    this.controller = controller;
    this.timeToSave = -1;

    setInterval(() => {
      if (this.timeToSave > 0 && Date.now() >= this.timeToSave) {
        this.timeToSave = -1; // disable
        localStorage.setItem("rects", JSON.stringify(this.controller.rects));
        console.log("saved!");
      }
    }, 1000);
  }

  delaySave() {
    this.timeToSave = Date.now() + Consts.DELAY_SAVE_TIME;
  }
}
