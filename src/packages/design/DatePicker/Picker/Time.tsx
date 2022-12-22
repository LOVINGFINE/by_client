/*
 * Created by zhangq on 2022/12/15
 * TimePicker
 */
import { FC, MouseEvent, useEffect, useRef } from "react";
import { classNames } from "@/plugins/style";
import { getTimeDataSource } from "../utils";

export interface TimeOptionProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?(e: MouseEvent): void;
}

const TimeOption: FC<TimeOptionProps> = ({ children, onClick, selected }) => {
  /** @render */
  return (
    <li className={"time"}>
      <span
        onClick={onClick}
        className={classNames({
          time: true,
          "time-selected": selected,
        })}
      >
        {children}
      </span>
    </li>
  );
};

const TimePicker: FC<TimePickerProps> = ({ value, onChange, type }) => {
  /** @state */
  const ulRef = useRef<HTMLUListElement>(null);
  const dataSource = getTimeDataSource(type);
  const selected = (v: number) => {
    if (type === "h") {
      return value.getHours() === v;
    }
    if (type === "m") {
      return value.getMinutes() === v;
    }
    return value.getSeconds() === v;
  };

  function onTime(v: number) {
    if (onChange) {
      const target = new Date(value.toString());
      if (type === "h") {
        target.setHours(v);
      }
      if (type === "m") {
        target.setMinutes(v);
      }
      if (type === "s") {
        target.setSeconds(v);
      }

      onChange(target);
    }
  }

  function getTo() {
    let index = 0;
    if (type === "h") {
      index = value.getHours();
    }
    if (type === "m") {
      index = value.getMinutes();
    }
    if (type === "s") {
      index = value.getSeconds();
    }
    return index * 24 - 12;
  }

  useEffect(() => {
    if (ulRef.current) {
      setTimeout(() => {
        ulRef.current?.scrollTo({
          top: getTo(),
          behavior: "smooth",
        });
      }, 200);
    }
  }, [value]);

  /** render */
  return (
    <ul className="timePicker" ref={ulRef}>
      {dataSource.map((ele) => {
        return (
          <TimeOption
            onClick={() => onTime(ele.value)}
            key={ele.value}
            selected={selected(ele.value)}
          >
            {ele.label}
          </TimeOption>
        );
      })}
    </ul>
  );
};

export interface TimePickerProps {
  value: Date;
  onChange?(e: Date): void;
  type: "h" | "m" | "s";
}

export default TimePicker;
