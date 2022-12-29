/*
 * Created by zhangq on 2022/10/27
 * Select.Option
 */
import React, { FC, ReactElement } from "react";
import "./style.less";
import { classNames } from "@/tools/style";

const Option: FC<SelectOptionProp> = ({
  size = "middle",
  icon,
  label,
  value,
  selected,
  children,
  onClick,
}) => {
  /** render */
  return (
    <div
      className={classNames([
        "select-option",
        "select-option-item",
        `select-option-${size}`,
        `${selected ? "select-option-selected" : ""}`,
      ])}
      onClick={() => onClick && onClick(value)}
    >
      {children ? (
        children
      ) : (
        <>
          {icon}
          <span>{label}</span>
        </>
      )}
    </div>
  );
};

/**
 * @interface props
 */
export interface SelectOption {
  icon?: string | ReactElement;
  label?: string;
  value: string | number;
}

export interface SelectOptionProp extends SelectOption {
  size?: "large" | "middle" | "small";
  onClick?(value: string | number): void;
  selected?: boolean;
  children?: ReactElement | ReactElement[];
}

export default Option;
