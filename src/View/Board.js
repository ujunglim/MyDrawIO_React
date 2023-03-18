import React, { useState } from "react";
import { useEffect, useRef } from "react";
import DrawControllerInstance from "../Controller/DrawController";
import { constants, MOUSE_STATUS, SHAPE_STATUS } from "../Common/constants";
import { observer } from "mobx-react";

const Board = observer(({ graph }) => {
  const width = window.innerWidth - constants.PANEL_WIDTH * 2;
  const height = window.innerHeight;
  const boardRef = useRef(null);

  useEffect(() => {
    if (boardRef && boardRef.current) {
      DrawControllerInstance.init(width, height);
      graph.initRects(2);
      graph.init(DrawControllerInstance.rects, DrawControllerInstance.lines)
      console.log(graph)

      const dom = boardRef.current;
      DrawControllerInstance.registerEventListener(dom);
      return () => {
        DrawControllerInstance.unregisterEventListener(dom);
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
      }}
    >
      {/* <button onClick={() => graph.plusCount()}>{String(graph.count)}</button> */}
      {/* {graph.hoveringShape && <span>hovering..</span>} */}
      {graph?.rects?.map((rect) => {
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
                    left: globalPos.x,
                    top: globalPos.y,
                  }}
                ></div>
              );
            })}
          </div>
        );
      })}
      {graph?.lines.map((line) => {
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
      {graph?.dragBox && (
        <div
          style={{
            border: "1px solid",
            position: "absolute",
            left: graph.dragBox.pos.x,
            top: graph.dragBox.pos.y,
            width: graph.dragBox.w,
            height: graph.dragBox.h,
          }}
        ></div>
      )}
    </div>

  );
})

export default Board;
