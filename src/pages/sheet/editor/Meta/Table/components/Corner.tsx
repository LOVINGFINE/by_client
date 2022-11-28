/*
 * Created by zhangq on 2022/09/09
 * corner
 */
import { Icon } from "@/packages/design";
import { FC } from "react";
import styles from "../style.less";

const Corner: FC<CornerProps> = ({ width, height, onAddRow }) => {
  /** render */
  return (
    <div
      style={{
        width,
        height,
      }}
      className={styles["corner"]}
    >
      <span className={styles["corner-title"]}>序号</span>
      <div className={styles["corner-addRow"]} onClick={onAddRow}>
        <Icon name="plus" />
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
  onAddRow(): void;
}

export default Corner;
