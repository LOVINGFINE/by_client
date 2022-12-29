/*
 * Created by zhangq on 2022/10/19
 * RadioGroup
 */
import { FC, ReactElement } from "react";
import { classNames } from "@/tools/style";
import Radio from ".";

const RadioGroup: FC<RadioGroupProps> = ({
  options = [],
  value = "",
  direction = "horizontal",
  onChange,
}) => {
  /** render */
  return (
    <div className={classNames(["radioGroup", `radioGroup-${direction}`])}>
      {options.map((ele, i) => {
        return (
          <Radio
            checked={value === ele.value}
            onChange={() => onChange && onChange(ele.value)}
            key={i}
            label={ele.label}
            disabled={ele.disabled}
          />
        );
      })}
    </div>
  );
};

/**
 * @interface props
 */
export type RadioValue = string | number | boolean;

export interface RadioOption {
  label?: string | ReactElement;
  value: RadioValue;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options?: RadioOption[];
  value?: RadioValue;
  onChange?(e: RadioValue): void;
  direction?: "vertical" | "horizontal";
}

export default RadioGroup;
