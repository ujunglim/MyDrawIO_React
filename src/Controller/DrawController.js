import Rect from "../Model/Rect";
import Vec2 from "../Model/Vec2";
import CanvasViewInstance from "../View/CanvasView";
import DataManager from "./DataManager";
import InputManager from "./InputManager";
import RectManager from "./RectManager";

let instance;

class DrawController {
  constructor() {
    if (instance) {
      throw new Error("New instance cannot be created!!");
    }
    instance = this;
  }

  init() {
    this.rects = [];
    this.targetRect = null;
    this.dragBox = null;

    // this.initRects(100);

    this.dataManager = new DataManager(this);
    this.inputManager = new InputManager(this);
    this.rectManager = new RectManager(this);

    CanvasViewInstance.draw();
  }

  registerEventListener() {
    this.inputManager.addEventListeners();
  }

  unregisterEventListener() {
    this.inputManager.removeEventListeners();
  }

  draw() {
    CanvasViewInstance.draw();
  }

  getRandomVec() {
    return new Vec2(Math.random(), Math.random());
  }

  initRects(maxCount) {
    const w = CanvasViewInstance.canvas.width;
    const h = CanvasViewInstance.canvas.height;
    const canvasSize = new Vec2(w, h);
    const maxSize = new Vec2(200, 100);
    const minSize = new Vec2(10, 5);

    for (let i = 0; i < maxCount; i++) {
      const size = this.getRandomVec()
        .multiply(maxSize.minus(minSize))
        .plus(minSize);

      const pos = this.getRandomVec().multiply(canvasSize.minus(size));
      const color = "hsl(" + 360 * Math.random() + ", 50%, 50%)";

      this.rects.push(new Rect(pos.x, pos.y, size.x, size.y, color));
    }
  }

  toTop(i) {
    const target = this.rects[i];
    this.rects.splice(i, 1);
    this.rects.push(target);
  }
}

const DrawControllerInstance = new DrawController();
export default DrawControllerInstance;
