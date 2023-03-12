import RectShape from "../Model/Rect";

export default class RectShapeManager {
  constructor(controller) {
    this.controller = controller;
  }

  // ============= Create ===============
  createRect() {
    const rects = this.controller.rects;
    rects.push(new RectShape(10, 10, 100, 50, "#fff"));
    this.controller.targets = rects[rects.length - 1];
    this.controller.render();
    this.controller.dataManager.delaySave();
  }
  // ============= Edit ===============
  changeRectColor(color) {
    const controller = this.controller;
    if (!controller.targets.length) {
      return;
    }
    for (const target of controller.targets) {
      target.color = color;
    }
    controller.render();
    controller.dataManager.delaySave();
  }
  // ============= Delete ===============
  deleteRect() {
    if (this.controller.targets.length) {
      this.controller.rects.pop();
      this.controller.targets.pop();
      this.controller.render();
      this.controller.dataManager.delaySave();
    }
  }
}
