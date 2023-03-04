import Canvas from "./Canvas";
import TestClosure from "./TestClosure";
import TestBind from "./TestBind";
import TestVector from "./TestVector";
import PanelRight from "./PanelRight";
import { useRef } from "react";

function App() {
  const canvasRef = useRef(null);
  const drawControllerRef = useRef(null);

  return (
    <div className="app">
      <PanelRight drawControllerRef={drawControllerRef} />
      <Canvas canvasRef={canvasRef} drawControllerRef={drawControllerRef} />
    </div>
  );
}

export default App;
