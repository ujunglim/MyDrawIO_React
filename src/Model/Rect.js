import { constants } from "../Common/constants";
import DrawControllerInstance from "../Controller/DrawController";
import Interface from "../Controller/Interface";
import Vec2 from "./Vec2";

const interfaceSize = constants.INTERFACE_SIZE;

export default class Rect {
  constructor(x, y, w, h, color) {
    this.pos = new Vec2(x, y);
    this.w = w;
    this.h = h;
    this.color = color;
    this.isSelected = false;

    // params: init outer rect width, height
    this.setOuterRect(this.w + 2 * interfaceSize, this.h + 2 * interfaceSize)
    this.setInterfaces();
  }

  setOuterRect(outer_w, outer_h) {
    this.outerRect = {
      pos: this.pos.minus(new Vec2(interfaceSize, interfaceSize)),
      outer_w,
      outer_h,
    }
  }

  setInterfaces() {
    const halfX = this.pos.x + (this.w-interfaceSize) / 2;
    const halfY = this.pos.y + (this.h-interfaceSize) / 2;

    this.interfaces = [
      new Interface(halfX, this.pos.y - interfaceSize / 2),
      new Interface(this.pos.x + this.w - interfaceSize / 2, halfY),
      new Interface(halfX, this.pos.y + this.h - interfaceSize / 2),
      new Interface(this.pos.x - interfaceSize / 2, halfY),
    ]
  }

  // check whether a point is inside a rectangle
  outerContains(point) {
    const { x, y } = this.outerRect.pos;
    const { outer_w, outer_h } = this.outerRect;
    return x < point.x && point.x < x + outer_w && y < point.y && point.y < y + outer_h;
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
