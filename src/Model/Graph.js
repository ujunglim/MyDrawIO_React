import { makeAutoObservable } from "mobx";

class Graph {
  rects = [];
  lines = [];

  constructor() {
    makeAutoObservable(this);
  }
}
export default Graph;
