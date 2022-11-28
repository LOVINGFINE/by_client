/*
 * Created by zhangq on 2022/10/19
 * Checkbook
 */
import { FC } from "react";
import "./style.less";
import { covClass } from "@/plugins/style";

const Checkbook: FC<SwitchProps> = ({
  checked = false,
  disabled,
  size = "middle",
  onChange,
}) => {
  function onCheckedChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!disabled) {
      onChange && onChange(event.target.checked);
    }
  }
  /** render */
  return (
    <input
      type={"checkbox"}
      className={covClass({
        checkbook: true,
        [`checkbook-${size}`]: true,
        "checkbook-checked": checked,
        "checkbook-disabled": disabled,
      })}
      checked={checked}
      onChange={onCheckedChange}
    />
  );
};

/**
 * @interface props
 */
export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?(e: boolean): void;
  size?: "middle" | "small" | "large";
}

export default Checkbook;
