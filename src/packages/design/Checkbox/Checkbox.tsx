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
    <div className="checkbox-wrapper">
      <div className="checkbox">
        <span
          className={covClass({
            "checkbox-value": true,
            [`checkbox-value-${size}`]: true,
            "checkbox-value-checked": checked,
            "checkbox-value-disabled": disabled,
          })}
        ></span>
        <input
          style={{
            opacity: 0,
            position: "absolute",
          }}
          className={`checkbox-value-${size} ${
            disabled ? "checkbox-value-disabled" : ""
          } `}
          type={"checkbox"}
          checked={checked}
          onChange={onCheckedChange}
        />
        {children && <span>{children}</span>}
      </div>
    </div>
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
