/*
 * Created by zhangq on 2022/09/09
 * corner
 */
import { FC } from "react";
import styles from "../style.less";

const TCorner: FC<TCornerProps> = ({ width, height, children }) => {
  /** render */
  return (
    <div
      style={{
        width,
        height,
      }}
      className={styles["corner"]}
    >
      {children}
    </div>
  );
};

/**
 * @interface props
 */
export interface TCornerProps {
  width: number;
  height: number;
  children?: React.ReactNode;
}

export default TCorner;
