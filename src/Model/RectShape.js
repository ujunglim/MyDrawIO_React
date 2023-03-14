import { constants, PORT_TYPE, SHAPE_STATUS } from "../Common/constants";
import Port from "./Port";
import Rect from "./Rect";

const portSize = constants.PORT_SIZE;

export default class RectShape {
  constructor(x, y, w, h, color) {
    this.shape = new Rect(x, y, w, h);
    this.boundingBox = new Rect(0, 0, 0, 0);
    this.color = color;
    this.status = SHAPE_STATUS.NONE;
    this.ports = {};
    this.ports[SHAPE_STATUS.NONE] = [];
    this.ports[SHAPE_STATUS.HOVERED] = this.createLinePorts();
    this.ports[SHAPE_STATUS.SELECTED] = this.createResizePorts();
    this.createResizePorts();
    this.createLinePorts();
    this.updateBoundingBox();
  }

  // create resize Ports
  createResizePorts() {
    const halfX = (this.shape.w - portSize) / 2;
    const halfY = (this.shape.h - portSize) / 2;
    let type = PORT_TYPE.RESIZE;

    return [
      new Port(type, halfX, -portSize / 2, this),
      new Port(type, this.shape.w - portSize / 2, halfY, this),
      new Port(type, halfX, this.shape.h - portSize / 2, this),
      new Port(type, -portSize / 2, halfY, this),
    ];
  }

  // create line Ports
  createLinePorts() {
    const halfX = (this.shape.w - portSize) / 2;
    const halfY = (this.shape.h - portSize) / 2;
    let type = PORT_TYPE.LINE;

    return [
      new Port(type, halfX, -portSize / 2, this),
      new Port(type, this.shape.w - portSize / 2, halfY, this),
      new Port(type, halfX, this.shape.h - portSize / 2, this),
      new Port(type, -portSize / 2, halfY, this),
    ];
  }

  getActivePorts() {
    return this.ports[this.status];
  }

  updatePortsPos() {
    for (const portArr of Object.values(this.ports)) {
      for (const port of portArr) {
        port.updatePos();
      }
    }
  }

  updateBoundingBox() {
    this.boundingBox.set(
      this.shape.pos.x - portSize,
      this.shape.pos.y - portSize,
      this.shape.w + portSize * 2,
      this.shape.h + portSize * 2
    );
  }

  setPos(pos) {
    this.shape.pos = pos;
    this.updatePortsPos();
    this.updateBoundingBox();
  }

  contain(point) {
    return this.boundingBox.contain(point);
  }

  getTopPort() {
    return this.getActivePorts()[0];
  }

  // change size
  updateSize() {}
}
