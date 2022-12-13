/*
 * Created by zhangq on 2022/11/28
 * Meta Editor
 */
import { FC, useState } from "react";
import styles from "../style.less";
import { useClassNames } from "@/plugins/style";
import { MetaOptionsItem } from "../../type";
import { Icon, Input } from "@/packages/design";
import { ColorPicker } from "@/components";

const cn = useClassNames(styles);

const ColorValueEditor: FC<ColorValueEditorProps> = ({ value, onChange }) => {
  const [down, setDown] = useState(false);
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

  function onRemoveOptionsItem(index: number) {
    const items = value.filter((_, i) => i !== index);
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

  function onAddMouseDown() {
    setDown(true);
    document.addEventListener("mouseup", () => {
      setDown(false);
    });
  }
  return (
    <div className={styles["options"]}>
      <div className={styles["options-over"]}>
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
              <span
                className={styles["item-close"]}
                onClick={() => onRemoveOptionsItem(i)}
              >
                <Icon name="close" />
              </span>
            </div>
          );
        })}
      </div>
      <div
        className={cn({
          "options-add": true,
          "options-add-down": down,
        })}
        onMouseDown={onAddMouseDown}
        onMouseUp={onAddOptionsItem}
      >
        + 添加选项
      </div>
    </div>
  );
};

/**
 * @interface props
 */
export interface ColorValueEditorProps {
  value: MetaOptionsItem[];
  onChange(e: MetaOptionsItem[]): void;
}

export default ColorValueEditor;
