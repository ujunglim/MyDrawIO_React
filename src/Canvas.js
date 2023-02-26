import { useRef, useEffect, useCallback } from "react";
import DrawController from "./DrawController";

function Canvas() {
  const canvasRef = useRef(null);
  const drawControllerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    drawControllerRef.current = new DrawController(canvas, context);

    drawControllerRef.current.addListener();
    return () => drawControllerRef.current.removeListener();
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
