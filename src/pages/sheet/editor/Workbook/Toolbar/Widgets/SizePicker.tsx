/*
 * Created by zhangq on 2022/09/15
 * size picker
 */
import { FC } from "react";
import { useClassNames } from "@/plugins/style";
import styles from "../style.less";

const classNames = useClassNames(styles);

export function getPickerSize() {
  const list: number[] = [];
  for (let i = 12; i < 48; i++) {
    list.push(i);
  }
  return list;
}

const picker_size = getPickerSize();

const SizePicker: FC<SizePickerProps> = ({ onChange, value }) => {
  return (
    <div className={styles["size"]}>
      <ul className={styles["size-ul"]}>
        {picker_size.map((item) => {
          return (
            <li
              onClick={() => onChange(item)}
              className={classNames({
                "size-ul-li": true,
                "size-ul-li-selected": value === item,
              })}
              key={item}
              style={{ fontSize: item }}
            >
              abc
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/**
 * @interface props
 */

export interface SizePickerProps {
  onChange(e: number): void;
  value: number;
}

export default SizePicker;
