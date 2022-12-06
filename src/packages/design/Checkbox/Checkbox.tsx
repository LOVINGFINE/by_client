/*
 * Created by zhangq on 2022/10/19
 * Checkbox
 */
import { FC } from "react";
import "./style.less";
import { covClass } from "@/plugins/style";

const Checkbox: FC<CheckboxProps> = ({
  checked = false,
  disabled,
  size = "middle",
  onChange,
  children,
}) => {
  function onCheckedChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!disabled) {
      onChange && onChange(event.target.checked);
    }
  }
  /** render */
  return (
    <label className="checkbox">
      <input
        className={covClass({
          "checkbox-wrapper": true,
          [`checkbox-wrapper-${size}`]: true,
          "checkbox-wrapper-checked": checked,
          "checkbox-wrapper-disabled": disabled,
        })}
        type={"checkbox"}
        checked={checked}
        onChange={onCheckedChange}
      />
      {children && <span>{children}</span>}
    </label>
  );
};

/**
 * @interface props
 */
export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?(e: boolean): void;
  size?: "middle" | "small" | "large";
  children?: React.ReactNode;
}

export default Checkbox;
