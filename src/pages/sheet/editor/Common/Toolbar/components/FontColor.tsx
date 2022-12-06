/*
 * Created by zhangq on 2022/09/15
 * style
 */
import { FC } from "react";
import { Action } from "../Widgets";
import styles from "../style.less";
import { ColorPicker } from "@/components";

const FontColor: FC<FontColorProps> = ({ value, onChange }) => {
  /** render */
  return (
    <ColorPicker value={value} onChange={onChange}>
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
    </ColorPicker>
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
