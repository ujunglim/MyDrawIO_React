import React, { FC } from "react";
import { SHAPE_STATUS } from "../Common/constants";
import PortComp from "./PortComp";
import Port from "../Model/Ports";
import RectShape from "../Model/RectShape";
import { v4 as uuidv4 } from "uuid";
import { observer } from "mobx-react-lite";

const RectShapeComp: React.FC<{ rect: RectShape }> = observer(({ rect }) => {
  const {
    id,
    status,
    color,
    shape: {
      w,
      h,
      pos: { x, y },
    },
  } = rect;

  return (
    <div key={id}>
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: w,
          height: h,
          background: color,
          border: `${status === SHAPE_STATUS.SELECTED ? 1.5 : 0}px solid`,
        }}
      ></div>
      {rect.getActivePorts()?.map((port: Port) => (
        <PortComp port={port} key={uuidv4()} />
      ))}
    </div>
  );
});

export default RectShapeComp;
