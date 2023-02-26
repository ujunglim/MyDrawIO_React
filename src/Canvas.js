import { useRef, useEffect, useCallback } from "react";
import DrawController from "./DrawController";

function Canvas() {
  const canvasRef = useRef(null);
  const drawControllerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    // create drawController instance
    drawControllerRef.current = new DrawController(canvas, context);
    // add event listeners
    drawControllerRef.current.addEventListeners();
    // remove them
    return () => {
      drawControllerRef.current.removeEventListeners();
    };
  }, []); // [] create일때만 실행

  return (
    <canvas
      id="myCanvas"
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
}

export default Canvas;
