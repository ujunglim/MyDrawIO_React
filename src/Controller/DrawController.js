import RectShape from "../Model/RectShape";
import Vec2 from "../Model/Vec2";
import CanvasViewInstance from "../View/CanvasView";
import DataManager from "./DataManager";
import InputEventManager from "./InputEventManager";
import InputManager from "./InputManager";
import RectShapeManager from "./RectManager";

let instance;

class DrawController {
  constructor() {
    if (instance) {
      throw new Error("New instance cannot be created!!");
    }
    instance = this;
  }

  init(boardRef) {
    this.rects = [];
    this.targets = [];
    this.hoveringShape = null;
    this.dragBox = null;
    this.lines = [];
    this.boardRef = boardRef;

    this.initRects(2);

    this.dataManager = new DataManager(this);
    this.inputManager = new InputManager(this);
    this.inputEventManager = new InputEventManager();
    this.rectManager = new RectShapeManager(this);
    // CanvasViewInstance.render();
  }

  registerEventListener() {
    this.inputManager.addEventListeners();
  }

  unregisterEventListener() {
    this.inputManager.removeEventListeners();
  }

  render() {
    // CanvasViewInstance.render();
  }

  getRandomVec() {
    return new Vec2(Math.random(), Math.random());
  }

  initRects(maxCount) {
    const {width: w, height: h} = this.boardRef.size;
    const canvasSize = new Vec2(w, h);
    const maxSize = new Vec2(200, 100);
    const minSize = new Vec2(10, 5);

    for (let i = 0; i < maxCount; i++) {
      const size = this.getRandomVec()
        .multiply(maxSize.minus(minSize))
        .plus(minSize);

      const pos = this.getRandomVec().multiply(canvasSize.minus(size));
      const color = "hsl(" + 360 * Math.random() + ", 50%, 50%)";

      this.rects.push(new RectShape(pos.x, pos.y, size.x, size.y, color));
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
