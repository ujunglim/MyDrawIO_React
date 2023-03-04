import { useRef, useEffect } from "react";
import { PANEL_WIDTH } from "./config";
import DrawController from "./DrawController";

function Canvas({ canvasRef, drawControllerRef }) {
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
      width={window.innerWidth - PANEL_WIDTH * 2}
      height={window.innerHeight}
    />
  );
}

export default Canvas;
