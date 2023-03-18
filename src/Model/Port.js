import { makeObservable, observable } from "mobx";
import { constants, PORT_TYPE } from "../Common/constants";
import Rect from "./Rect";
const { v4: uuidv4 } = require("uuid");

export default class Port extends Rect {
  id = null;
  type = null;
  parent = null;
  color = null;
  globalPos = null;

  constructor(type, x, y, parent) {
    super(x, y, constants.PORT_SIZE, constants.PORT_SIZE);

    makeObservable(this, {
      color: observable,
      globalPos: observable,
    });
    // this.pos from Rect represent the local position inside its parent
    this.id = uuidv4();
    this.type = type;
    this.parent = parent;
    this.color = this.type === PORT_TYPE.LINE ? "lightblue" : "#2f9afb";

    if (this.parent) {
      this.updatePos();
    } else {
      this.globalPos = this.pos;
    }
  }

  // update port's global position in canvas (parent pos + local pos)
  updatePos() {
    this.globalPos = this.parent.shape.pos.plus(this.pos);
  }

  contain(point) {
    const { x, y } = this.globalPos;
    return (
      x < point.x && point.x < x + this.w && y < point.y && point.y < y + this.h
    );
  }
}
