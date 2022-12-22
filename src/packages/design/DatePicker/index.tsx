/*
 * Created by zhangq on 2022/12/15
 * DatePicker
 */
import ReactDOM from "react-dom";
import { FC, useEffect, useRef, useState } from "react";
import "./style.less";
import { getStyles } from "./utils";
import Picker from "./Picker";
import dayjs from "dayjs";
import Icon from "../Icon";

const DatePicker: FC<DatePickerProps> = ({
  trigger = "click",
  value,
  format = "YYYY/MM/DD HH:mm:ss",
  onChange,
  placement = "bottom",
  children,
}) => {
  const pickerRef = useRef<HTMLInputElement>(null);
  /** @State */
  const renderStyle = getStyles(pickerRef.current, placement);
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState<undefined | Date>(value);
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

  function onClick() {
    if (trigger === "click") {
      if (!visible) {
        window.addEventListener("mouseup", () => setVisible(false), {
          once: true,
        });
      }
      setVisible(!visible);
    }
  }

  function onDoubleClick() {
    if (trigger === "doubleClick") {
      if (!visible) {
        window.addEventListener("mouseup", () => setVisible(false), {
          once: true,
        });
      }
      setVisible(!visible);
    }
  }

  function onContextMenu() {
    if (trigger === "contextMenu") {
      if (!visible) {
        window.addEventListener("mouseup", () => setVisible(false), {
          once: true,
        });
      }
      setVisible(!visible);
    }
  }

  /** render */
  return (
    <div
      className="datePicker"
      onClick={onClick}
      ref={pickerRef}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
    >
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
      {children ? (
        children
      ) : value ? (
        dayjs(date).format(format)
      ) : (
        <span style={{ color: "#ddd" }}>请选择日期</span>
      )}
      <Icon name="calendar-o" className="datePicker-down" />
    </div>
  );
};

/**
 * @interface props
 */
export interface DatePickerProps {
  value?: Date;
  format?: string;
  onChange?(e: Date): void;
  trigger?: "click" | "contextMenu" | "doubleClick";
  placement?: "bottom" | "top";
  children?: React.ReactNode;
}

export default DatePicker;
