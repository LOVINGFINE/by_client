/*
 * Created by zhangq on 2022/09/05
 *
 */
import { FC, useEffect } from "react";
import { JsonItem } from "../../type";
import styles from "../style.less";

const StringItem: FC<StringItemProps> = ({
  onSelect,
  label,
  value,
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
      className={styles["string"]}
      style={{ paddingLeft: indentation * 12 }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item);
      }}
    >
      <span className={styles["string-key"]}>{label} :</span>
      <span className={styles["string-value"]}>{value}</span>
    </div>
  );
};

/**
 * @interface props
 */
export interface StringItemProps {
  label: string;
  value: string;
  indentation: number;
  item: JsonItem;
  onSelect(e: JsonItem): void;
  selected: boolean;
}

export default StringItem;
