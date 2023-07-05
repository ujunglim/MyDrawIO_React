import {
  constants,
  MOUSE_STATUS,
  PORT_TYPE,
  SHAPE_STATUS,
} from "../Common/constants";
import Line from "../Model/Line";
import Port from "../Model/Ports";
import Rect from "../Model/Rect";
import Vec2 from "../Model/Vec2";
import DrawController from './DrawController';
import RectShape from '../Model/RectShape';

export default class InputManager {
  private controller: DrawController;
  private isLining: boolean = false;
  private drawingLine: Line | null = null;
  private bindedHandleMousedown: any;
  private bindedHandleMouseUp: any;
  private bindedHandleMouseMove: any;
  private bindedHandleKeyDown: any;
  private mouseStatus: MOUSE_STATUS = MOUSE_STATUS.NONE;
  private mouseMoveStrategy: { [key in MOUSE_STATUS]: (pos: Vec2) => void };
  private mouseStartPos: Vec2 | null = null;
  private hoveringShape: RectShape | null = null;
  private offset: Vec2 | null = null;

  constructor(controller: DrawController) {
    this.controller = controller;
    this.bindedHandleMousedown = this.handleMousedown.bind(this);
    this.bindedHandleMouseUp = this.handleMouseUp.bind(this);
    this.bindedHandleMouseMove = this.handleMouseMove.bind(this);
    this.bindedHandleKeyDown = this.handleKeyDown.bind(this);

    // mouse move strategy
    const strategy = {} as { [key in MOUSE_STATUS]: (pos: Vec2) => void };
    strategy[MOUSE_STATUS.NONE] = this.checkHover.bind(this);
    strategy[MOUSE_STATUS.DOWN_SHAPE] = this.moveTarget.bind(this);
    strategy[MOUSE_STATUS.DOWN_CANVAS] = this.dragBox.bind(this);
    strategy[MOUSE_STATUS.DOWN_PORT_LINE] = this.drawLine.bind(this);
    this.mouseMoveStrategy = strategy;
  }

  addEventListeners(dom: HTMLElement) {
    dom.addEventListener("mousedown", this.bindedHandleMousedown);
    dom.addEventListener("mouseup", this.bindedHandleMouseUp);
    dom.addEventListener("mousemove", this.bindedHandleMouseMove);
    window.addEventListener("keydown", this.bindedHandleKeyDown);
  }

  removeEventListeners(dom: HTMLElement) {
    dom.removeEventListener("mousedown", this.bindedHandleMousedown);
    dom.removeEventListener("mouseup", this.bindedHandleMouseUp);
    dom.removeEventListener("mousemove", this.bindedHandleMouseMove);
    window.removeEventListener("keydown", this.bindedHandleKeyDown);
  }

  // create vector of mouse x, y
  private getMousePos(e: MouseEvent) {
    return new Vec2(e.clientX - constants.PANEL_WIDTH, e.clientY - constants.HEADER_HEIGHT);
  }

  // check collision to port or rect shape
  private checkRectShapePortCollision(
    point: Vec2,
    onInsideRectShape: (rect: RectShape, index: number) => void,
    onInsidePort: (port: Port) => void
  ) {
    for (let i = this.controller.graph.rects.length - 1; i >= 0; i--) {
      const rect = this.controller.graph.rects[i];

      // shape
      if (rect.boundingBox && rect.boundingBox.contain(point)) {
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
  private handleMousedown(e: MouseEvent) {
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
        this.offset = rect.shape && rect.shape.pos.minus(mousePos);
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
          this.controller.graph.lines.push(this.drawingLine);
          // this.boardRef.setLines([...this.controller.lines]);
        }
        // this.controller.inputEventManager.onSelectPort(port);
      }
    );
    this.controller.render();
    this.controller.dataManager.delaySave();
  }

  handleMouseMove(e: MouseEvent) {
    this.mouseMoveStrategy[this.mouseStatus](this.getMousePos(e));
    // render
    this.controller.render();
    this.controller.dataManager.delaySave();
  }

  handleMouseUp(e: MouseEvent) {
    this.mouseStatus = MOUSE_STATUS.NONE;
    const mousePos = this.getMousePos(e);

    // select rects inside of dragbox
    if (this.controller.dragBox) {
      for (const rect of this.controller.graph.rects) {
        if (this.controller.dragBox.containRect(rect.boundingBox)) {
          this.controller.targets.push(rect);
          // change this.rects
          // rect.isSelected = true;
          rect.status = SHAPE_STATUS.SELECTED;
        }
      }
    }

    if (this.drawingLine) {
      this.checkRectShapePortCollision(
        mousePos,
        (rect, i) => {
          this.drawingLine && (this.drawingLine.endPort = rect.getTopPort())
        },
        (port) => {
          this.drawingLine && (this.drawingLine.endPort = port)
        }
      );
    }

    // reset
    this.mouseStartPos = null;
    // this.mouseEndPos = null;
    this.mouseStatus = MOUSE_STATUS.NONE;
    this.controller.dragBox = null;
    this.drawingLine = null;
    // this.boardRef.setDragbox(null);
    this.controller.render();
  }

  handleKeyDown(e: any) {
    if (e.key === "Delete") {
      this.controller.rectManager.deleteRect();
    }
  }

  // ===================== Mouse move strategy ========================
  // [STRATEGY] MOUSE_STATUS.NONE
  checkHover(mouseVec: Vec2) {
    let hoveringShape = this.controller.hoveringShape;
    // [clear previous hovering shape] there is a hovering shape, but mouse is not inside
    if (hoveringShape && !hoveringShape?.boundingBox?.contain(mouseVec)) {
      hoveringShape.status = SHAPE_STATUS.NONE;
      this.controller.hoveringShape = null;
    }

    // [hover] when there is no hovering shape, then find one
    if (!hoveringShape) {
      for (let i = this.controller.graph.rects.length - 1; i >= 0; i--) {
        const rect = this.controller.graph.rects[i];
        if (
          rect?.boundingBox?.contain(mouseVec) &&
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
  moveTarget(mouseVec: Vec2) {
    // set position of rect (mouse position + offset)
    for (const target of this.controller.targets) {
      target.setPos(mouseVec.plus(this.offset));
    }
  }

  // [STRATEGY] MOUSE_STATUS.DOWN_CANVAS
  dragBox(mouseVec: Vec2) {
    // drag selection size
    const size = mouseVec.minus(this.mouseStartPos);

    this.controller.dragBox = new Rect(
      this.mouseStartPos!.x,
      this.mouseStartPos!.y,
      size.x,
      size.y
    );
    // this.boardRef.setDragbox(this.controller.dragBox);
  }

  // [STRATEGY] MOUSE_STATUS.DOWN_PORT_LINE
  drawLine(mouseVec: Vec2) {
    const endPort = this?.drawingLine?.endPort;
    endPort.globalPos = mouseVec;
    // CanvasViewInstance.drawLines();
    this.checkHover(mouseVec);
  }
}
