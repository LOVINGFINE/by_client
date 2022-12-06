/*
 * Created by zhangq on 2022/11/28
 * Meta Editor
 */
import { FC, Fragment } from "react";
import { MetaConfig, MetaDate, MetaOptions, MetaType } from "../../type";
import { Form } from "@/packages/design";
import ColorValueEditor from "./ColorValueEditor";
import DateFormatEditor from "./DateFormatEditor";

const MetaEditor: FC<MetaEditorProps> = ({ type, meta, onChange }) => {
  /**
   * @Methods
   */
  function onOptions(v: Partial<MetaOptions>) {
    onChange({
      ...meta,
      options: {
        ...meta.options,
        ...v,
      },
    });
  }

  function onDate(v: Partial<MetaDate>) {
    onChange({
      ...meta,
      date: {
        ...meta.date,
        ...v,
      },
    });
  }

  switch (type) {
    case MetaType.Number:
      return (
        <Fragment>
          <Form.Item label={"小数位数"}></Form.Item>
          <Form.Item label={"单位"}></Form.Item>
        </Fragment>
      );
    case MetaType.Date:
      return (
        <Form.Item label={"日期格式"}>
          <DateFormatEditor
            value={meta.date.format}
            onChange={(format) => onDate({ format })}
          />
        </Form.Item>
      );
    case MetaType.QrCode:
      return (
        <Fragment>
          <Form.Item label={"二维码尺寸"}></Form.Item>
        </Fragment>
      );
    case MetaType.Options:
      return (
        <Form.Item label={"选项"}>
          <ColorValueEditor
            value={meta.options.items}
            onChange={(items) => onOptions({ items })}
          />
        </Form.Item>
      );
    default:
      return <></>;
  }
};

/**
 * @interface props
 */
export interface MetaEditorProps {
  type: MetaType;
  meta: MetaConfig;
  onChange(e: MetaConfig): void;
}

export default MetaEditor;
