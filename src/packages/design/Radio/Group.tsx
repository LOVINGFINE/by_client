/*
 * Created by zhangq on 2022/10/19
 * RadioGroup
 */
import { FC, ReactElement } from "react";
import "./style.less";
import { covClass } from "@/plugins/style";
import Radio from ".";

const RadioGroup: FC<RadioGroupProps> = ({
  options = [],
  value = "",
  direction = "horizontal",
  onChange,
}) => {
  /** render */
  return (
    <div className={covClass(["radioGroup", `radioGroup-${direction}`])}>
      {options.map((ele, i) => {
        return (
          <Radio
            checked={value === ele.key}
            onChange={() => onChange && onChange(ele.key)}
            key={i}
            label={ele.label}
          />
        );
      })}
    </div>
  );
};

/**
 * @interface props
 */
export interface RadioOption {
  label: string | ReactElement;
  key: string;
}
export interface RadioGroupProps {
  options?: RadioOption[];
  value?: string;
  onChange?(e: string): void;
  direction?: "vertical" | "horizontal";
}

export default RadioGroup;
