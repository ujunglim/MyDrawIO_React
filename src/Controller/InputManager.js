import { Consts } from "../Common/consts";
import Vec2 from "../Model/Vec2";
import CanvasViewInstance from "../View/CanvasView";

export default class InputManager {
  constructor(controller) {
    this.controller = controller;
    this.isDragging = false;
    this.bindedHandleMousedown = this.handleMousedown.bind(this);
    this.bindedHandleMouseUp = this.handleMouseUp.bind(this);
    this.bindedHandleMouseMove = this.handleMouseMove.bind(this);
  }

  addEventListeners() {
    const canvas = CanvasViewInstance.canvas;
    canvas.addEventListener("mousedown", this.bindedHandleMousedown);
    canvas.addEventListener("mouseup", this.bindedHandleMouseUp);
    canvas.addEventListener("mousemove", this.bindedHandleMouseMove);
  }

  removeEventListeners() {
    const canvas = CanvasViewInstance.canvas;
    canvas.removeEventListener("mousedown", this.bindedHandleMousedown);
    canvas.removeEventListener("mouseup", this.bindedHandleMouseUp);
    canvas.removeEventListener("mousemove", this.bindedHandleMouseMove);
  }

  // create vector of mouse x, y
  getMousePos(e) {
    return new Vec2(e.clientX - Consts.PANEL_WIDTH, e.clientY);
  }

  handleMousedown(e) {
    const controller = this.controller;
    const rects = controller.rects;

    const lastTargetRect = this.controller.targetRect;
    controller.targetRect = null;
    const mouseVec = this.getMousePos(e);

    for (let i = rects.length - 1; i >= 0; i--) {
      const rect = rects[i];
      // find target rect
      if (rect.containsPoint(mouseVec)) {
        this.isDragging = true;
        this.offset = rect.pos.minus(mouseVec);
        controller.targetRect = rect;
        // let target to be on top
        controller.toTop(i);
        controller.dataManager.delaySave();
        break;
      }
    }
    // update when there is change
    if (lastTargetRect !== controller.targetRect) {
      CanvasViewInstance.update();
    }
  }

  handleMouseUp() {
    this.isDragging = false;
  }

  handleMouseMove(e) {
    if (this.isDragging) {
      const mouseVec = this.getMousePos(e);
      // set position of rect (mouse position + offset)
      this.controller.targetRect.pos = mouseVec.plus(this.offset);
      // update again
      CanvasViewInstance.update();
      this.controller.dataManager.delaySave();
    }
  }
}
