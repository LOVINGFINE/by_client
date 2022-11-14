/*
 * Created by zhangq on 2022/09/05
 *
 */
import { FC, useEffect } from "react";
import styles from "../style.less";
import { JsonItem } from "../../type";
import ItemView from "./index";
const ArrayItem: FC<ArrayItemProps> = ({
  label,
  items = [],
  indentation,
  isRoot = false,
  item,
  onSelect,
  selects,
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
      className={styles["array"]}
      style={{ paddingLeft: indentation * 12 }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item);
      }}
    >
      <div className={styles["array-view"]}>
        <span className={styles["array-view-key"]}>{label} :</span>
      </div>
      <div
        className={`${styles["array-values"]} ${
          isRoot ? "" : styles["array-values-line"]
        }`}
        style={{
          paddingLeft: isRoot ? 0 : 12,
        }}
      >
        {items.map((ele) => {
          return (
            <ItemView
              {...ele}
              key={ele.path}
              selects={selects}
              onSelect={onSelect}
            />
          );
        })}
      </div>
    </div>
  );
};

/**
 * @interface props
 */
export interface ArrayItemProps {
  label: string;
  items?: JsonItem[];
  indentation: number;
  isRoot?: boolean;
  item: JsonItem;
  selects: string[];
  onSelect(e: JsonItem): void;
}

export default ArrayItem;
