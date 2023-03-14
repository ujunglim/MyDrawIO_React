import React, { useState } from 'react'
import { useEffect, useRef } from "react";
import { selectBoard } from "../store/slices/board";
import { useSelector } from "react-redux";
import DrawControllerInstance from "../Controller/DrawController";

function Board() {
  const [rects, setRects] = useState([]);
  const boardRef = useRef(null);
  const { size } = useSelector(selectBoard);

  useEffect(() => {
    boardRef.size = size;
    if (boardRef && boardRef.current) {
      DrawControllerInstance.init(boardRef);
      setRects(DrawControllerInstance.rects);

      DrawControllerInstance.registerEventListener();
      return () => {
        DrawControllerInstance.unregisterEventListener();
      };
    }
  }, [boardRef, size]);

  return (
    <div
      ref={boardRef}
      style={{...size, background: 'beige' }}
    >
      {rects.map((rect, i) => {
        const {color, shape: {w, h, pos: {x, y}}} = rect;
        return (
          <div
            key={i}
            style={{
              position: 'relative',
              left: x,
              top: y,
              width: w,
              height: h,
              background: color,
            }}
          ></div>
        )
      })}
    </div>
  )
}

export default Board;