import { useRef, useEffect } from "react";
import DrawController from "./DrawController";

// const manager = {
//   lastDependency: null,
// };

// // 리액트는 shaollow compare 하기때문에 imutable 해야한다.

// const isArrayElementEqual = (arr1, arr2) => {
//   if (!arr1 || arr1.length !== arr2.length) return false;
//   for (let i = 0; i < arr1.length; i++) {
//     if (arr1[i] !== arr2[i]) {
//       return false;
//     }
//   }
//   return true;
// };

// const useEffect = (cb, dependency) => {
//   // check whether two dependencies are same
//   if (!isArrayElementEqual(manager.lastDependency, dependency)) {
//     manager.lastDependency = dependency;
//     cb();
//   }
// };

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
