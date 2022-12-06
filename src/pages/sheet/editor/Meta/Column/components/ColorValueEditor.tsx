/*
 * Created by zhangq on 2022/11/28
 * Meta Editor
 */
import { FC, useEffect } from "react";
import styles from "../style.less";
import { useClassNames } from "@/plugins/style";
import { MetaOptionsItem } from "../../type";
import { Icon, Input } from "@/packages/design";
import { ColorPicker } from "@/components";
// import { meta_config } from "../../final";

const cn = useClassNames(styles);

const MetaEditor: FC<MetaEditorProps> = ({ value, onChange }) => {
  /** @State */
  // const label = meta_config[type].label;
  /** @Effect */
  useEffect(() => {}, []);

  /**
   * @Methods
   */
  function onAddOptionsItem() {
    const items = [
      ...value,
      {
        value: "",
        color: "#ffffff",
      },
    ];
    onChange(items);
  }

  function onChangeOptionsItem(index: number, v: Partial<MetaOptionsItem>) {
    const items = value.map((ele, i) => {
      if (i === index) {
        return {
          ...ele,
          ...v,
        };
      }
      return ele;
    });

    onChange(items);
  }

  return (
    <div className={styles["options"]}>
      {value.map((ele, i) => {
        return (
          <div className={styles["item"]} key={i}>
            <ColorPicker
              onChange={(color) => onChangeOptionsItem(i, { color })}
            >
              <div className={styles["color"]}>
                <span
                  className={cn({
                    "color-value": true,
                    transparent: ele.color === "transparent",
                  })}
                  style={{
                    background: ele.color,
                  }}
                />
                <span className={styles["color-picker"]}>
                  <Icon name="caret-down" />
                </span>
              </div>
            </ColorPicker>
            <Input
              value={ele.value}
              change={(value) => onChangeOptionsItem(i, { value })}
            />
          </div>
        );
      })}
      <div className={styles["options-add"]} onClick={onAddOptionsItem}>
        + 添加选项
      </div>
    </div>
  );
};

/**
 * @interface props
 */
export interface MetaEditorProps {
  value: MetaOptionsItem[];
  onChange(e: MetaOptionsItem[]): void;
}

export default MetaEditor;
