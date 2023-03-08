import { constants } from "../Common/constants";
import Vec2 from "../Model/Vec2";

export default class Interface {
    constructor(x, y) {
        this.pos = new Vec2(x, y);
        // this.color = 'blue';
        this.isSelected = false;
    }

    contains(point) {
        const {x, y} = this.pos;
        return x < point.x && point.x < x + constants.INTERFACE_SIZE && y < point.y && point.y < y + constants.INTERFACE_SIZE;
    }
}