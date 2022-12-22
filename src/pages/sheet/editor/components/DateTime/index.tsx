/*
 * Created by zhangq on 2022/12/15
 * DateTimePicker
 */
import ReactDOM from "react-dom";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./style.less";
import { getStyles } from "./utils";
import Picker from "./Picker";
import dayjs from "dayjs";
import { Icon } from "@/packages/design";

const DateTimePicker: FC<DateTimePickerProps> = ({
  value,
  format = "YYYY/MM/DD HH:mm:ss",
  onChange,
  placement = "bottom",
  enabled,
}) => {
  const pickerRef = useRef<HTMLInputElement>(null);
  /** @State */
  const renderStyle = getStyles(pickerRef.current, placement);
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState<undefined | Date>(value);

  const selectedElement = (() => {
    if (value) {
      return dayjs(date).format(format);
    }
    return <span style={{ color: "#ddd" }}>请选择日期</span>;
  })();
  /** @Effect */
  useEffect(() => {
    if (visible) {
      if (value && date) {
        if (value.toDateString() !== date.toDateString()) {
          setDate(value);
        }
      }
    } else {
      if (onChange) {
        if (date) {
          if (value) {
            if (value.toDateString() !== date.toDateString()) {
              onChange(date);
            }
          } else {
            onChange(date);
          }
        }
      }
    }
  }, [visible]);

  /**
   * @Methods
   */

  function onVisible() {
    if (!visible) {
      window.addEventListener("mouseup", () => setVisible(false), {
        once: true,
      });
    }
    setVisible(!visible);
  }
  /** render */
  return (
    <div className={styles["datePicker"]} ref={pickerRef}>
      {visible &&
        ReactDOM.createPortal(
          <Picker
            value={date}
            style={renderStyle}
            onChange={setDate}
            format={format}
          />,
          document.body
        )}
      {selectedElement}
      {enabled && (
        <Icon
          onClick={onVisible}
          name="calendar-o"
          className={styles["datePicker-down"]}
        />
      )}
    </div>
  );
};

/**
 * @interface props
 */
export interface DateTimePickerProps {
  value?: Date;
  format?: string;
  onChange?(e: Date): void;
  placement?: "bottom" | "top";
  enabled?: boolean;
}

export default DateTimePicker;
