import { SHAPE_STATUS } from "../Common/constants";
import DrawControllerInstance from "./DrawController";

export default class InputEventManager {
  // clear
  onStartSelect() {}

  onSelectShape() {}
  onSelectPort(port) {}
  onSelectLine() {}
  onSelectNothing() {}
  onSelectAll() {}

  onDragShape() {}
  onDragPort() {}
  onDragLine() {}

  onDrawLine() {}

  toTop() {}
}
