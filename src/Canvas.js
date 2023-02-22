import { useRef, useEffect, useCallback } from "react";

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
  const rect = { x: 0, y: 0, width: 50, height: 50 }; // initial position and size of rectangle
  const contextRef = useRef();

  const draw = () => {
    const context = contextRef.current;
    const canvas = canvasRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

    context.fillStyle = "red";
    context.fillRect(rect.x, rect.y, rect.width, rect.height);
  };

  const update = useCallback((event) => {
    rect.x = event.clientX - rect.width / 2; // set the x position of the rectangle
    rect.y = event.clientY - rect.height / 2; // set the y position of the rectangle
    draw(); // redraw the canvas with the updated position
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    contextRef.current = context;
    context.fillStyle = "beige";
    context.fillRect(0, 0, canvas.width, canvas.height);

    canvas.addEventListener("mousemove", update);
    return () => canvas.removeEventListener("mousemove", update);
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
