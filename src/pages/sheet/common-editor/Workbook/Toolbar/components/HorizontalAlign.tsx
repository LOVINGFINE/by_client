/*
 * Created by zhangq on 2022/09/15
 * style Horizontal
 */
import { FC } from "react";
import styles from "../style.less";
import { Action } from "../Widgets";
import { Horizontal } from "../../type";

const { left, center, right } = Horizontal;
const HorizontalAlign: FC<HorizontalAlignProps> = ({ value, onChange }) => {
  /**
   * @Methods
   */
  function onAction(key: Horizontal) {
    if (key !== value) {
      onChange(key);
    }
  }
  /** render */
  return (
    <div className={styles["align"]}>
      <Action
        selected={value === left}
        icon="align-left"
        onClick={() => onAction(left)}
      />
      <Action
        selected={value === center}
        icon="align-justify"
        onClick={() => onAction(center)}
      />
      <Action
        selected={value === right}
        icon="align-right"
        onClick={() => onAction(right)}
      />
    </div>
  );
};

/**
 * @interface props
 */
export interface HorizontalAlignProps {
  value?: Horizontal;
  onChange(e: Horizontal): void;
}

export default HorizontalAlign;
