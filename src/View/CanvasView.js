import { constants } from "../Common/constants";
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
      // draw selected stroke and ports
      if (rect.isSelected || rect.isHovered) {
        const {
          pos: { x, y },
          w,
          h,
        } = rect;
        this.context.strokeRect(x, y, w, h);

        // draw outer stroke
        // const {pos, outer_w, outer_h} = rect.outerRect;
        // this.context.strokeRect(pos.x, pos.y, outer_w, outer_h);

        // draw ports
        for (const port of rect.ports) {
          this.context.fillStyle = 'blue';
          this.context.fillRect(port.globalPos.x, port.globalPos.y, constants.PORT_SIZE, constants.PORT_SIZE)
        }
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

  drawALine (line) {
    const halfPortSize = constants.PORT_SIZE / 2;

    this.context.beginPath();
    this.context.moveTo(line.startPoint.x + halfPortSize, line.startPoint.y + halfPortSize);
    this.context.lineTo(line.endPoint.x + halfPortSize, line.endPoint.y + halfPortSize);
    this.context.stroke();
  }

  drawLines() {
    const drawingLine = DrawControllerInstance.drawingLine;
    const lines = DrawControllerInstance.lines;

    if (drawingLine) {
      this.drawALine(drawingLine);
    }

    for (const line of lines) {
      this.drawALine(line);
    }
  }
}

const CanvasViewInstance = new CanvasView();
export default CanvasViewInstance;
