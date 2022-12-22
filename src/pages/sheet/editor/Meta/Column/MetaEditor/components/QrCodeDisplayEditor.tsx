/*
 * Created by zhangq on 2022/11/30
 * QrCodeDisplayEditor
 */
import { FC } from "react";
import { Radio } from "@/packages/design";
import { QrCodeDisplayType } from "../../../type";

const options: {
  label: string;
  value: QrCodeDisplayType;
}[] = [
  {
    label: "二维码和文本",
    value: "VIEW_LABEL",
  },
  {
    label: "仅二维码",
    value: "VIEW",
  },

  {
    label: "仅文本",
    value: "LABEL",
  },
];
const QrCodeDisplayEditor: FC<QrCodeDisplayEditorProps> = ({
  value,
  onChange,
}) => {
  /** render */
  return <Radio.Group options={options} value={value} onChange={onChange} />;
};

/**
 * @interface props
 */
export interface QrCodeDisplayEditorProps {
  value: QrCodeDisplayType;
  onChange(v: QrCodeDisplayType): void;
}

export default QrCodeDisplayEditor;
