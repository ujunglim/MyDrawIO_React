import { makeObservable, observable } from "mobx";
import Graph from "../Model/Graph";
import RectShape from "../Model/RectShape";
import Vec2 from "../Model/Vec2";
import DataManager from "./DataManager";
import InputEventManager from "./InputEventManager";
import InputManager from "./InputManager";
import RectShapeManager from "./RectManager";

let instance;

class DrawController {
  w = 0;
  h = 0;
  graph = new Graph();
  targets = [];
  hoveringShape = null;
  dragBox = null;

  constructor() {
    if (instance) {
      throw new Error("New instance cannot be created!!");
    }
    instance = this;
    makeObservable(this, {
      targets: observable,
      hoveringShape: observable,
      dragBox: observable,
    });
  }

  init(w, h) {
    this.w = w;
    this.h = h;

    this.initRects(2);

    this.dataManager = new DataManager(this);
    this.inputManager = new InputManager(this);
    this.inputEventManager = new InputEventManager();
    this.rectManager = new RectShapeManager(this);

    // this.graph = new Graph(this.rects, this.lines, this.dragBox);
    // CanvasViewInstance.render();
  }

  registerEventListener(dom) {
    this.inputManager.addEventListeners(dom);
  }

  unregisterEventListener(dom) {
    this.inputManager.removeEventListeners(dom);
  }

  render() {
    // this.setGraph([...this.rects]);
  }

  getRandomVec() {
    return new Vec2(Math.random(), Math.random());
  }

  initRects(maxCount) {
    const canvasSize = new Vec2(this.w, this.h);
    const maxSize = new Vec2(200, 100);
    const minSize = new Vec2(10, 5);

    for (let i = 0; i < maxCount; i++) {
      const size = this.getRandomVec()
        .multiply(maxSize.minus(minSize))
        .plus(minSize);

      const pos = this.getRandomVec().multiply(canvasSize.minus(size));
      const color = "hsl(" + 360 * Math.random() + ", 50%, 50%)";
      this.graph.rects.push(new RectShape(pos.x, pos.y, size.x, size.y, color));
    }
  }

  toTop(i) {
    const target = this.graph.rects[i];
    this.graph.rects.splice(i, 1);
    this.graph.rects.push(target);
  }
}

const DrawControllerInstance = new DrawController();
export default DrawControllerInstance;
