export const constants = {
  DELAY_SAVE_TIME: 3000,
  PANEL_WIDTH: 250,
  PORT_SIZE: 10,
};

export const PORT_TYPE = {
  RESIZE: 0,
  LINE: 1,
};

export const SHAPE_STATUS = {
  NONE: 0,
  SELECTED: 1,
  HOVERED: 2,
};

export const MOUSE_STATUS = {
  NONE: 0,
  DOWN_CANVAS: 1, // dragbox
  DOWN_SHAPE: 2,
  DOWN_PORT_RESIZE: 3,
  DOWN_PORT_LINE: 4,
  DOWN_LINE: 5, // click line
};
