import { SHAPE_STATUS } from "../Common/constants";
import Port from '../Model/Ports';

export default class InputEventManager {
  // clear
  onStartSelect() {}

  onSelectShape() {}
  onSelectPort(port: Port) {}
  onSelectLine() {}
  onSelectNothing() {}
  onSelectAll() {}

  onDragShape() {}
  onDragPort() {}
  onDragLine() {}

  onDrawLine() {}

  toTop() {}
}
