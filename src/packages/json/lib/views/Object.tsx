/*
 * Created by zhangq on 2022/09/05
 *
 */
import { FC, useEffect } from "react";
import styles from "../style.less";
import { JsonItem } from "../../type";
import ItemView from "./index";
const ObjectItem: FC<ObjectItemProps> = ({
  label,
  items = [],
  paddingLeft = 0,
  isRoot = false,
  item,
  selects,
  onSelect,
}) => {
  /** @Effect */
  useEffect(() => {}, []);

  /**
   * @Methods
   */

  /** render */
  return (
    <div
      className={styles["map"]}
      style={{ paddingLeft }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item);
      }}
    >
      {label && (
        <div className={styles["map-view"]}>
          <span className={styles["map-view-key"]}>{label} :</span>
        </div>
      )}
      <div
        className={`${styles["map-values"]} ${
          isRoot ? "" : styles["map-values-line"]
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
export interface ObjectItemProps {
  label?: string;
  items?: JsonItem[];
  paddingLeft?: number;
  isRoot?: boolean;
  item: JsonItem;
  selects: string[];
  onSelect(e: JsonItem): void;
}

export default ObjectItem;
