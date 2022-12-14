/*
 * Created by zhangq on 2022/12/15
 * Picker
 */
import { CSSProperties, FC, useState } from "react";
import DayPicker from "./Day";
import styles from "../style.less";
import { PickerType } from "../type";
import MonthPicker from "./Month";
import { getDateFormat } from "../utils";
import TimePicker from "./Time";
import { Icon } from "@/packages/design";

const Picker: FC<PickerProps> = ({
  value = new Date(),
  onChange,
  format,
  style = {},
}) => {
  /** @State */
  const [type, setType] = useState<PickerType>("day");
  const [year, setYear] = useState(value.getFullYear());
  const [month, setMonth] = useState(value.getMonth());

  const isDate =
    format.indexOf("D") > -1 ||
    format.indexOf("M") > -1 ||
    format.indexOf("Y") > -1;

  const isHour = format.indexOf("H") > -1;
  const isMin = format.indexOf("m") > -1;
  const isSec = format.indexOf("s") > -1;

  const isTime = isHour || isMin || isSec;

  /**
   * @Methods
   */
  function onMonth(val: number) {
    if (val < 0) {
      setMonth(12);
      setYear(year - 1);
    } else if (val > 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(val);
    }
  }

  function onToday() {
    if (onChange) {
      const current = new Date();
      setYear(current.getFullYear());
      setMonth(current.getMonth());
      const target = new Date(value.toString());
      target.setFullYear(current.getFullYear());
      target.setMonth(current.getMonth());
      target.setDate(current.getDate());
      onChange(target);
    }
  }

  function onTimeNow() {
    if (onChange) {
      const current = new Date();
      const target = new Date(value.toString());
      target.setHours(current.getHours());
      target.setMinutes(current.getMinutes());
      target.setSeconds(current.getSeconds());
      onChange(target);
    }
  }
  /** render */
  const renderPicker = () => {
    switch (type) {
      case "day":
        return (
          <>
            {isDate && (
              <div className={styles["picker-date"]}>
                <div className={styles["picker-top"]}>
                  <div
                    className={styles["picker-date-value"]}
                    onClick={() => setType("month")}
                  >
                    <span>{year}???</span>
                    <span>{month + 1}???</span>
                  </div>
                  <div className={styles["picker-date-auto"]}>
                    <Icon
                      name="angle-left"
                      onClick={() => onMonth(month - 1)}
                    />
                    <span onClick={onToday}>??????</span>
                    <Icon
                      name="angle-right"
                      onClick={() => onMonth(month + 1)}
                    />
                  </div>
                </div>
                <DayPicker
                  year={year}
                  month={month}
                  onChange={onChange}
                  value={value}
                />
              </div>
            )}
            {isTime && (
              <div className={styles["picker-time"]}>
                <div className={styles["picker-top"]}>
                  <div className={styles["picker-time-value"]}>
                    <span>{getDateFormat(value, "HH:mm:ss")}</span>
                  </div>
                  <div className={styles["picker-time-auto"]}>
                    <span onClick={onTimeNow}>??????</span>
                  </div>
                </div>
                <div className={styles["content"]}>
                  {isHour && (
                    <>
                      <TimePicker
                        type={"h"}
                        value={value}
                        onChange={onChange}
                      />
                      <div className={styles["content-line"]}></div>
                    </>
                  )}
                  {isMin && (
                    <>
                      <TimePicker
                        type={"m"}
                        value={value}
                        onChange={onChange}
                      />
                      <div className={styles["content-line"]}></div>
                    </>
                  )}
                  {isSec && (
                    <TimePicker type={"s"} value={value} onChange={onChange} />
                  )}
                </div>
              </div>
            )}
          </>
        );
      case "month":
        return (
          <div className={styles["picker-month"]}>
            <div className={styles["picker-top"]}>
              <Icon
                name="angle-double-left"
                onClick={() => setYear(year - 1)}
              />
              <span>{year}???</span>
              <Icon
                name="angle-double-right"
                onClick={() => setYear(year + 1)}
              />
            </div>
            <MonthPicker
              year={year}
              onChange={(e) => {
                setType("day");
                onChange(e);
              }}
              value={value}
            />
          </div>
        );
      default:
        return <></>;
    }
  };
  return (
    <div
      className={styles["picker"]}
      style={style}
      onMouseUp={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {renderPicker()}
    </div>
  );
};

/**
 * @interface props
 */
export interface PickerProps {
  value?: Date;
  onChange(v: Date): void;
  format: string;
  style?: CSSProperties;
}

export default Picker;
