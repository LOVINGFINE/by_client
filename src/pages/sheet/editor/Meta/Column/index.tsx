/*
 * Created by zhangq on 2022/11/26
 * style
 */
import { FC } from "react";
import styles from "./style.less";
import { VcColumn } from "../type";
import { Icon } from "@/packages/design";

const ColumnRender: FC<ColumnRenderProps> = ({ column, onSetting }) => {
  /**
   * @Methods
   */
  function onEdit(e: React.MouseEvent) {
    e.stopPropagation();
    onSetting(column);
  }
  /** render */
  return (
    <div className={styles["column"]}>
      <span className={styles["column-title"]}>{column.title}</span>
      <span className={styles["column-edit"]} onMouseDown={onEdit}>
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
  onSetting(c: VcColumn): void;
}

export default ColumnRender;
