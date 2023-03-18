import { makeAutoObservable, observable } from "mobx";
import DrawControllerInstance from "../Controller/DrawController";

class Graph {
    rects = [];
    lines = [];
    dragBox = null;
    count = 0;

    constructor() {
        makeAutoObservable(this);
    }

    plusCount() {
        this.count += 1;
    }

    initRects(n) {
        DrawControllerInstance.initRects(n);
        this.rects = DrawControllerInstance.rects;
    }

    init(rects, lines) {
        this.rects = rects;
        this.lines = lines;
    }
}
const graphInstance = new Graph();
export default graphInstance;
