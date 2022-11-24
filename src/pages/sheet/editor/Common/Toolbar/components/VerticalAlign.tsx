/*
 * Created by zhangq on 2022/09/15
 * style VerticalAlign
 */
import { FC } from "react";
import styles from "../style.less";
import { Action } from "../Widgets";
import { Vertical } from "../../type";

const { top, middle, bottom } = Vertical;

const VerticalAlign: FC<VerticalAlignProps> = ({ value, onChange }) => {
  /**
   * @Methods
   */
  function onAction(key: Vertical) {
    if (key !== value) {
      onChange(key);
    }
  }
  /** render */
  return (
    <div className={styles["align"]}>
      <Action
        selected={value === middle}
        icon="align-middle"
        onClick={() => onAction(middle)}
      />
      <Action
        selected={value === top}
        icon="align-top"
        onClick={() => onAction(top)}
      />
      <Action
        selected={value === bottom}
        icon="align-bottom"
        onClick={() => onAction(bottom)}
      />
    </div>
  );
};

/**
 * @interface props
 */
export interface VerticalAlignProps {
  value?: Vertical;
  onChange(e: Vertical): void;
}

export default VerticalAlign;
