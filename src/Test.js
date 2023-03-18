import { observer } from "mobx-react-lite";
import React from "react";

const Test = observer (({timer}) => {

  return (
    <>
      <button onClick={() => timer.reset()}>{timer.count}</button>
      <button onClick={() => timer.decrease()}>-</button>
    </>
  );
});

export default Test;
