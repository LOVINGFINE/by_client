/*
 * Created by zhangq on 2022/09/05
 *
 */
import { FC, useEffect } from "react";
import { JsonItem } from "../../type";
import styles from "../style.less";

const BooleanItem: FC<BooleanItemProps> = ({
  label,
  value,
  onSelect,
  indentation,
  item,
}) => {
  /** @State */

  /** @Effect */
  useEffect(() => {}, []);

  /**
   * @Methods
   */

  /** render */
  return (
    <div
      className={styles["boolean"]}
      style={{ paddingLeft: indentation * 12 }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item);
      }}
    >
      <span className={styles["boolean-key"]}>{label} :</span>
      <span className={styles["boolean-value"]}>{value.toString()}</span>
    </div>
  );
};

/**
 * @interface props
 */
export interface BooleanItemProps {
  label: string;
  value: boolean;
  indentation: number;
  item: JsonItem;
  onSelect(e: JsonItem): void;
  selected: boolean;
}

export default BooleanItem;
