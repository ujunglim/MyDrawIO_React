import { constants } from "../Common/constants";
import Rect from "./Rect";

export default class Port extends Rect {
  constructor(type, x, y, parent) {
    super(x, y, constants.PORT_SIZE, constants.PORT_SIZE);
    // this.pos from Rect represent the local position inside its parent
    this.type = type;
    this.parent = parent;
    this.updatePos();
  }

  // update port's global position in canvas (parent pos + local pos)
  updatePos() {
    this.globalPos = this.parent.shape.pos.plus(this.pos);
  }
}
