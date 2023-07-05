import React, { FC } from "react";
import { SHAPE_STATUS } from "../Common/constants";
import PortComp from "./PortComp";
import Port from "../Model/Ports";
import RectShape from "../Model/RectShape";
import { v4 as uuidv4 } from "uuid";
import { observer } from "mobx-react-lite";
import { Card } from "antd";
import "./index.css";

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
    <div key={id} className="rectShape">
      <Card
        className="card"
        title="title"
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: w,
          height: h,
          background: color,
          border: `${status === SHAPE_STATUS.SELECTED ? 1.5 : 0}px solid`,
        }}
      >
        <p>asdasdasd</p>
      </Card>
      {rect.getActivePorts()?.map((port: Port) => (
        <PortComp port={port} key={uuidv4()} />
      ))}
    </div>
  );
});

export default RectShapeComp;
