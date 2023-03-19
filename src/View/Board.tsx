import React from "react";
import { useEffect, useRef } from "react";
import { constants } from "../Common/constants";
import { observer } from "mobx-react-lite";
import DrawController from "../Controller/DrawController";
import RectShape from "../Model/RectShape";
import RectShapeComp from "./RectShapeComp";
import { v4 as uuidv4 } from "uuid";
import LineComp from "./LineComp";
import DragboxComp from "./DragboxComp";

const Board = observer(() => {
  const width: number = window.innerWidth - constants.PANEL_WIDTH * 2;
  const height: number = window.innerHeight;
  const boardRef: any = useRef(null);

  useEffect(() => {
    if (boardRef && boardRef.current) {
      DrawController.instance.init(width, height);

      const dom = boardRef.current;
      DrawController.instance.registerEventListener(dom);
      return () => {
        DrawController.instance.unregisterEventListener(dom);
      };
    }
  }, [boardRef]);

  return (
    <div
      ref={boardRef}
      style={{
        width: width,
        height: height,
        background: "beige",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {DrawController.instance.graph.rects.map((rect: RectShape) => (
        <RectShapeComp rect={rect} key={uuidv4()} />
      ))}
      {DrawController.instance.graph.lines.map((line) => (
        <LineComp line={line} key={uuidv4()} />
      ))}
      {DrawController.instance.dragBox && (
        <DragboxComp dragbox={DrawController.instance.dragBox} />
      )}
    </div>
  );
});

export default Board;
