/*
 * Created by zhangq on 2022/09/15
 * action item
 */
import { FC } from "react";
import styles from "../style.less";
import { picker_colors } from "./";

const ColorPicker: FC<ColorPickerProps> = ({ onChange }) => {
  /** render */
  return (
    <div className={styles["picker-content"]}>
      <div className={styles["over"]}>
        {picker_colors.map((col) => {
          return (
            <ul className={styles["picker-content-ul"]} key={col.key}>
              {col.items.map((item, i) => {
                return (
                  <li
                    onClick={() => onChange(item)}
                    className={styles["picker-content-ul-li"]}
                    key={`${i}-color`}
                    style={{ backgroundColor: item }}
                  />
                );
              })}
            </ul>
          );
        })}
      </div>
    </div>
  );
};
/**
 * @interface props
 */
export interface ColorPickerProps {
  onChange(e: string): void;
}

export default ColorPicker;

// export const base_colors = {
//   cyan: "#13C2C2",
//   blue: "#1890FF",
//   geekblue: "#2F54EB",
//   purple: "#722ED1",
//   volcano: "#FA541C",
//   red: "#F5222D",
//   orange: "#FA8C16",
//   yellow: "#FADB14",
//   gold: "#FAAD14",
//   lime: "#A0D911",
//   green: "#52C41A",
//   magenta: "#EB2F96",
//   grey: "#666666",
// };
