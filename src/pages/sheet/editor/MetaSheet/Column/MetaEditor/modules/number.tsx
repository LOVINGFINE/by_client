/*
 * Created by zhangq on 2022/11/28
 * Meta Editor
 */
import { FC, Fragment } from "react";
import { MetaNumber } from "../../../type";
import { Form, Input } from "@/packages/design";

const MetaNumberForm: FC<MetaNumberFormProps> = ({ value, onChange }) => {
  /**
   * @Methods
   */
  function onValueChange(v: Partial<MetaNumber>) {
    onChange({
      ...value,
      ...v,
    });
  }
  return (
    <Fragment>
      <Form.Item label={"小数位数"}>
        <Input.Number
          value={value.decimal}
          change={(e) => {
            const v = parseInt(`${e}`);
            onValueChange({
              decimal: isNaN(v) ? undefined : v,
            });
          }}
          placeholder="请输入"
        />
      </Form.Item>
      <Form.Item label={"单位"}>
        <Input
          value={value.unit}
          change={(e) => {
            onValueChange({
              unit: e,
            });
          }}
          placeholder="请输入"
        />
      </Form.Item>
    </Fragment>
  );
};

/**
 * @interface props
 */
export interface MetaNumberFormProps {
  value: MetaNumber;
  onChange(e: MetaNumber): void;
}

export default MetaNumberForm;
