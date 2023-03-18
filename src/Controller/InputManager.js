import {
  constants,
  MOUSE_STATUS,
  PORT_TYPE,
  SHAPE_STATUS,
} from "../Common/constants";
import graphInstance from "../Model/Graph";
import Line from "../Model/Line";
import Port from "../Model/Port";
import Rect from "../Model/Rect";
import Vec2 from "../Model/Vec2";
import CanvasViewInstance from "../View/CanvasView";
import DrawControllerInstance from "./DrawController";

export default class InputManager {
  constructor(controller) {
    this.controller = controller;
    this.isLining = false;
    this.drawingLine = null;
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

  addEventListeners(dom) {
    dom.addEventListener("mousedown", this.bindedHandleMousedown);
    dom.addEventListener("mouseup", this.bindedHandleMouseUp);
    dom.addEventListener("mousemove", this.bindedHandleMouseMove);
    window.addEventListener("keydown", this.bindedHandleKeyDown);
  }

  removeEventListeners(dom) {
    dom.removeEventListener("mousedown", this.bindedHandleMousedown);
    dom.removeEventListener("mouseup", this.bindedHandleMouseUp);
    dom.removeEventListener("mousemove", this.bindedHandleMouseMove);
    window.removeEventListener("keydown", this.bindedHandleKeyDown);
  }

  // create vector of mouse x, y
  getMousePos(e) {
    return new Vec2(e.clientX - constants.PANEL_WIDTH, e.clientY);
  }

  // check collision to port or rect shape
  checkRectShapePortCollision(point, onInsideRectShape, onInsidePort) {
    for (let i = this.controller.rects.length - 1; i >= 0; i--) {
      const rect = this.controller.rects[i];

      // shape
      if (rect.boundingBox.contain(point)) {
        let isPortTouched = false;
        // port
        let ports = rect.getActivePorts();
        for (const port of ports) {
          if (port.contain(point)) {
            isPortTouched = true;
            onInsidePort(port);
            break;
          }
        }
        if (!isPortTouched) {
          onInsideRectShape(rect, i);
        }
        break;
      }
    }
  }

  // ==================== events ==========================
  handleMousedown(e) {
    const mousePos = this.getMousePos(e);
    this.mouseStartPos = mousePos;
    // CLEAR
    this.mouseStatus = MOUSE_STATUS.DOWN_CANVAS;
    for (const target of this.controller.targets) {
      target.status = SHAPE_STATUS.NONE;
    }
    this.controller.targets = [];
    this.hoveringShape = null;

    this.checkRectShapePortCollision(
      mousePos,
      (rect, i) => {
        this.controller.hoveringShape = null;
        this.mouseStatus = MOUSE_STATUS.DOWN_SHAPE;
        rect.status = SHAPE_STATUS.SELECTED;
        this.offset = rect.shape.pos.minus(mousePos);
        this.controller.targets = [rect];
        this.controller.toTop(i);
      },
      (port) => {
        if (port.type === PORT_TYPE.RESIZE) {
          this.mouseStatus = MOUSE_STATUS.DOWN_PORT_RESIZE;
        } else {
          this.mouseStatus = MOUSE_STATUS.DOWN_PORT_LINE;
          this.drawingLine = new Line(
            port,
            new Port(null, mousePos.x, mousePos.y, null)
          );
          this.controller.lines.push(this.drawingLine);
          graphInstance.lines = this.controller.lines;
          // this.boardRef.setLines([...this.controller.lines]);
        }
        // this.controller.inputEventManager.onSelectPort(port);
      }
    );
    this.controller.render();
    graphInstance.rects = this.controller.rects;
    this.controller.dataManager.delaySave();
  }

  handleMouseMove(e) {
    this.mouseMoveStrategy[this.mouseStatus](this.getMousePos(e));
    // render
    this.controller.render();
    graphInstance.rects = this.controller.rects;
    this.controller.dataManager.delaySave();
  }

  handleMouseUp(e) {
    this.mouseStatus = MOUSE_STATUS.NONE;
    const mousePos = this.getMousePos(e);

    // select rects inside of dragbox
    if (this.controller.dragBox) {
      for (const rect of this.controller.rects) {
        if (this.controller.dragBox.containRect(rect.boundingBox)) {
          console.log('====')
          this.controller.targets.push(rect);
          console.log(this.controller.targets)
          // change this.rects
          rect.isSelected = true;
        }
      }
    }

    if (this.drawingLine) {
      this.checkRectShapePortCollision(
        mousePos,
        (rect, i) => {
          this.drawingLine.endPort = rect.getTopPort();
        },
        (port) => {
          this.drawingLine.endPort = port;
        }
      );
    }

    // reset
    this.mouseStartPos = null;
    // this.mouseEndPos = null;
    this.status = MOUSE_STATUS.NONE;
    this.controller.dragBox = null;
    this.drawingLine = null;
    // this.boardRef.setDragbox(null);
    this.controller.render();
    graphInstance.rects = this.controller.rects;
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
      this.controller.hoveringShape = null;
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
    graphInstance.rects = this.controller.rects;
  }

  // [STRATEGY] MOUSE_STATUS.DOWN_SHAPE
  moveTarget(mouseVec) {
    // set position of rect (mouse position + offset)
    for (const target of this.controller.targets) {
      target.setPos(mouseVec.plus(this.offset));
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
    // this.boardRef.setDragbox(this.controller.dragBox);
  }

  // [STRATEGY] MOUSE_STATUS.DOWN_PORT_LINE
  drawLine(mouseVec) {
    const endPort = this.drawingLine.endPort;
    endPort.globalPos = mouseVec;
    // CanvasViewInstance.drawLines();
    this.checkHover(mouseVec);
  }
}
