/*
 * Created by zhangq on 2022/09/09
 * corner
 */
import { FC } from "react";
import styles from "../style.less";

const Corner: FC<CornerProps> = ({ width = 28, height = 28 }) => {
  /** render */
  return (
    <div
      style={{
        width,
        height,
      }}
      className={styles["corner"]}
    >
      <span>序号</span>
    </div>
  );
};

/**
 * @interface props
 */
export interface CornerProps {
  width?: number;
  height?: number;
}

export default Corner;
