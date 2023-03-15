import { v4 as uuidv4 } from 'uuid';

export default class Line {
  constructor(startPort, endPort) {
    this.id = uuidv4();
    this.startPort = startPort;
    this.endPort = endPort;
  }
}