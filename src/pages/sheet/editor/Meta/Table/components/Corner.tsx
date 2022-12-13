/*
 * Created by zhangq on 2022/09/09
 * corner
 */
import { FC } from "react";
import styles from "../style.less";

const Corner: FC<CornerProps> = ({ width, height }) => {
  /** render */
  return (
    <div
      style={{
        width,
        height,
      }}
      className={styles["corner"]}
    >
      <span className={styles["corner-title"]}></span>
      <div className={styles["corner-cell"]}>
        序号
      </div>
    </div>
  );
};

/**
 * @interface props
 */
export interface CornerProps {
  width: number;
  height: number;
}

export default Corner;
