import Canvas from "./Canvas";
import TestClosure from "./TestClosure";
import TestBind from "./TestBind";
import TestVector from "./TestVector";
import PanelRight from "./PanelRight";
import PanelLeft from "./PanelLeft";

function App() {
  return (
    <div className="app">
      <PanelLeft />
      <Canvas />
      {/* <PanelRight /> */}
    </div>
  );
}

export default App;
