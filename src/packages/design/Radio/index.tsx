/*
 * Created by zhangq on 2022/10/19
 * Radio
 */
import { FC, ReactElement } from "react";
import "./style.less";

const Radio: FC<RadioProps> = ({
  checked = false,
  disabled,
  label = "",
  onChange,
}) => {
  function onClick(event: React.MouseEvent) {
    event;
    if (!disabled) {
      onChange && onChange(!checked);
    }
  }
  /** render */
  return (
    <div
      className={`radio ${disabled ? "radio-disabled" : ""}`}
      onClick={onClick}
    >
      <div className="radio-align">
        <span className={`radio-value radio-value-${checked}`}>
          <span className={`radio-value-checked`} />
        </span>
        {label}
      </div>
    </div>
  );
};

/**
 * @interface props
 */
export interface RadioProps {
  checked?: boolean;
  label?: string | ReactElement;
  disabled?: boolean;
  onChange?(e: boolean): void;
}

export { default as RadioGroup } from "./Group";
export default Radio;
