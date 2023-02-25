import { useRef, useEffect, useCallback } from "react";
import DrawController from "./DrawController";

function Canvas() {
  const canvasRef = useRef(null);
  const drawControllerRef = useRef(null);

  const update = useCallback((event) => {
    // rect.x = event.clientX - rect.width / 2; // set the x position of the rectangle
    // rect.y = event.clientY - rect.height / 2; // set the y position of the rectangle
    // draw(); // redraw the canvas with the updated position
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    drawControllerRef.current = new DrawController(canvas, context);
    drawControllerRef.current.update();

    drawControllerRef.current.addEventListeners();
    return () => drawControllerRef.current.removeEventListeners();
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
