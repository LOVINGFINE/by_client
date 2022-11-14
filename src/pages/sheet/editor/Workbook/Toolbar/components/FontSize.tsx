/*
 * Created by zhangq on 2022/09/15
 * font size
 */
import { FC } from "react";
import { Icon, Dropdown } from "@/packages/design";
import styles from "../style.less";
import { Action, SizePicker } from "../Widgets";

const FontSize: FC<FontSizeProps> = ({ value, onChange }) => {
  /** render */
  return (
    <Action>
      <span className={styles["font-size-input"]}>{value}</span>
      <Dropdown
        placement="bottomRight"
        overlay={<SizePicker value={value} onChange={onChange} />}
      >
        <span className={styles["font-size-picker"]}>
          <Icon name="caret-down" />
        </span>
      </Dropdown>
    </Action>
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
