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
    this.bindedHandleMouseup = this.handleMouseup.bind(this);
    this.bindedHandleMousemove = this.handleMousemove.bind(this);

    this.updateCanvas();
  }

  // update canvas
  updateCanvas() {
    // clear canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // draw again
    this.context.fillStyle = "beige";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "red";
    this.context.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
  }
  // check if coordinate is inside of a rect
  clickedInsideOfRect(coordX, coordY, rect) {
    return (
      rect.x <= coordX &&
      coordX <= rect.x + rect.w &&
      rect.y <= coordY &&
      coordY < rect.y + rect.h
    );
  }

  handleMousedown(e) {
    // can drag when mouse is down && inside of rect
    if (this.clickedInsideOfRect(e.clientX, e.clientY, this.rect)) {
      this.isDragging = true;
    }
  }
  handleMouseup(e) {
    this.isDragging = false;
  }
  handleMousemove(e) {
    if (this.isDragging) {
      this.rect.x = e.clientX;
      this.rect.y = e.clientY;
      this.updateCanvas();
    }
  }

  // add event listener
  addListener() {
    // this.canvas.addEventListener("mousedown", this.handleMousedown.bind(this));
    this.canvas.addEventListener("mousedown", this.bindedHandleMousedown);
    this.canvas.addEventListener("mouseup", this.bindedHandleMouseup);
    this.canvas.addEventListener("mousemove", this.bindedHandleMousemove);
  }

  // remove event listener
  removeListener() {
    this.canvas.removeEventListener("mousedown", this.bindedHandleMousedown);
    this.canvas.removeEventListener("mouseup", this.bindedHandleMouseup);
    this.canvas.removeEventListener("mousemove", this.bindedHandleMousemove);
  }
}
