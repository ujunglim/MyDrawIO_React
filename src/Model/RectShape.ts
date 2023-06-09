import { constants, PORT_TYPE, SHAPE_STATUS } from "../Common/constants";
import Port from "./Ports";
import Rect from "./Rect";
import { v4 as uuidv4 } from "uuid";
import { makeObservable, observable } from "mobx";
import Vec2 from './Vec2';

const portSize = constants.PORT_SIZE;

export default class RectShape {
  id: string | null = null;
  shape: Rect;
  boundingBox: Rect;
  color: string;
  status: SHAPE_STATUS | null = null;
  ports: { [key in SHAPE_STATUS]?: Port[] } = {};
  title: string;
  content: string;

  constructor(x: number, y: number, w: number, h: number, color: string) {
    makeObservable(this, {
      boundingBox: observable,
      color: observable,
      status: observable,
    });

    this.id = uuidv4();
    this.shape = new Rect(x, y, w, h);
    this.boundingBox = new Rect(0, 0, 0, 0);
    this.color = color;
    this.status = SHAPE_STATUS.NONE;
    this.ports[SHAPE_STATUS.NONE] = [];
    this.ports[SHAPE_STATUS.HOVERED] = this.createLinePorts();
    this.ports[SHAPE_STATUS.SELECTED] = this.createResizePorts();
    this.updateBoundingBox();
  }

  // create resize Ports
  createResizePorts(): Port[] {
    const halfX = (this.shape!.w - portSize) / 2;
    const halfY = (this.shape!.h - portSize) / 2;
    let type = PORT_TYPE.RESIZE;
    return [
      new Port(type, halfX, -portSize / 2, this),
      new Port(type, this.shape!.w - portSize / 2, halfY, this),
      new Port(type, halfX, this.shape!.h - portSize / 2, this),
      new Port(type, -portSize / 2, halfY, this),
    ];
  }

  // create line Ports
  createLinePorts(): Port[] {
    const halfX = (this.shape!.w - portSize) / 2;
    const halfY = (this.shape!.h - portSize) / 2;
    let type = PORT_TYPE.LINE;
    return [
      new Port(type, halfX, -portSize / 2, this),
      new Port(type, this.shape!.w - portSize / 2, halfY, this),
      new Port(type, halfX, this.shape!.h - portSize / 2, this),
      new Port(type, -portSize / 2, halfY, this),
    ];
  }

  getActivePorts(): Port[] {
    return this.ports[this.status!] ?? [];
  }

  updatePortsPos() {
    for (const portArr of Object.values(this.ports)) {
      for (const port of portArr!) {
        port.updatePos();
      }
    }
  }

  updateBoundingBox() {
    this.boundingBox!.set(
      this.shape!.pos.x - portSize,
      this.shape!.pos.y - portSize,
      this.shape!.w + portSize * 2,
      this.shape!.h + portSize * 2
    );
  }

  setPos(pos: Vec2) {
    this.shape!.pos = pos;
    this.updatePortsPos();
    this.updateBoundingBox();
  }

  contain(point: Vec2) {
    return this.boundingBox!.contain(point);

  }
  getTopPort() {
    return this.getActivePorts()[0];
  }
  // change size
  updateSize() {}

  setTitle(text: string) {
    this.title = text;
  }

  setContent(text: string) {
    this.content = text;
  }
}
