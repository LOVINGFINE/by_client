/*
 * Created by zhangq on 2022/12/15
 * MonthPicker
 */
import { FC, MouseEvent } from "react";
import styles from "../style.less";
import { useClassNames } from "@/plugins/style";
import { getYearMonths } from "../utils";

const cn = useClassNames(styles);

export interface MonthOptionProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?(e: MouseEvent): void;
}
const MonthOption: FC<MonthOptionProps> = ({ children, onClick, selected }) => {
  /** render */
  return (
    <li className={styles["month"]}>
      <span
        onClick={onClick}
        className={cn({
          "month-value": true,
          "month-value-selected": selected,
        })}
      >
        {children}
      </span>
    </li>
  );
};

const MonthPicker: FC<MonthPickerProps> = ({ year, value, onChange }) => {
  /** @state */
  const months = getYearMonths(year);
  const selected = (y: number, m: number) => {
    return value.getFullYear() === y && value.getMonth() === m;
  };

  function onMonth(y: number, m: number) {
    if (onChange) {
      const target = new Date(value.toString());
      target.setMonth(m);
      target.setFullYear(y);
      onChange(target);
    }
  }
  /** render */
  return (
    <ul className={styles["monthPicker"]}>
      {months.map((ele) => {
        return (
          <MonthOption
            onClick={() => onMonth(ele.year, ele.value)}
            key={ele.value}
            selected={selected(ele.year, ele.value)}
          >
            {ele.label}
          </MonthOption>
        );
      })}
    </ul>
  );
};

export interface MonthPickerProps {
  year: number;
  value: Date;
  onChange?(e: Date): void;
}

export default MonthPicker;
