/*
 * Created by zhangq on 2022/10/19
 * CheckbookGroup
 */
import { FC } from "react";
import { classNames } from "@/tools/style";
import Checkbook from "./Checkbox";

const CheckbookGroup: FC<CheckboxGroupProps> = ({
  options = [],
  value = "",
  direction = "horizontal",
  onChange,
}) => {
  /** render */
  return (
    <div
      className={classNames(["checkbookGroup", `checkbookGroup-${direction}`])}
    >
      {options.map((ele, i) => {
        return (
          <Checkbook
            checked={value === ele.value}
            onChange={() => onChange && onChange(ele.value)}
            key={i}
          >
            {ele.label}
          </Checkbook>
        );
      })}
    </div>
  );
};

/**
 * @interface props
 */
export type CheckbookValue = string | number | boolean;

export interface CheckbookOption {
  label?: React.ReactNode;
  value: CheckbookValue;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  options?: CheckbookOption[];
  value?: string | number | boolean;
  onChange?(e: CheckbookValue): void;
  direction?: "vertical" | "horizontal";
}

export default CheckbookGroup;
