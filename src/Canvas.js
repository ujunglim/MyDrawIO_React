import { useEffect, useRef } from "react";
import { Consts } from "./Common/consts";
import DrawControllerInstance from "./Controller/DrawController";
import CanvasViewInstance from "./View/CanvasView";

function Canvas() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    // view
    CanvasViewInstance.init(canvas);
    // controller
    DrawControllerInstance.init();

    // event
    DrawControllerInstance.registerEventListener();
    return () => {
      DrawControllerInstance.unregisterEventListener();
    };
  }, []);

  return (
    <canvas
      id="myCanvas"
      ref={canvasRef}
      width={window.innerWidth - Consts.PANEL_WIDTH * 2}
      height={window.innerHeight}
    />
  );
}

export default Canvas;
