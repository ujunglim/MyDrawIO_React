import { makeAutoObservable } from "mobx";

export default class Vec2 {
  x = 0;
  y = 0;

  constructor(x, y) {
    makeAutoObservable(this);

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
