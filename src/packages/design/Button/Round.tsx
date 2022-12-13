/*
 * Created by zhangq on 2021/11/26
 * RoundButton
 */
import React, { ReactElement, FC, MouseEvent, useState } from "react";
import { covertNames } from "../utils/style";

const RoundButton: FC<RoundButtonProps> = ({
  children,
  type = "default",
  size = "middle",
  onClick,
  disabled = false,
}: RoundButtonProps): ReactElement => {
  const [down, setDown] = useState(false);
  const classNames = (() => {
    const list = ["btn", `btn-round`, `btn-round-${type}`, `btn-round-${size}`];
    if (down) {
      list.push(`btn-down`);
    }
    if (disabled) {
      list.push("btn-disabled");
    }
    return covertNames(list);
  })();

  const getChildren = () => {
    if (typeof children === "string") {
      const str = children.replaceAll(" ", "");
      if (str.length === 2) {
        return str.split("").join(" ");
      }
    }
    return children;
  };

  function handleClick(e: MouseEvent) {
    if (onClick && !disabled) {
      onClick(e);
    }
  }

  function onSetDown(e: React.MouseEvent) {
    e.stopPropagation();
    if (!disabled) {
      setDown(true);
      document.addEventListener("mouseup", () => {
        setDown(false);
      });
    }
  }
  /** render */
  return (
    <div className={`button-wrapper`}>
      <div
        onMouseUp={handleClick}
        onMouseDown={onSetDown}
        className={classNames}
      >
        {getChildren()}
      </div>
    </div>
  );
};

export interface RoundButtonProps {
  children?: React.ReactNode;
  type?: "default" | "error" | "primary";
  size?: "middle" | "small" | "large";
  onClick?(e?: MouseEvent): void;
  disabled?: boolean;
}

export default RoundButton;
