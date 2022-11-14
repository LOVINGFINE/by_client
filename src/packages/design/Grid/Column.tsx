/*
 * Created by zhangq on 2022/10/17
 * Column
 */
import { FC, useEffect } from "react";
import "./style.less";

const Column: FC<ColumnProps> = ({ span }) => {
  /** @State */
  const width = (() => {
    if (span !== undefined) {
      return `${span / 24}%`;
    }
    return "100%";
  })();

  /** @Effect */
  useEffect(() => {}, []);

  /** render */
  return <div className="column" style={{ width }}></div>;
};

/**
 * @interface props
 */
export interface ColumnProps {
  span?: number;
}

export default Column;
