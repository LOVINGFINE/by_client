/*
 * Created by zhangq on 2022/12/15
 * DayPicker
 */
import { CSSProperties, FC, MouseEvent } from "react";
import styles from "../style.less";
import { week_days } from "../final";
import { Day, WeekDay } from "../type";
import { useClassNames } from "@/plugins/style";
import { getMonthWeeks } from "../utils";

const cn = useClassNames(styles);

export interface DayOptionProps {
  weekDay?: WeekDay;
  children: React.ReactNode;
  selected?: boolean;
  hover?: boolean;
  style?: CSSProperties;
  currentMonth?: boolean;
  onClick?(e: MouseEvent): void;
}
const DayOption: FC<DayOptionProps> = ({
  children,
  weekDay,
  onClick,
  selected,
  hover,
  style = {},
  currentMonth = true,
}) => {
  const color = (() => {
    if (!currentMonth) {
      return "#ddd";
    }
    if (weekDay === "sun" || weekDay === "sat") {
      return "var(--d-desc)";
    }
    return style.color;
  })();

  /** render */
  return (
    <li
      className={"day"}
      style={{
        ...style,
        color,
      }}
    >
      <span
        onClick={onClick}
        className={cn({
          "day-value": true,
          "day-value-hover": hover,
          "day-value-selected": selected,
        })}
      >
        {children}
      </span>
    </li>
  );
};

const DayPicker: FC<DayPickerProps> = ({ year, month, value, onChange }) => {
  /** @state */
  const weeks = getMonthWeeks(year, month);
  const selected = (day: Day) => {
    return (
      value.getFullYear() === day.year &&
      value.getMonth() + 1 === day.month &&
      value.getDate() === day.value
    );
  };

  function onDate(day: Day) {
    if (onChange) {
      const target = new Date(value.toString());
      target.setDate(day.value);
      target.setMonth(day.month - 1);
      target.setFullYear(day.year);
      onChange(target);
    }
  }
  /** @render */
  return (
    <div className={styles["dayPicker"]}>
      <ul
        className={styles["week"]}
        style={{
          marginBottom: 8,
        }}
      >
        {week_days.map((ele) => {
          return (
            <DayOption
              style={{
                fontWeight: "bold",
                color: "var(--d-title)",
              }}
              weekDay={ele.value}
              key={ele.value}
            >
              {ele.label}
            </DayOption>
          );
        })}
      </ul>
      {weeks.map((week, i) => {
        return (
          <ul key={`week-${i}`} className={styles["week"]}>
            {week.map((day, j) => {
              return (
                <DayOption
                  currentMonth={day.month === month + 1}
                  key={`day-${i}-${j}`}
                  hover={true}
                  weekDay={day.weekDay}
                  selected={selected(day)}
                  onClick={() => onDate(day)}
                >
                  {day.value}
                </DayOption>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
};

export interface DayPickerProps {
  month: number;
  year: number;
  value: Date;
  onChange?(e: Date): void;
}

export default DayPicker;
