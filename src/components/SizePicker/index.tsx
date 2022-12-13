/*
 * Created by zhangq on 2022/09/15
 * size picker
 */
import { FC, ReactElement } from "react";
import { useClassNames } from "@/plugins/style";
import styles from "./style.less";
import { picker_sizes } from "./final";
import { Dropdown } from "@/packages/design";

const classNames = useClassNames(styles);

const SizePicker: FC<SizePickerProps> = ({ onChange, value, children }) => {
  return (
    <Dropdown
      placement="bottom"
      overlay={
        <div
          className={styles["size"]}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <ul className={styles["size-ul"]}>
            {picker_sizes.map((item) => {
              return (
                <li
                  onClick={() => onChange && onChange(item)}
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
      }
    >
      {children}
    </Dropdown>
  );
};

/**
 * @interface props
 */

export interface SizePickerProps {
  onChange?(e: number): void;
  value?: number;
  children: ReactElement;
}

export default SizePicker;
