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
}

class Rect {
  constructor(x, y, w, h) {
    this.pos = new Vec2(x, y);
    this.w = w;
    this.h = h;
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
    this.rect = new Rect(10, 10, 50, 50);
    this.isDragging = false;

    this.bindedHandleMousedown = this.handleMousedown.bind(this);
    this.bindedHandleMouseUp = this.handleMouseUp.bind(this);
    this.bindedHandleMouseMove = this.handleMouseMove.bind(this);
    // this.bindedHandleMouseMove = (e) => this.handleMouseMove(e);

    this.draw();
  }

  // draw canvas
  draw() {
    // clean
    this.context.fillStyle = "beige";
    this.context.fillRect(0, 0, 1000, 1000);
    // draw new
    this.context.fillStyle = "red";
    this.context.fillRect(
      this.rect.pos.x,
      this.rect.pos.y,
      this.rect.w,
      this.rect.h
    );
  }

  // create vector of mouse x, y
  getMousePos(e) {
    return new Vec2(e.clientX, e.clientY);
  }

  handleMousedown(e) {
    const mouseVec = this.getMousePos(e);

    if (this.rect.containsPoint(mouseVec)) {
      this.isDragging = true;
      this.offset = this.rect.pos.minus(mouseVec);
    }
  }

  handleMouseUp() {
    this.isDragging = false;
  }

  handleMouseMove(e) {
    if (this.isDragging) {
      const mouseVec = this.getMousePos(e);
      // set position of rect (mouse position + offset)
      this.rect.pos = mouseVec.plus(this.offset);
      // draw again
      this.draw();
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
