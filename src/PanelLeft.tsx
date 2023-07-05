/* eslint-disable jsx-a11y/alt-text */
import { Button, Collapse, Input } from "antd";
import React from "react";
import DrawController from "./Controller/DrawController";
import "./index.css";

function PanelLeft() {
  const DrawControllerInstance = DrawController.instance;

  const handleCreateRect = () => {
    DrawControllerInstance.rectManager.createRect();
  };

  const handleDelete = () => {
    DrawControllerInstance.rectManager.deleteRect();
  };

  return (
    <div className="panel">
      <div className="part">
        <Input type="Text" placeholder="Search Shapes" />
      </div>
      <Collapse
        size="small"
        items={[
          {
            key: "1",
            label: "Create / Delete",
            children: (
              <div style={{ display: "flex" }}>
                <Button onClick={handleCreateRect}>Create</Button>
                <Button onClick={handleDelete} style={{ marginLeft: "1rem" }}>
                  Delete
                </Button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

export default PanelLeft;
