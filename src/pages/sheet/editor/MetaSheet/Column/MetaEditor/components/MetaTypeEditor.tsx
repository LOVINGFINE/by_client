/*
 * Created by zhangq on 2022/11/30
 * TypeEditor
 */
import { FC } from "react";
import styles from "../../style.less";
import { useClassNames } from "@/tools/style";
import { meta_config } from "../../../final";
import { MetaType } from "../../../type";
import { Icon } from "@/packages/design";

const cn = useClassNames(styles);

const TypeEditor: FC<TypeEditorProps> = ({ value, onChange }) => {
  /** @State */
  const type_options = (() => {
    const list = [];
    for (const key in meta_config) {
      const value = key as MetaType;
      list.push({
        value,
        ...meta_config[value],
      });
    }
    return list;
  })();

  /** render */
  return (
    <div className={styles["metaType"]}>
      {type_options.map((ele) => {
        return (
          <div
            key={ele.value}
            className={cn({
              "metaType-item": true,
              "metaType-item-selected": value === ele.value,
            })}
            onClick={() => onChange(ele.value)}
          >
            <Icon name={ele.icon} />
          </div>
        );
      })}
    </div>
  );
};

/**
 * @interface props
 */
export interface TypeEditorProps {
  value: MetaType;
  onChange(v: MetaType): void;
}

export default TypeEditor;
