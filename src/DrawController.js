import { PANEL_WIDTH } from "./config";

class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  plus(v) {
    return new Vec2(this.x + v.x, this.y + v.y);
  }
  minus(v) {
    return new Vec2(this.x - v.x, this.y - v.y);
  }
  multiply(v) {
    return new Vec2(this.x * v.x, this.y * v.y);
  }
}

class Rect {
  constructor(x, y, w, h, color) {
    this.pos = new Vec2(x, y);
    this.w = w;
    this.h = h;
    this.color = color;
  }

  // check is mouse inside of rect
  containsPoint(point) {
    const { x, y } = this.pos;
    const { w, h } = this;
    return x < point.x && point.x < x + w && y < point.y && point.y < y + h;
  }
}

export default class DrawController {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.isDragging = false;
    this.rects = [];
    this.targetRect = null;

    this.bindedHandleMousedown = this.handleMousedown.bind(this);
    this.bindedHandleMouseUp = this.handleMouseUp.bind(this);
    this.bindedHandleMouseMove = this.handleMouseMove.bind(this);
    // this.bindedHandleMouseMove = (e) => this.handleMouseMove(e);

    this.init(100);
    this.update();
  }

  getRandomVec() {
    return new Vec2(Math.random(), Math.random());
  }

  init(maxCount) {
    const canvasSize = new Vec2(this.canvas.width, this.canvas.height);
    const maxSize = new Vec2(200, 100);
    const minSize = new Vec2(10, 5);

    for (let i = 0; i < maxCount; i++) {
      const size = this.getRandomVec()
        .multiply(maxSize.minus(minSize))
        .plus(minSize);

      const pos = this.getRandomVec().multiply(canvasSize.minus(size));
      const color = "hsl(" + 360 * Math.random() + ", 50%, 50%)";

      this.rects.push(new Rect(pos.x, pos.y, size.x, size.y, color));
    }
    console.log(this.rects);
  }

  // update canvas
  update() {
    // clean
    this.context.fillStyle = "beige";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // update new
    for (const rect of this.rects) {
      this.context.fillStyle = rect.color;
      this.context.fillRect(rect.pos.x, rect.pos.y, rect.w, rect.h);
    }
  }

  // create vector of mouse x, y
  getMousePos(e) {
    return new Vec2(e.clientX - PANEL_WIDTH, e.clientY);
  }

  toTop(i) {
    const target = this.rects[i];
    this.rects.splice(i, 1);
    this.rects.push(target);
  }

  handleMousedown(e) {
    const mouseVec = this.getMousePos(e);

    for (let i = this.rects.length - 1; i >= 0; i--) {
      const rect = this.rects[i];
      // find target rect
      if (rect.containsPoint(mouseVec)) {
        this.isDragging = true;
        this.offset = rect.pos.minus(mouseVec);
        this.targetRect = rect;
        // let target to be on top
        this.toTop(i);
        break;
      }
    }
  }

  handleMouseUp() {
    this.isDragging = false;
  }

  handleMouseMove(e) {
    if (this.isDragging) {
      const mouseVec = this.getMousePos(e);
      // set position of rect (mouse position + offset)
      this.targetRect.pos = mouseVec.plus(this.offset);
      // update again
      this.update();
    }
  }

  addEventListeners() {
    this.canvas.addEventListener("mousedown", this.bindedHandleMousedown);
    this.canvas.addEventListener("mouseup", this.bindedHandleMouseUp);
    this.canvas.addEventListener("mousemove", this.bindedHandleMouseMove);
  }

  removeEventListeners() {
    this.canvas.removeEventListener("mousedown", this.bindedHandleMousedown);
    this.canvas.removeEventListener("mouseup", this.bindedHandleMouseUp);
    this.canvas.removeEventListener("mousemove", this.bindedHandleMouseMove);
  }
}
