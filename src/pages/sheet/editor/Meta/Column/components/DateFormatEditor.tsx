/*
 * Created by zhangq on 2022/11/30
 * DateFormatEditor
 */
import { FC, useEffect, useState } from "react";
import styles from "../style.less";
// import { useClassNames } from "@/plugins/style";
import { Input, Radio } from "@/packages/design";

const options = [
  {
    label: "日期时间(YYYY-MM-DD HH:mm:ss)",
    format: "YYYY-MM-DD HH:mm:ss",
    value: "full",
  },
  {
    label: "时间(HH:mm:ss)",
    format: "HH:mm:ss",
    value: "t",
  },

  {
    label: "日期(YYYY-MM-DD)",
    format: "YYYY-MM-DD",
    value: "d",
  },
  {
    label: "自定义",
    format: "",
    value: "customize",
  },
];
const DateFormatEditor: FC<DateFormatEditorProps> = ({ value, onChange }) => {
  /** @State */
  const [type, setType] = useState("customize");
  const [input, setInput] = useState("");
  /** @Effect */
  useEffect(() => {
    const item = options.find((ele) => ele.format === value);
    if (item && value) {
      setType(item.value);
    } else {
      setInput(value);
    }
  }, [value]);

  /**
   * @Methods
   */
  function onChangeInput() {
    if (value !== input) {
      onChange(input);
    }
  }

  function onType(e: string) {
    setType(e);
    const item = options.find((ele) => ele.value === e);
    if (item) {
      onChange(item.format);
    }
  }
  /** render */
  return (
    <div className={styles["dateFormat"]}>
      <Radio.Group
        direction="vertical"
        options={options}
        value={type}
        onChange={(e) => onType(`${e}`)}
      />
      {type === "customize" && (
        <Input
          value={input}
          change={setInput}
          onBlur={onChangeInput}
          placeholder={"请输入格式化文本"}
        />
      )}
    </div>
  );
};

/**
 * @interface props
 */
export interface DateFormatEditorProps {
  value: string;
  onChange(v: string): void;
}

export default DateFormatEditor;
