/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/style-prop-object */
import React from "react";
import DrawController from "./Controller/DrawController";
import { ColorPicker, Tabs } from "antd";
import { Color } from "antd/es/color-picker";

function PanelRight() {
  const DrawControllerInstance = DrawController.instance;
  const handleColorChange = (value: Color) => {
    if (DrawControllerInstance.targets.length) {
      DrawControllerInstance.rectManager.changeRectColor(value.toHexString());
    }
  };

  const items = [
    {
      label: "Style",
      key: "1",
      children: <ColorPicker onChange={handleColorChange} />,
    },
    {
      label: "Draw",
      key: "2",
      children: "Tab 2",
    },
  ];
  return (
    <div className="panel">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}

export default PanelRight;
