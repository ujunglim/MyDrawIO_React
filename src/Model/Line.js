export default class Line {
    constructor(startPort, endPort) {
        this.startPort = startPort;
        this.endPort = endPort;

        this.updateStartEndPoints();
    }

    updateStartEndPoints() {
        this.startPoint = this.startPort.globalPos;
        this.endPoint = this.endPort.globalPos;
    }
}