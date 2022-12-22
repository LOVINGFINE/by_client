/*
 * Created by zhangq on 2022/10/19
 * Switch
 */
import { FC, ReactElement } from "react";
import "./style.less";
import { classNames } from "@/plugins/style";

const Switch: FC<SwitchProps> = ({
  checked = false,
  disabled,
  label,
  size = "middle",
  onChange,
}) => {
  function onClick() {
    if (!disabled) {
      onChange && onChange(!checked);
    }
  }
  const labelEle = (() => {
    if (label) {
      if (checked) {
        return label?.open || "";
      }
      return label?.close || "";
    }
    return "";
  })();
  /** render */
  return (
    <div
      className={classNames({
        switch: true,
        [`switch-${size}`]: true,
        "switch-checked": checked,
        "switch-disabled": disabled,
      })}
      onClick={onClick}
    >
      <div className={`switch-display switch-display-${size}-${checked}`}>
        {labelEle}
        <div className={`switch-handle`} />
      </div>
    </div>
  );
};

/**
 * @interface props
 */
export interface SwitchProps {
  checked?: boolean;
  label?: {
    open?: string | ReactElement;
    close?: string | ReactElement;
  };
  disabled?: boolean;
  onChange?(e: boolean): void;
  size?: "middle" | "small" | "large";
}

export default Switch;
