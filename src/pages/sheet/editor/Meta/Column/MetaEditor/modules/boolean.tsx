/*
 * Created by zhangq on 2022/11/28
 * Meta Editor
 */
import { FC, Fragment } from "react";
import { MetaBoolean } from "../../../type";
import { Checkbox, Form, Input } from "@/packages/design";

const MetaBooleanForm: FC<MetaBooleanFormProps> = ({ value, onChange }) => {
  /**
   * @Methods
   */
  function onValueChange(v: Partial<MetaBoolean>) {
    onChange({
      ...value,
      ...v,
    });
  }
  return (
    <Fragment>
      <Form.Item>
        <Checkbox
          checked={value.label}
          onChange={(e) => {
            onValueChange({
              label: e,
            });
          }}
        >
          {"是否显示标签"}
        </Checkbox>
      </Form.Item>
      <Form.Item label={"选中时显示"}>
        <Input
          disabled={!value.label}
          value={value.checked}
          change={(e) => {
            onValueChange({
              checked: e,
            });
          }}
          placeholder="请输入"
        />
      </Form.Item>
      <Form.Item label={"未选中时显示"}>
        <Input
          disabled={!value.label}
          value={value.unChecked}
          change={(e) => {
            onValueChange({
              unChecked: e,
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
export interface MetaBooleanFormProps {
  value: MetaBoolean;
  onChange(e: MetaBoolean): void;
}

export default MetaBooleanForm;
