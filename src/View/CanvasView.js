import { constants, SHAPE_STATUS } from "../Common/constants";
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

  // render canvas
  render() {
    const rects = DrawControllerInstance.rects;
    // clean
    this.context.fillStyle = "beige";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // render new
    for (const rect of rects) {
      const shape = rect.shape;
      this.context.fillStyle = rect.color;
      this.context.fillRect(shape.pos.x, shape.pos.y, shape.w, shape.h);
      // render selected stroke and ports
      if (rect.status === SHAPE_STATUS.SELECTED) {
        this.context.strokeRect(shape.pos.x, shape.pos.y, shape.w, shape.h);
      }
      // render ports
      for (const port of rect.getActivePorts()) {
        this.context.fillStyle = port.color;
        this.context.fillRect(
          port.globalPos.x,
          port.globalPos.y,
          constants.PORT_SIZE,
          constants.PORT_SIZE
        );
      }
    }
    // this.drawTargetRect();
    this.drawDragBox();
    this.drawLines();
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
    const halfPortSize = constants.PORT_SIZE / 2;

    const start = line.startPort.globalPos;
    const end = line.endPort.globalPos;

    this.context.beginPath();
    this.context.moveTo(start.x + halfPortSize, start.y + halfPortSize);
    this.context.lineTo(end.x + halfPortSize, end.y + halfPortSize);
    this.context.stroke();
  }

  drawLines() {
    const lines = DrawControllerInstance.lines;
    for (const line of lines) {
      this.drawALine(line);
    }
  }
}

const CanvasViewInstance = new CanvasView();
export default CanvasViewInstance;
