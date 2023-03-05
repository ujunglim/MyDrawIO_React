/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/style-prop-object */
import React from "react";
import DrawControllerInstance from "./Controller/DrawController";

function PanelRight() {
  const handleColorChange = (e) => {
    DrawControllerInstance.rectManager.changeRectColor(e.target.value);
  };

  const handleDelete = () => {
    DrawControllerInstance.rectManager.deleteRect();
  };
  return (
    <div className="panel">
      <input type={"color"} onChange={handleColorChange} />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default PanelRight;
