import React from "react";
import "./style.css";
import {
  BgColorsOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  EditOutlined,
  DragOutlined,
  UndoOutlined,
  RedoOutlined,
  BoldOutlined,
  FontColorsOutlined,
  DeleteOutlined,
  HighlightOutlined,
} from "@ant-design/icons";

const SubHeader = () => {
  return (
    <div className="subHeader">
      <ZoomInOutlined rev={""} />
      <ZoomOutOutlined rev={""} />
      <DeleteOutlined rev={""} />
      <EditOutlined rev={""} />
      <BgColorsOutlined rev={""} />
      <FontColorsOutlined rev={""} />
      <BoldOutlined rev={""} />
      <HighlightOutlined rev={""} />
      <RedoOutlined rev={""} />
      <UndoOutlined rev={""} />
      <DragOutlined rev={""} />
    </div>
  );
};

export default SubHeader;
