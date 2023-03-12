import {
  constants,
  MOUSE_STATUS,
  PORT_TYPE,
  SHAPE_STATUS,
} from "../Common/constants";
import Line from "../Model/Line";
import Rect from "../Model/Rect";
import Vec2 from "../Model/Vec2";
import CanvasViewInstance from "../View/CanvasView";
import DrawControllerInstance from "./DrawController";

export default class InputManager {
  constructor(controller) {
    this.controller = controller;
    this.isLining = false;
    this.lineStartPort = null;
    this.bindedHandleMousedown = this.handleMousedown.bind(this);
    this.bindedHandleMouseUp = this.handleMouseUp.bind(this);
    this.bindedHandleMouseMove = this.handleMouseMove.bind(this);
    this.bindedHandleKeyDown = this.handleKeyDown.bind(this);

    // mouse move strategy
    this.mouseStatus = MOUSE_STATUS.NONE;
    const strategy = {};
    strategy[MOUSE_STATUS.NONE] = this.checkHover.bind(this);
    strategy[MOUSE_STATUS.DOWN_SHAPE] = this.moveTarget.bind(this);
    strategy[MOUSE_STATUS.DOWN_CANVAS] = this.dragBox.bind(this);
    strategy[MOUSE_STATUS.DOWN_PORT_LINE] = this.drawLine.bind(this);
    this.mouseMoveStrategy = strategy;
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
    return new Vec2(e.clientX - constants.PANEL_WIDTH, e.clientY);
  }

  // ==================== events ==========================
  handleMousedown(e) {
    const mousePos = this.getMousePos(e);
    // CLEAR
    this.mouseStatus = MOUSE_STATUS.NONE;
    for (const target of this.controller.targets) {
      target.isSelected = false;
    }
    this.controller.targets = [];
    // this.hoveringShape = null;

    // clicked shape or port
    for (let i = this.controller.rects.length - 1; i >= 0; i--) {
      const rect = this.controller.rects[i];

      // shape
      if (rect.boundingBox.contain(mousePos)) {
        let isPortTouched = false;
        // port
        let ports = rect.getActivePorts();
        for (const port of ports) {
          if (port.contain(mousePos)) {
            isPortTouched = true;
            if (port.type === PORT_TYPE.RESIZE) {
              this.mouseStatus = MOUSE_STATUS.DOWN_PORT_RESIZE;
            } else {
              this.mouseStatus = MOUSE_STATUS.DOWN_PORT_LINE;
            }
            this.controller.inputEventManager.onSelectPort(port);
            break;
          }
        }
        if (!isPortTouched) {
          this.mouseStatus = MOUSE_STATUS.DOWN_SHAPE;
          rect.status = SHAPE_STATUS.SELECTED;
          this.offset = rect.shape.pos.minus(mousePos);
          this.controller.targets = [rect];
          this.controller.toTop(i);
        }
        break;
      }
    }
    this.controller.render();
    this.controller.dataManager.delaySave();
  }

  handleMouseMove(e) {
    console.log(this.mouseStatus);
    this.mouseMoveStrategy[this.mouseStatus](this.getMousePos(e));
    // render
    this.controller.render();
    this.controller.dataManager.delaySave();
  }

  handleMouseUp(e) {
    const currPos = this.getMousePos(e);
    this.mouseStatus = MOUSE_STATUS.NONE;

    // select rects inside of dragbox
    if (this.controller.dragBox) {
      for (const rect of this.controller.rects) {
        if (this.controller.dragBox.containRect(rect.boundingBox)) {
          this.controller.targets.push(rect);
          rect.isSelected = true;
        }
      }
    }

    // // create line
    // if (this.mouseStatus === MOUSE_STATUS.DOWN_PORT_LINE) {
    //   // find end port of line
    //   for (let i = this.controller.rects.length - 1; i >= 0; i--) {
    //     const rect = this.controller.rects[i];
    //     // find shape except itself
    //     if (rect.outerContains(currPos)) {
    //       for (const port of rect.ports) {
    //         if (port.contain(currPos)) {
    //           DrawControllerInstance.lines.push(
    //             new Line(this.lineStartPort, port)
    //           );
    //         }
    //       }
    //     }
    //   }
    // }

    // reset
    this.mouseStartPos = null;
    // this.mouseEndPos = null;
    this.isLining = false;
    this.controller.dragBox = null;
    this.controller.drawingLine = null;
    this.controller.render();
  }

  handleKeyDown(e) {
    if (e.key === "Delete") {
      DrawControllerInstance.rectManager.deleteRect();
    }
  }

  // ===================== Mouse move strategy ========================
  // [STRATEGY] MOUSE_STATUS.NONE
  checkHover(mouseVec) {
    let hoveringShape = this.controller.hoveringShape;
    // [clear previous hovering shape] there is a hovering shape, but mouse is not inside
    if (hoveringShape && !hoveringShape.boundingBox.contain(mouseVec)) {
      hoveringShape.status = SHAPE_STATUS.NONE;
      hoveringShape = null;
    }

    // [hover] when there is no hovering shape, then find one
    if (!hoveringShape) {
      for (let i = this.controller.rects.length - 1; i >= 0; i--) {
        const rect = this.controller.rects[i];
        if (
          rect.boundingBox.contain(mouseVec) &&
          rect.status === SHAPE_STATUS.NONE
        ) {
          rect.status = SHAPE_STATUS.HOVERED;
          this.controller.hoveringShape = rect;
          break;
        }
      }
    }
  }

  // [STRATEGY] MOUSE_STATUS.DOWN_SHAPE
  moveTarget(mouseVec) {
    // set position of rect (mouse position + offset)
    for (const target of this.controller.targets) {
      target.setPos(mouseVec.plus(this.offset));
      // update line position
      for (const line of this.controller.lines) {
        line.updateStartEndPoints();
      }
    }
  }

  // [STRATEGY] MOUSE_STATUS.DOWN_CANVAS
  dragBox(mouseVec) {
    // drag selection size
    const size = mouseVec.minus(this.mouseStartPos);

    this.controller.dragBox = new Rect(
      this.mouseStartPos.x,
      this.mouseStartPos.y,
      size.x,
      size.y
    );
  }

  // [STRATEGY] MOUSE_STATUS.DOWN_PORT_LINE
  drawLine(mouseVec) {
    this.controller.drawingLine = {
      startPoint: {
        x: this.lineStartPort.globalPos.x,
        y: this.lineStartPort.globalPos.y,
      },
      endPoint: {
        x: mouseVec.x,
        y: mouseVec.y,
      },
    };
    CanvasViewInstance.drawLines();
  }
}
