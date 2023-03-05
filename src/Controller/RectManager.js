import Rect from "../Model/Rect";

export default class RectManager {
  constructor(controller) {
    this.controller = controller;
  }

  // ============= Create ===============
  createRect() {
    const rects = this.controller.rects;
    rects.push(new Rect(10, 10, 100, 50, "#fff"));
    this.controller.targetRect = rects[rects.length - 1];
    this.controller.draw();
  }
  // ============= Edit ===============
  changeRectColor(color) {
    const controller = this.controller;
    const rects = this.controller.rects;
    if (controller.targetRect) {
      rects[rects.length - 1].color = color;
      controller.draw();
      controller.dataManager.delaySave();
    }
  }
  // ============= Delete ===============
  deleteRect() {
    if (this.controller.targetRect) {
      this.controller.rects.pop();
      this.controller.targetRect = null;
      this.controller.draw();
    }
  }
}
