class Rect {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
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
    this.context.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
  }

  // check is mouse inside of rect
  clickedInsideOfRect(mouseX, mouseY) {
    const { x, y, w, h } = this.rect;
    return x < mouseX && mouseX < x + w && y < mouseY && mouseY < y + h;
  }

  handleMousedown(e) {
    if (this.clickedInsideOfRect(e.clientX, e.clientY)) {
      this.isDragging = true;
    }
  }

  handleMouseUp() {
    this.isDragging = false;
  }

  handleMouseMove(e) {
    if (this.isDragging) {
      // set position of rect
      this.rect.x = e.clientX;
      this.rect.y = e.clientY;
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
