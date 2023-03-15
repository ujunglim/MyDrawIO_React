import Vec2 from "./Vec2";
export default class Rect {
  constructor(x, y, w, h) {
    this.pos = new Vec2(x, y);
    this.w = w;
    this.h = h;
  }

  set(x, y, w, h) {
    this.pos.x = x;
    this.pos.y = y;
    this.w = w;
    this.h = h;
  }

  contain(point) {
    const { x, y } = this.pos;
    return (
      x < point.x && point.x < x + this.w && y < point.y && point.y < y + this.h
    );
  }

  containRect(rect) {
    console.log(this, rect)
    return (
      this.pos.x <= rect.pos.x &&
      this.pos.y <= rect.pos.y &&
      this.pos.x + this.w >= rect.pos.x + rect.w &&
      this.pos.y + this.h >= rect.pos.y + rect.h
    );
  }
}
