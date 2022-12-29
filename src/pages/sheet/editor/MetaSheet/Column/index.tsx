/*
 * Created by zhangq on 2022/11/26
 * style
 */
import { FC } from "react";
import styles from "./style.less";
import { MetaColumn } from "../type";
import { Icon } from "@/packages/design";
import { useClassNames } from "@/tools/style";

const cn = useClassNames(styles);
const ColumnRender: FC<ColumnRenderProps> = ({
  column,
  onSetting,
  selection,
}) => {
  /**
   * @Methods
   */
  function onEdit(e: React.MouseEvent) {
    e.stopPropagation();
    onSetting(column);
  }
  /** render */
  return (
    <div
      className={cn({
        column: true,
        "column-selection": selection,
      })}
    >
      <span className={styles["column-title"]}>{column.title}</span>
      <span className={styles["column-edit"]} onMouseDown={onEdit}>
        <Icon name="setting" />
      </span>
    </div>
  );
};

/**
 * @interface props
 */
export interface ColumnRenderProps {
  column: MetaColumn;
  onSetting(c: MetaColumn): void;
  selection: boolean;
}

export default ColumnRender;
