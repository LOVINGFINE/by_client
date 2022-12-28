import { testColorDarkOrLight } from "@/plugins/color";
import dayjs from "dayjs";
import { OptionsSelect } from "../../components/SelectOptions";
import { SimpleValue } from "../../components/VcTable";
import {
  MetaType,
  Meta,
  MetaNumber,
  MetaDate,
  MetaBoolean,
  MetaOptions,
  MetaQrCode,
  MetaEntry,
} from "../type";

function replaceLabelVariable(
  str: string,
  code: string,
  index: number,
  values: { [k: string]: SimpleValue }
) {
  let target = str;
  const named: { [k: string]: SimpleValue } = {
    ...values,
    current: values[code],
    index: index + 1,
  };
  for (const k in named) {
    const varRegExp = new RegExp(`\{\{${k}\}\}`, "g");
    target = `${target}`.replace(varRegExp, `${named[k]}`);
  }
  return target;
}

export class MetaValue implements Meta {
  number: MetaNumber;
  date: MetaDate;
  boolean: MetaBoolean;
  options: MetaOptions;
  qrCode: MetaQrCode;
  constructor(public code: string, public type: MetaType, meta: Meta) {
    this.number = meta.number;
    this.date = meta.date;
    this.boolean = meta.boolean;
    this.options = meta.options;
    this.qrCode = meta.qrCode;
  }

  get selects(): OptionsSelect[] {
    const getTextColor = (c: string) => {
      const is = testColorDarkOrLight(c);
      if (is === "light") {
        return "#424f58";
      }
      return "#fff";
    };

    return this.options.items.map((ele) => {
      const tColor = getTextColor(ele.color);
      const border =
        ele.color === "white" || ele.color === "transparent"
          ? "1px solid #ddd"
          : "";
      return {
        value: ele.value,
        style: {
          background: ele.color,
          color: tColor,
          border,
        },
      };
    });
  }
  // 获取boolean 展示的label
  getBooleanLabel(e: SimpleValue) {
    const { label, checked, unChecked } = this.boolean;
    if (label) {
      if (e) {
        return checked;
      }
      return unChecked;
    }
    return "";
  }

  // 获取二维码展示的label
  getQrCodeLabel(index: number, entry: MetaEntry) {
    return replaceLabelVariable(
      this.qrCode.text,
      this.code,
      index,
      entry.values
    );
  }

  // 数据处理
  toValue(val: unknown): SimpleValue {
    switch (this.type) {
      case MetaType.Number:
        return (
          isNaN(parseFloat(`${val}`)) ? parseFloat(`${val}`) : val
        ) as SimpleValue;
      case MetaType.Options:
        if (Array.isArray(val)) {
          return JSON.stringify(val);
        }
        return val as SimpleValue;
      default:
        return val as SimpleValue;
    }
  }

  getValue(value: SimpleValue) {
    switch (this.type) {
      case MetaType.Number:
        return this.getNumberValue(value);
      case MetaType.Boolean:
        return this.getBooleanValue(value);
      case MetaType.Options:
        try {
          if (this.options.multiple) {
            return JSON.parse(`${value}`);
          }
          return value;
        } catch {
          return value;
        }
      case MetaType.Date:
        return this.getDateValue(value);
      default:
        return value;
    }
  }

  getNumberValue(value: SimpleValue) {
    const { decimal, unit } = this.number;
    const get = (n: number) => {
      let t = n;
      if (decimal === "") {
        t = Math.round(t * 1000) / 1000;
      } else {
        t = parseFloat(t.toFixed(decimal));
      }
      if (unit) {
        return `${t}${unit}`;
      }
      return t;
    };

    if (typeof value === "number") {
      return get(value);
    }
    if (typeof value === "string") {
      if (!isNaN(parseFloat(value))) {
        return get(parseFloat(value));
      }
    }
    return "";
  }

  getBooleanValue(value: SimpleValue): boolean {
    if (typeof value === "string") {
      if (value.toLowerCase() === "true") {
        return true;
      } else {
        return false;
      }
    }
    if (typeof value === "number") {
      if (value !== 0) {
        return true;
      } else {
        return false;
      }
    }
    return value;
  }

  getDateValue(value: SimpleValue) {
    return dayjs(`${value}`).isValid() ? new Date(`${value}`) : undefined;
  }
}
