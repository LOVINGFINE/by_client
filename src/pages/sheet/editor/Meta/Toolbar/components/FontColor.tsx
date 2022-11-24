/*
 * Created by zhangq on 2022/09/15
 * style
 */
import { FC } from "react";
import { Dropdown } from "@/packages/design";
import { Action, ColorPicker } from "../Widgets";
import styles from "../style.less";

const FontColor: FC<FontColorProps> = ({ value, onChange }) => {
  /** render */
  return (
    <Dropdown
      placement="bottomRight"
      overlay={<ColorPicker onChange={onChange} />}
    >
      <Action>
        <div className={styles["font-color"]}>
          A
          <span
            className={styles["font-color-under"]}
            style={{
              background: value,
            }}
          />
        </div>
      </Action>
    </Dropdown>
  );
};

/**
 * @interface props
 */
export interface FontColorProps {
  value: string;
  onChange(e: string): void;
}

export default FontColor;
