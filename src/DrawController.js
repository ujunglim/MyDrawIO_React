export default class DrawController {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.rect = {
      x: 10,
      y: 10,
      w: 50,
      h: 50,
    };
    // this.bindedHandleMousedown = this.handleMousedown.bind(this);
  }
  // update canvas
  update() {
    // clear
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // draw again
    this.context.fillStyle = "beige";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "red";
    this.context.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
  }

  clickedInsideOfRect(coordX, coordY) {
    return (
      this.rect.x <= coordX &&
      coordX <= this.rect.x + this.rect.w &&
      this.rect.y
    );
  }

  handleMousedown() {
    console.log(this);
    // check if mouse is inside of rect
  }
  // add event listeners
  addEventListeners() {
    this.canvas.addEventListener("mousedown", this.handleMousedown.bind(this));
  }
  // remove event listeners
  removeEventListeners() {
    this.canvas.removeEventListener("mousedown", this.handleMousedown);
  }
}
