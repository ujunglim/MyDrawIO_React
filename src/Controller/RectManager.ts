import RectShape from "../Model/RectShape";
import DrawController from './DrawController';

export default class RectShapeManager {
  private controller: DrawController;
  constructor(controller: DrawController) {
    this.controller = controller;
  }

  // ============= Create ===============
  createRect() {
    const rects = this.controller.graph.rects;
    rects.push(new RectShape(10, 10, 100, 70, "beige"));
    this.controller.targets = [rects[rects.length - 1]];
    this.controller.render();
    this.controller.dataManager.delaySave();
  }
  
  // ============= Edit ===============
  changeRectColor(color: string) {
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
      this.controller.graph.rects.pop();
      this.controller.targets.pop();
      this.controller.render();
      this.controller.dataManager.delaySave();
    }
  }
}