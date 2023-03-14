import PanelRight from "./PanelRight";
import PanelLeft from "./PanelLeft";
import Board from "./View/Board";

function App() {
  return (
    <div className="app">
      <PanelLeft />
      <Board />
      {/* <PanelRight /> */}
    </div>
  );
}

export default App;
