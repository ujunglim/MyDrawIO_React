import { makeObservable, observable } from "mobx";
import Graph from "../Model/Graph";
import RectShape from "../Model/RectShape";
import Vec2 from "../Model/Vec2";
import DataManager from "./DataManager";
import InputEventManager from "./InputEventManager";
import InputManager from "./InputManager";
import RectShapeManager from "./RectManager";
import Rect from '../Model/Rect';

export default class DrawController {
  w = 0;
  h = 0;
  graph = new Graph();
  targets: RectShape[] = [];
  hoveringShape: RectShape | null = null;
  dragBox: Rect | null = null;
  
  dataManager: DataManager;
  inputManager: InputManager;
  inputEventManager: InputEventManager;
  rectManager: RectShapeManager;

  private static _instance: DrawController;
  public static get instance(): DrawController {
    if (!this._instance) {
      this._instance = new DrawController();
    }
    return this._instance;
  }

  private constructor() {
    makeObservable(this, {
      targets: observable,
      hoveringShape: observable,
      dragBox: observable,
    });
  }


  init(w: number, h: number) {
    this.w = w;
    this.h = h;

    this.initRects(2);

    this.dataManager = new DataManager(this);
    this.inputManager = new InputManager(this);
    this.inputEventManager = new InputEventManager();
    this.rectManager = new RectShapeManager(this);
  }

  registerEventListener(dom: HTMLElement) {
    this.inputManager.addEventListeners(dom);
  }

  unregisterEventListener(dom: HTMLElement) {
    this.inputManager.removeEventListeners(dom);
  }

  render() {
    // this.setGraph([...this.rects]);
  }

  getRandomVec(): Vec2 {
    return new Vec2(Math.random(), Math.random());
  }

  initRects(maxCount: number) {
    const canvasSize = new Vec2(this.w, this.h);
    const maxSize = new Vec2(200, 100);
    const minSize = new Vec2(30, 30);

    for (let i = 0; i < maxCount; i++) {
      const size = this.getRandomVec()
        .multiply(maxSize.minus(minSize))
        .plus(minSize);

      const pos = this.getRandomVec().multiply(canvasSize.minus(size));
      const color = "hsl(" + 360 * Math.random() + ", 50%, 50%)";
      this.graph.rects.push(new RectShape(pos.x, pos.y, size.x, size.y, color));
    }
  }

  toTop(i: number) {
    const target = this.graph.rects[i];
    this.graph.rects.splice(i, 1);
    this.graph.rects.push(target);
  }
}

