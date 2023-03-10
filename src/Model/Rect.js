import { constants } from "../Common/constants";
import DrawControllerInstance from "../Controller/DrawController";
import Vec2 from "./Vec2";
import Port from "./Port";

const portSize = constants.PORT_SIZE;

export default class Rect {
  constructor(x, y, w, h, color) {
    this.pos = new Vec2(x, y);
    this.w = w;
    this.h = h;
    this.color = color;
    this.isSelected = false;
    this.isHovered = false;

    // params: init outer rect width, height 
    this.setOuterRect(this.w + 2 * portSize, this.h + 2 * portSize);
    this.createPorts();
  }

  setOuterRect(outer_w, outer_h) {
    this.outerRect = {
      pos: this.pos.minus(new Vec2(portSize, portSize)),
      outer_w,
      outer_h,
    }
  }

  // create Ports
  createPorts() {
    const halfX = (this.w-portSize) / 2;
    const halfY = (this.h-portSize) / 2;

    this.ports = [
      new Port(halfX, -portSize / 2, this),
      new Port(this.w - portSize / 2, halfY, this),
      new Port(halfX, this.h - portSize / 2, this),
      new Port(-portSize / 2, halfY, this),
    ]
  }

  updatePortsPos() {
    for(const port of this.ports) {
      port.updatePos();
    }
  }

  contain(point) {
    const {x, y} = this.pos;
    return x < point.x && point.x < x + this.w && y < point.y && point.y < y + this.h;
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

  // change size
  updateSize() {
    
  }
}
