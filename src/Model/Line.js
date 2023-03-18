import { makeObservable, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";

export default class Line {
  id = null;
  startPort = null;
  endPort = null;

  constructor(startPort, endPort) {
    makeObservable(this, {
      startPort: observable,
      endPort: observable,
    });

    this.id = uuidv4();
    this.startPort = startPort;
    this.endPort = endPort;
  }
}
