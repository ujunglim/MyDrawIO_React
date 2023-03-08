import DrawControllerInstance from "../Controller/DrawController";
import Vec2 from "./Vec2";

export default class Rect {
  constructor(x, y, w, h, color) {
    this.pos = new Vec2(x, y);
    this.w = w;
    this.h = h;
    this.color = color;
    this.isSelected = false;
  }

  // check whether a point is inside a rectangle
  contains(point) {
    const { x, y } = this.pos;
    const { w, h } = this;
    return x < point.x && point.x < x + w && y < point.y && point.y < y + h;
  }

  // check whether rect is inside of drag box
  isInsideDragBox() {
    const {
      pos: { x: dragBoxX, y: dragBoxY },
      w: dragBoxW,
      h: dragBoxH,
    } = DrawControllerInstance.dragBox;

    return (
      dragBoxX <= this.pos.x &&
      this.pos.x + this.w <= dragBoxX + dragBoxW &&
      dragBoxY <= this.pos.y &&
      this.pos.y + this.h <= dragBoxY + dragBoxH
    );
  }
}
