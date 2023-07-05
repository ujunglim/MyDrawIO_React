import React, { FC } from "react";
import Port from "../Model/Ports";
import { observer } from "mobx-react-lite";

const PortComp: React.FC<{ port: Port }> = observer(({ port }) => {
  const { id, w, h, color, globalPos } = port;
  return (
    <button
      key={id}
      style={{
        width: w,
        height: h,
        background: color,
        position: "absolute",
        left: globalPos?.x,
        top: globalPos?.y,
        border: "none",
        borderRadius: "10px",
      }}
    ></button>
  );
});

export default PortComp;
