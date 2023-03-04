import Vec2 from "./Vec2";

export default class Rect {
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
