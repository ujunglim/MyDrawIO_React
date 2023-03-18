export const constants = {
  DELAY_SAVE_TIME: 3000,
  PANEL_WIDTH: 250,
  PORT_SIZE: 10,
};

export enum PORT_TYPE {
  RESIZE,
  LINE,
}

export enum SHAPE_STATUS {
  NONE,
  SELECTED,
  HOVERED,
}

export enum MOUSE_STATUS {
  NONE,
  DOWN_CANVAS, // dragbox
  DOWN_SHAPE,
  DOWN_PORT_RESIZE,
  DOWN_PORT_LINE,
  DOWN_LINE, // click line
}
