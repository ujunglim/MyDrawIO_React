import React, { useEffect, useState } from "react";

function Test() {
  let counter = 0;
  const [rects, setRects] = useState([
    {
      x: 50,
      y: 10,
      w: 140,
      h: 40,
      color: 'red'
    },
    {
      x: 120,
      y: 110,
      w: 40,
      h: 140,
      color: 'pink'
    }
  ]);

  useEffect(() => {

  }, [counter]);

  return (
    <>
      {rects.map((rect, i) => (
        <div key={i} style={{width: rect.w, height: rect.h, background: rect.color, position: 'relative', top: rect.y, left: rect.x}}>sdf</div>
      ))}
    </>
  );
}

export default Test;
