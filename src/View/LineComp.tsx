import React from "react";
import { observer } from "mobx-react-lite";
import Line from "../Model/Line";
import { constants } from "../Common/constants";

const LineComp: React.FC<{ line: Line }> = observer(({ line }) => {
  const {
    id,
    startPort: {
      globalPos: { x: x1, y: y1 },
    },
    endPort: {
      globalPos: { x: x2, y: y2 },
    },
  } = line;
  const gap = constants.PORT_SIZE / 2;
  return (
    <svg
      key={id}
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      <line
        x1={x1 + gap}
        y1={y1 + gap}
        x2={x2 + gap}
        y2={y2 + gap}
        stroke="black"
      />
    </svg>
  );
});

export default LineComp;
