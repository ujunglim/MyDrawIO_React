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
import "./index.css";

const Board = observer(() => {
  const width: number = window.innerWidth - constants.PANEL_WIDTH * 2;
  const height: number = window.innerHeight;
  const boardRef: any = useRef(null);
  const canvasRef: any = useRef(null);

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

  // draw grid line
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "lightgrey";
    ctx.lineWidth = 0.3;

    // Draw vertical lines
    for (
      let x = constants.GRID_PADDING;
      x < canvas.width;
      x += constants.GRID_SPACING
    ) {
      ctx.beginPath();
      ctx.moveTo(x, constants.GRID_PADDING);
      ctx.lineTo(x, canvas.height - constants.GRID_PADDING);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (
      let y = constants.GRID_PADDING;
      y < canvas.height;
      y += constants.GRID_SPACING
    ) {
      ctx.beginPath();
      ctx.moveTo(constants.GRID_PADDING, y);
      ctx.lineTo(canvas.width - constants.GRID_PADDING, y);
      ctx.stroke();
    }
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <canvas
        id="myCanvas"
        ref={canvasRef}
        width={window.innerWidth - constants.PANEL_WIDTH * 2}
        height={window.innerHeight}
      />
      <div
        ref={boardRef}
        style={{
          width: width,
          height: height,
          position: "absolute",
          top: 0,
          left: 0,
        }}
        className="board"
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
    </div>
  );
});

export default Board;
