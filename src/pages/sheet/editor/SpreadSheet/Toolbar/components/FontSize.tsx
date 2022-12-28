/*
 * Created by zhangq on 2022/09/15
 * font size
 */
import { FC } from "react";
import { Icon } from "@/packages/design";
import styles from "../style.less";
import { Action } from "../Widgets";
import { SizePicker } from "@/components";

const FontSize: FC<FontSizeProps> = ({ value, onChange }) => {
  /** render */
  return (
    <div className={styles["font-size"]}>
      <span className={styles["font-size-input"]}>{value}</span>
      <SizePicker value={value} onChange={onChange}>
        <span className={styles["font-size-picker"]}>
          <Icon name="caret-down" />
        </span>
      </SizePicker>
    </div>
  );
};

/**
 * @interface props
 */
export interface FontSizeProps {
  value: number;
  onChange(e: number): void;
}

export default FontSize;
