/*
 * Created by zhangq on 2022/10/18
 * Grid
 */
import { FC } from "react";

const Grid: FC<GridProps> = ({ children }) => {
  /** render */
  return <div className={"container"}>{children}</div>;
};

/**
 * @interface props
 */
export interface GridProps {
  children?: React.ReactElement | React.ReactElement[] | string;
}

export default Grid;
