import CanvasViewInstance from "../View/CanvasView";

export default class RectManager {
  constructor(controller) {
    this.controller = controller;
  }

  changeRectColor(color) {
    const controller = this.controller;
    const rects = this.controller.rects;
    if (controller.targetRect) {
      rects[rects.length - 1].color = color;
      CanvasViewInstance.update();
      controller.dataManager.delaySave();
    }
  }
}
