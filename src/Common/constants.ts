export const constants = {
  DELAY_SAVE_TIME: 3000,
  PANEL_WIDTH: 250,
  HEADER_HEIGHT: 105, // header + subheader
  PORT_SIZE: 7,
  GRID_SPACING: 20,
  GRID_PADDING: 0,
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
