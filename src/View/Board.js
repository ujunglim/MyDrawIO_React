import React, { useState } from 'react'
import { useEffect, useRef } from "react";
import { selectBoard } from "../store/slices/board";
import { useSelector } from "react-redux";
import DrawControllerInstance from "../Controller/DrawController";
import { constants, SHAPE_STATUS } from '../Common/constants';

function Board() {
  const [rects, setRects] = useState([]);
  const [lines, setLines] = useState([]);
  const boardRef = useRef(null);
  const { size } = useSelector(selectBoard);

  useEffect(() => {
    boardRef.size = size;
    boardRef.setRects = setRects;
    boardRef.setLines = setLines;

    if (boardRef && boardRef.current) {
      DrawControllerInstance.init(boardRef);
      setRects(DrawControllerInstance.rects);
      setLines(DrawControllerInstance.lines);

      DrawControllerInstance.registerEventListener();
      return () => {
        DrawControllerInstance.unregisterEventListener();
      };
    }
  }, [boardRef, size]);

  return (
    <div
      ref={boardRef}
      style={{...size, background: 'beige', position: 'relative'}}
    >
      {rects?.map(rect => {
        const {id, status, color, shape: { w, h, pos: { x, y } } } = rect;
        return (
          <div key={id}>
            <div
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: w,
                height: h,
                background: color,
                border: `${status === SHAPE_STATUS.SELECTED ? 1.5 : 0}px solid`
              }}
            ></div>
            {rect.getActivePorts()?.map(port => {
              const {id, w, h, color, globalPos} = port
              return (
                <div
                  key={id}
                  style={{
                    width: w,
                    height: h,
                    background: color,
                    position: 'absolute',
                    left: globalPos.x,
                    top: globalPos.y,
                  }}
                ></div>
              )
            })}
          </div>
        )
      })}
      {lines.map(line => {
        const {id, startPort: {globalPos: {x:x1, y:y1}}, endPort: {globalPos: {x:x2, y:y2}}} = line;
        const gap = constants.PORT_SIZE / 2;
        return (
          <svg key={id} style={{position: 'absolute', width: '100%', height: '100%'}}>
            <line x1={x1+gap} y1={y1+gap} x2={x2+gap} y2={y2+gap} stroke="black" />
          </svg>
        );
      })}
    </div>
  )
}

export default Board;