import { Consts } from "../Common/consts";
import Rect from "../Model/Rect";
import Vec2 from "../Model/Vec2";
import CanvasViewInstance from "../View/CanvasView";
import DrawControllerInstance from "./DrawController";

export default class InputManager {
  constructor(controller) {
    this.controller = controller;
    this.isDragging = false;
    this.isLining = false;
    this.bindedHandleMousedown = this.handleMousedown.bind(this);
    this.bindedHandleMouseUp = this.handleMouseUp.bind(this);
    this.bindedHandleMouseMove = this.handleMouseMove.bind(this);
    this.bindedHandleKeyDown = this.handleKeyDown.bind(this);
  }

  addEventListeners() {
    const canvas = CanvasViewInstance.canvas;
    canvas.addEventListener("mousedown", this.bindedHandleMousedown);
    canvas.addEventListener("mouseup", this.bindedHandleMouseUp);
    canvas.addEventListener("mousemove", this.bindedHandleMouseMove);
    window.addEventListener("keydown", this.bindedHandleKeyDown);
  }

  removeEventListeners() {
    const canvas = CanvasViewInstance.canvas;
    canvas.removeEventListener("mousedown", this.bindedHandleMousedown);
    canvas.removeEventListener("mouseup", this.bindedHandleMouseUp);
    canvas.removeEventListener("mousemove", this.bindedHandleMouseMove);
    window.removeEventListener("keydown", this.bindedHandleKeyDown);
  }

  // create vector of mouse x, y
  getMousePos(e) {
    return new Vec2(e.clientX - Consts.PANEL_WIDTH, e.clientY);
  }

  handleMousedown(e) {
    const controller = this.controller;
    const rects = controller.rects;

    // const lastTargetRect = this.controller.targetRect;

    // clear previous targets
    for (const target of controller.targets) {
      target.isSelected = false;
    }
    controller.targets = [];

    this.startDragPoint = this.getMousePos(e);
    this.isDragging = true;

    for (let i = rects.length - 1; i >= 0; i--) {
      const rect = rects[i];
      // find target rect
      if (rect.contains(this.startDragPoint)) {
        this.offset = rect.pos.minus(this.startDragPoint);
        // set targets
        controller.targets = [rect];
        rect.isSelected = true;
        // let target to be on top
        controller.toTop(i);
        controller.dataManager.delaySave();
        break;
      }
    }
    // draw when there is change
    // if (lastTargetRect !== controller.targetRect) {
    controller.draw();
    // }
  }

  handleMouseUp() {
    this.isDragging = false;

    if (this.controller.dragBox) {
      for (const rect of this.controller.rects) {
        if (rect.isInsideDragBox()) {
          this.controller.targets.push(rect);
          rect.isSelected = true;
        }
      }
    }
    // console.log(this.controller.targets);

    // drag line
    if (this.lining && this.endDragPoint) {
      DrawControllerInstance.lines.push({
        x0: this.startDragPoint.x,
        y0: this.startDragPoint.y,
        x1: this.endDragPoint.x,
        y1: this.endDragPoint.y,
      });
    }

    this.startDragPoint = null;
    this.endDragPoint = null;
    this.controller.dragBox = null;
    this.controller.draw();
  }

  handleMouseMove(e) {
    if (this.isDragging) {
      this.endDragPoint = this.getMousePos(e);
      // move targets
      if (this.controller.targets.length) {
        // set position of rect (mouse position + offset)
        for (const target of this.controller.targets) {
          target.pos = this.endDragPoint.plus(this.offset);
        }
        // this.controller.targetRect.pos = this.endDragPoint.plus(this.offset);
      }
      // drag box
      else if (this.startDragPoint && !this.isLining) {
        // drag selection size
        const size = this.endDragPoint.minus(this.startDragPoint);

        this.controller.dragBox = new Rect(
          this.startDragPoint.x,
          this.startDragPoint.y,
          size.x,
          size.y
        );
      }
      // draw line
      else if (this.startDragPoint && this.isLining) {
        this.controller.drawingLine = {
          x0: this.startDragPoint.x,
          y0: this.startDragPoint.y,
          x1: this.endDragPoint.x,
          y1: this.endDragPoint.y,
        };
        CanvasViewInstance.drawLines();
      }

      // draw again
      this.controller.draw();
      this.controller.dataManager.delaySave();
    }
  }

  handleKeyDown(e) {
    if (e.key === "Delete") {
      DrawControllerInstance.rectManager.deleteRect();
    }
  }
}
