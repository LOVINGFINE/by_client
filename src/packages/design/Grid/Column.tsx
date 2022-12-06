/*
 * Created by zhangq on 2022/10/17
 * Column
 */
import { FC } from "react";

const Column: FC<ColumnProps> = ({ span, children }) => {
  /** @State */
  const width = (() => {
    if (span !== undefined && span >= 0 && span <= 24) {
      return `${span / 24}%`;
    }
    return "100%";
  })();

  /** render */
  return (
    <div className="column" style={{ width }}>
      {children}
    </div>
  );
};

/**
 * @interface props
 */
export interface ColumnProps {
  span?: number;
  children?: React.ReactNode;
}

export default Column;
