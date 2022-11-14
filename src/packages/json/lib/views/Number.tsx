/*
 * Created by zhangq on 2022/09/05
 *
 */
import { FC, useEffect } from "react";
import { JsonItem } from "../../type";
import styles from "../style.less";

const NumberItem: FC<NumberItemProps> = ({
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
      className={styles["number"]}
      style={{ paddingLeft: indentation * 12 }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item);
      }}
    >
      <span className={styles["number-key"]}>{label} :</span>
      <span className={styles["number-value"]}>{value}</span>
    </div>
  );
};

/**
 * @interface props
 */
export interface NumberItemProps {
  label: string;
  value: number;
  indentation: number;
  item: JsonItem;
  onSelect(e: JsonItem): void;
  selected: boolean;
}

export default NumberItem;
