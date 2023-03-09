import { constants } from "../Common/constants";
import Vec2 from "./Vec2";

export default class Port {
    constructor(x, y, parent) {
        this.localPos = new Vec2(x, y); // local position of ports in parent
        this.parent = parent;
        this.updatePos();
    }

    // update port's global position in canvas (parent pos + local pos)
    updatePos() {
        this.globalPos = this.parent.pos.plus(this.localPos);
    }

    contains(point) {
        const {x, y} = this.globalPos;
        return x < point.x && point.x < x + constants.PORT_SIZE && y < point.y && point.y < y + constants.PORT_SIZE;
    }
}