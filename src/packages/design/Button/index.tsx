/*
 * Created by zhangq on 2021/11/26
 *
 */
import React, { ReactElement, FC, MouseEvent } from "react";
import "./style.less";
import Icon from "../Icon";
import { covertNames } from "../utils/style";

const Button: FC<ButtonProps> = ({
  children,
  type = "default",
  size = "middle",
  onClick,
  style,
  disabled = false,
  loading = false,
  icon,
  link,
  round = false,
}: ButtonProps): ReactElement => {
  const classNames = (() => {
    const list = ["btn"];
    if (disabled || loading) {
      list.push("btn-disabled");
    }
    if (link) {
      list.push(`btn-link-${type}`);
      list.push(`btn-link-${size}`);
    } else if (round) {
      list.push(`btn-round`);
      list.push(`btn-round-${type}`);
      list.push(`btn-round-${size}`);
    } else {
      list.push(`btn-${type}`);
      list.push(`btn-${size}`);
    }
    return covertNames(list);
  })();

  function handleClick(e: MouseEvent) {
    if (onClick && !(disabled || loading)) {
      onClick(e);
    }
  }

  const getChildren = () => {
    if (typeof children === "string") {
      const str = children.replaceAll(" ", "");
      if (str.length === 2) {
        return str.split("").join(" ");
      }
    }
    return children;
  };
  /** render */
  return (
    <div className="button">
      <div onClick={handleClick} className={classNames} style={style}>
        {loading ? (
          <span className={"btn-icon"}>
            <Icon name="spinner" className={"btn-icon-loading"} />
          </span>
        ) : (
          icon && <Icon name={icon} />
        )}
        {getChildren()}
      </div>
    </div>
  );
};
export interface ButtonProps {
  children?: React.ReactElement | (React.ReactElement | string)[] | string;
  type?: "default" | "error" | "primary";
  size?: "middle" | "small" | "large";
  style?: React.CSSProperties;
  onClick?(e?: MouseEvent): void;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  link?: boolean;
  round?: boolean;
}
export default Button;
