/*
 * Created by zhangq on 2022/10/17
 * Row
 */
import { FC } from "react";
const Row: FC<RowProps> = ({ span, children }) => {
  /** @State */
  const width = (() => {
    if (span !== undefined && span >= 0 && span <= 24) {
      return `${span / 24}%`;
    }
    return "100%";
  })();
  /** render */
  return (
    <div className="row" style={{ width }}>
      {children}
    </div>
  );
};

/**
 * @interface props
 */
export interface RowProps {
  span?: number;
  children?: React.ReactNode;
}

export default Row;
