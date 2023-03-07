import DrawControllerInstance from "../Controller/DrawController";

let instance;

class CanvasView {
  constructor() {
    if (instance) {
      throw new Error("New instance cannot be created!!");
    }
    instance = this;
  }

  init(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
  }

  // draw canvas
  draw() {
    const rects = DrawControllerInstance.rects;

    // clean
    this.context.fillStyle = "beige";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // draw new
    for (const rect of rects) {
      this.context.fillStyle = rect.color;
      this.context.fillRect(rect.pos.x, rect.pos.y, rect.w, rect.h);
    }
    this.drawTargetRect();
    this.drawDragBox();
    this.drawLines();

  }

  // draw stroke to rect
  drawTargetRect() {
    const targetRect = DrawControllerInstance.targetRect;
    const targets = DrawControllerInstance.targets;

    if (!targetRect && !targets.length) {
      return;
    }

    if (targetRect) {
      const {
        pos: { x, y },
        w,
        h,
      } = targetRect;
      this.context.strokeRect(x, y, w, h);
      return;
    }

    for (const target of targets) {
      const {
        pos: { x, y },
        w,
        h,
      } = target;
      this.context.strokeRect(x, y, w, h);
    }
  }

  // drag selection
  drawDragBox() {
    const dragBox = DrawControllerInstance.dragBox;
    if (dragBox) {
      CanvasViewInstance.context.strokeRect(
        dragBox.pos.x,
        dragBox.pos.y,
        dragBox.w,
        dragBox.h
      );
    }
  }

  drawALine(line) {
    this.context.beginPath();
    this.context.moveTo(line.x0, line.y0);
    this.context.lineTo(line.x1, line.y1);
    this.context.stroke();
  }

  drawLines() {
    const drawingLine = DrawControllerInstance.drawingLine;
    const lines = DrawControllerInstance.lines;

    if (drawingLine) {
      this.drawALine(drawingLine);
    }

    for (const line of lines) {
      this.drawALine(line)
    }
  }
}

const CanvasViewInstance = new CanvasView();
export default CanvasViewInstance;
