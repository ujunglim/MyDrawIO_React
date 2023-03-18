import { makeObservable, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";

export default class Line {
  id: string;
  startPort: any;
  endPort: any;

  constructor(startPort: any, endPort: any) {
    makeObservable(this, {
      startPort: observable,
      endPort: observable,
    });

    this.id = uuidv4();
    this.startPort = startPort;
    this.endPort = endPort;
  }
}
