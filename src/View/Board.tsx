import React from "react";
import { useEffect, useRef } from "react";
import { constants, SHAPE_STATUS } from "../Common/constants";
import { observer } from "mobx-react-lite";
import DrawController from '../Controller/DrawController';
import RectShape from '../Model/RectShape';

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
      {DrawController.instance.graph.rects.map((rect: RectShape) => {
        const { id, status, color, shape: { w,  h, pos: { x, y }}} = rect;
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
            {rect.getActivePorts()?.map((port) => {
              const { id, w, h, color, globalPos } = port;
              return (
                <div
                  key={id}
                  style={{
                    width: w,
                    height: h,
                    background: color,
                    position: "absolute",
                    left: globalPos?.x,
                    top: globalPos?.y,
                  }}
                ></div>
              );
            })}
          </div>
        );
      })}
      {DrawController.instance.graph.lines.map((line) => {
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
      })}
      {DrawController.instance.dragBox && (
        <div
          style={{
            border: "1px solid",
            position: "absolute",
            left: DrawController.instance.dragBox.pos.x,
            top: DrawController.instance.dragBox.pos.y,
            width: DrawController.instance.dragBox.w,
            height: DrawController.instance.dragBox.h,
          }}
        ></div>
      )}
    </div>
  );
});

export default Board;
