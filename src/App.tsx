import React from 'react';
import PanelRight from "./PanelRight";
import PanelLeft from "./PanelLeft";
import Board from "./View/Board";
import Test from "./Test";
import Timer from "./Model/Timer";
import { useEffect } from "react";
import { configure } from "mobx";

// close mobx strict-mode
configure({
  enforceActions: "never",
});

const App: React.FC = () => {
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