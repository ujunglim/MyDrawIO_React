import PanelRight from "./PanelRight";
import PanelLeft from "./PanelLeft";
import Board from "./View/Board";
import Test from "./Test";
import Timer from "./Model/Timer";
import { useEffect } from "react";
import graphInstance from "./Model/Graph";
import { configure } from "mobx";

// close mobx strict-mode
configure({
  enforceActions: "never",
});

function App() {
  const myTimer = new Timer();

  useEffect(() => {
    const intervalId = setInterval(() => myTimer.increase(), 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="app">
      <PanelLeft />
      <Board />
      {/* <Test timer={myTimer} /> */}
      {/* <PanelRight /> */}
    </div>
  );
}

export default App;
