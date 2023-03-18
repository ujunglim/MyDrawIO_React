import { makeObservable, observable } from "mobx";
import Vec2 from "./Vec2";

export default class Rect {
  pos: Vec2;
  w: number = 0;
  h: number = 0;

  constructor(x: number, y: number, w: number, h: number) {
    makeObservable(this, {
      pos: observable,
      w: observable,
      h: observable,
    });

    this.pos = new Vec2(x, y);
    this.w = w;
    this.h = h;
  }

  set(x: number, y: number, w: number, h: number): void {
    this.pos.x = x;
    this.pos.y = y;
    this.w = w;
    this.h = h;
  }

  contain(point: Vec2): boolean {
    const { x, y } = this.pos;
    return (
      x < point.x && point.x < x + this.w && y < point.y && point.y < y + this.h
    );
  }

  containRect(rect: Rect): boolean {
    return (
      this.pos.x <= rect.pos.x &&
      this.pos.y <= rect.pos.y &&
      this.pos.x + this.w >= rect.pos.x + rect.w &&
      this.pos.y + this.h >= rect.pos.y + rect.h
    );
  }
}
