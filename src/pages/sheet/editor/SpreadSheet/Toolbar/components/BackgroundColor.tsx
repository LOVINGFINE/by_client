/*
 * Created by zhangq on 2022/09/15
 * style
 */
import { FC } from "react";
import { Action } from "../Widgets";
import { Icon } from "@/packages/design";
import styles from "../style.less";
import { useClassNames } from "@/plugins/style";
import { ColorPicker } from "@/components";

const cn = useClassNames(styles);
const BackgroundColor: FC<BackgroundColorProps> = ({ value, onChange }) => {
  /** render */
  return (
    <ColorPicker value={value} onChange={onChange}>
      <Action>
        <div className={styles["background"]}>
          <span
            className={cn({
              "background-value": true,
              transparent: value === "transparent",
            })}
            style={{
              background: value,
            }}
          />
          <span className={styles["background-picker"]}>
            <Icon name="caret-down" />
          </span>
        </div>
      </Action>
    </ColorPicker>
  );
};

/**
 * @interface props
 */
export interface BackgroundColorProps {
  value: string;
  onChange(e: string): void;
}

export default BackgroundColor;
