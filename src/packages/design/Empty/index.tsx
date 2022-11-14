/*
 * Created by zhangq on 2022/01/27
 * empty component
 */
import React, { ReactElement, FC, CSSProperties } from "react";
import "./style.less";

const Empty: FC<EmptyProps> = ({ children }: EmptyProps): ReactElement => {
  /** render */
  return <div className={"empty"}>{children}</div>;
};

/**
 * @interface props
 */
export interface EmptyProps {
  children?: ReactElement;
  style?: CSSProperties;
}

export default Empty;
