/*
 * Created by zhangq on 2022/12/16
 * SelectContent
 */
import { CSSProperties, FC } from "react";
import { useClassNames } from "@/tools/style";
import styles from "./style.less";
import { SimpleValue } from "../VcTable";
import { OptionsSelect } from "./index";
import { Icon } from "@/packages/design";

const cn = useClassNames(styles);

const SelectContent: FC<OptionsContentProps> = ({
  selects,
  style,
  options,
  multiple,
  onChange,
}) => {
  function onChangeValue(v: SimpleValue) {
    if (multiple) {
      if (selects.includes(v)) {
        onChange(selects.filter((e) => e !== v));
      } else {
        onChange([...selects, v]);
      }
    } else {
      onChange(v);
    }
  }
  /** render */
  return (
    <div className={styles["options-content"]} style={style}>
      <div
        className={styles["options-items"]}
        onMouseUp={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {options.map((ele, i) => {
          return (
            <div
              key={i}
              className={cn({
                option: true,
                "option-selected": selects.includes(ele.value),
              })}
              onClick={() => onChangeValue(ele.value)}
            >
              <span className={styles["option-checked"]}>
                {selects.includes(ele.value) && <Icon name="boolean" />}
              </span>
              <span className={styles["option-tag"]} style={ele.style}>
                {ele.value}
              </span>
            </div>
          );
        })}
        {options.length === 0 && (
          <div className={styles["options-empty"]}></div>
        )}
      </div>
    </div>
  );
};

/**
 * @interface props
 */
export interface OptionsContentProps {
  style: CSSProperties;
  selects: SimpleValue[];
  options: OptionsSelect[];
  onChange(v: SimpleValue | SimpleValue[]): void;
  multiple: boolean;
}

export default SelectContent;
