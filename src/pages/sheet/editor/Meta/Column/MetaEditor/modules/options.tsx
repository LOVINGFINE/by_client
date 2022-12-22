/*
 * Created by zhangq on 2022/11/28
 * Meta Editor
 */
import { FC, Fragment } from "react";
import { MetaOptions } from "../../../type";
import { Checkbox, Form } from "@/packages/design";
import ColorValueEditor from "../components/ColorValueEditor";

const MetaOptionsForm: FC<MetaOptionsFormProps> = ({ value, onChange }) => {
  /**
   * @Methods
   */
  function onValueChange(v: Partial<MetaOptions>) {
    onChange({
      ...value,
      ...v,
    });
  }
  return (
    <Fragment>
      <Form.Item>
        <Checkbox
          checked={value.multiple}
          onChange={(e) => {
            onValueChange({
              multiple: e,
            });
          }}
        >
          {"是否多选"}
        </Checkbox>
      </Form.Item>
      <Form.Item label={"选项"}>
        <ColorValueEditor
          value={value.items}
          onChange={(items) => onValueChange({ items })}
        />
      </Form.Item>
    </Fragment>
  );
};

/**
 * @interface props
 */
export interface MetaOptionsFormProps {
  value: MetaOptions;
  onChange(e: MetaOptions): void;
}

export default MetaOptionsForm;
