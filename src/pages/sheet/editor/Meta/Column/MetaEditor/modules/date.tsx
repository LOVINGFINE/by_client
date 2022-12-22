/*
 * Created by zhangq on 2022/11/28
 * Meta Editor
 */
import { FC, Fragment } from "react";
import { MetaDate } from "../../../type";
import { Form } from "@/packages/design";
import DateFormatEditor from "../components/DateFormatEditor";

const MetaDateForm: FC<MetaDateFormProps> = ({ value, onChange }) => {
  /**
   * @Methods
   */
  function onValueChange(v: Partial<MetaDate>) {
    onChange({
      ...value,
      ...v,
    });
  }
  return (
    <Fragment>
      <Form.Item label={"日期格式"}>
        <DateFormatEditor
          value={value.format}
          onChange={(format) => onValueChange({ format })}
        />
      </Form.Item>
    </Fragment>
  );
};

/**
 * @interface props
 */
export interface MetaDateFormProps {
  value: MetaDate;
  onChange(e: MetaDate): void;
}

export default MetaDateForm;
