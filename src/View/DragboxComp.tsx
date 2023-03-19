import React from "react";
import Rect from "../Model/Rect";

const DragboxComp: React.FC<{ dragbox: Rect }> = ({ dragbox }) => {
  return (
    <div
      style={{
        border: "1px solid",
        position: "absolute",
        left: dragbox.pos.x,
        top: dragbox.pos.y,
        width: dragbox.w,
        height: dragbox.h,
      }}
    ></div>
  );
};

export default DragboxComp;
