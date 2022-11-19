/*
 * Created by zhangq on 2022/09/15
 * style
 */
import { FC } from "react";
import { Dropdown } from "@/packages/design";
import { Action, ColorPicker } from "../Widgets";
import { Icon } from "@/packages/design";
import styles from "../style.less";
import { useClassNames } from "@/plugins/style";

const cn = useClassNames(styles);
const BackgroundColor: FC<BackgroundColorProps> = ({ value, onChange }) => {
  /** render */
  return (
    <Dropdown
      placement="bottomRight"
      overlay={<ColorPicker onChange={onChange} />}
    >
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
    </Dropdown>
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
