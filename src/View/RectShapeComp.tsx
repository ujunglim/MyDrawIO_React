import React, { useEffect, useState } from "react";
import { SHAPE_STATUS } from "../Common/constants";
import PortComp from "./PortComp";
import Port from "../Model/Ports";
import RectShape from "../Model/RectShape";
import { v4 as uuidv4 } from "uuid";
import { observer } from "mobx-react-lite";
import { Card, Input } from "antd";
import "./index.css";

const RectShapeComp: React.FC<{ rect: RectShape; controller: any }> = observer(
  ({ rect }) => {
    const {
      id,
      status,
      color,
      shape: {
        w,
        h,
        pos: { x, y },
      },
      title,
      content,
    } = rect;

    const [cardTitle, setCardTitle] = useState<string>();
    const [cardContent, setCardContent] = useState<string>();

    useEffect(() => {
      setCardTitle(title);
      setCardContent(content);
    }, [title, content]);

    return (
      <div key={id} className="rectShape">
        <Card
          className="card"
          title={
            <Input
              placeholder="Title"
              bordered={false}
              onChange={(e) => {
                rect.setTitle(e.target.value);
                setCardTitle(e.target.value);
              }}
              value={cardTitle}
              style={{ fontWeight: "bold" }}
            />
          }
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: w,
            height: h,
            background: color,
            border: "none",
            outline: `${
              status === SHAPE_STATUS.SELECTED ? 2 : 0
            }px solid #1677ff`,
          }}
        >
          <Input.TextArea
            placeholder="Content"
            bordered={false}
            onChange={(e) => {
              rect.setContent(e.target.value);
              setCardContent(e.target.value);
            }}
            value={cardContent}
            autoSize
          />
        </Card>
        {rect.getActivePorts()?.map((port: Port) => (
          <PortComp port={port} key={uuidv4()} />
        ))}
      </div>
    );
  }
);

export default RectShapeComp;
