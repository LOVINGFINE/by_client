/*
 * Created by zhangq on 2021/11/26
 * Space 组件
 */
import React, { FC } from "react";
import "./style.less";

const Space: FC<SpaceProps> = ({
  children,
  style,
  direction = "row",
}: SpaceProps) => {
  /** render */
  return (
    <div className={`space space-${direction}`} style={style}>
      {children}
    </div>
  );
};

export interface SpaceProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  direction?: "row" | "column";
}
export default Space;
