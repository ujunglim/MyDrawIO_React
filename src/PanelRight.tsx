/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/style-prop-object */
import { Button, ColorPicker } from "@ui5/webcomponents-react";
import React from "react";
import DrawController from './Controller/DrawController';

function PanelRight() {
  const DrawControllerInstance = DrawController.instance;
  const handleColorChange = (e: any) => {
    if (DrawControllerInstance.targets.length) {
      DrawControllerInstance.rectManager.changeRectColor(e.target.color);
    }
  };

  const handleDelete = () => {
    DrawControllerInstance.rectManager.deleteRect();
  };
  return (
    <div className="panel">
      <ColorPicker onChange={handleColorChange} />
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
}

export default PanelRight;
