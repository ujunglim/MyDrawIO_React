import { constants } from "../Common/constants";
import DrawController from './DrawController';

// load and save data
export default class DataManager {
  private controller: DrawController;
  private timeToSave: number;

  constructor(controller: DrawController) {
    this.controller = controller;
    this.timeToSave = -1;

    setInterval(() => {
      if (this.timeToSave > 0 && Date.now() >= this.timeToSave) {
        this.timeToSave = -1; // disable
        // localStorage.setItem("rects", JSON.stringify(this.controller.rects));
        console.log("saved!");
      }
    }, 1000);
  }

  public delaySave(): void {
    this.timeToSave = Date.now() + constants.DELAY_SAVE_TIME;
  }
}
