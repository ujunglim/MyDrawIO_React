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

  // update canvas
  update() {
    const rects = DrawControllerInstance.rects;

    // clean
    this.context.fillStyle = "beige";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // update new
    for (const rect of rects) {
      this.context.fillStyle = rect.color;
      this.context.fillRect(rect.pos.x, rect.pos.y, rect.w, rect.h);
    }
    this.updateSelection();
  }

  // draw stroke to rect
  updateSelection() {
    const targetRect = DrawControllerInstance.targetRect;

    if (!targetRect) {
      return;
    }

    const {
      pos: { x, y },
      w,
      h,
    } = targetRect;
    // this.context.strokeStyle = "red";
    this.context.strokeRect(x, y, w, h);
  }
}

const CanvasViewInstance = new CanvasView();
export default CanvasViewInstance;
