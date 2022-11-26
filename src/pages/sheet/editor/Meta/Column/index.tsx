/*
 * Created by zhangq on 2022/11/26
 * style
 */
import { FC, useEffect } from "react";
import styles from "./style.less";
import { VcColumn } from "../type";
import { Icon } from "@/packages/design";

const ColumnRender: FC<ColumnRenderProps> = ({ column }) => {
  /** @State */

  /** @Effect */
  useEffect(() => {}, []);

  /**
   * @Methods
   */

  /** render */
  return (
    <div className={styles["column"]}>
      <span className={styles["column-title"]}>{column.title}</span>
      <span className={styles["column-edit"]}>
        <Icon name="equalizer" />
      </span>
    </div>
  );
};

/**
 * @interface props
 */
export interface ColumnRenderProps {
  column: VcColumn;
}

export default ColumnRender;
