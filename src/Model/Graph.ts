import { makeAutoObservable } from "mobx";
import RectShape from './RectShape';
import Line from './Line';

class Graph {
  rects: RectShape[] = [];
  lines: Line[] = [];

  constructor() {
    makeAutoObservable(this);
  }
}
export default Graph;
