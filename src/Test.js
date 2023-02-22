import React, { useEffect, useState } from "react";

function Test() {
  let counter = 0;
  const [state, setState] = useState(true);

  useEffect(() => {
    const handleMousemove = () => {
      counter++;
      console.log(counter);
    };

    const handleMousedown = () => setState(false);

    window.addEventListener("mousemove", handleMousemove);
    window.addEventListener("mousedown", handleMousedown);

    return () => {
      window.removeEventListener("mousemove", handleMousemove);
      window.removeEventListener("mousemove", handleMousedown);
    };
  }, [counter]);

  return (
    <div>
      {counter}
      {String(state)}
    </div>
  );
}

export default Test;
