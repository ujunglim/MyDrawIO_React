import { makeAutoObservable } from "mobx";

export default class Vec2 {
  x: number = 0;
  y: number = 0;

  constructor(x: number, y: number) {
    makeAutoObservable(this);

    this.x = x;
    this.y = y;
  }

  plus(v: Vec2 | null): Vec2 {
    return new Vec2(this.x + v!.x, this.y + v!.y);
  }

  minus(v: Vec2 | null): Vec2 {
    return new Vec2(this.x - v!.x, this.y - v!.y);
  }

  multiply(v: Vec2): Vec2 {
    return new Vec2(this.x * v.x, this.y * v.y);
  }
}
