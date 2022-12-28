/*
 * Created by zhangq on 2022/11/26
 * CodeRender
 */
import { FC } from "react";
import styles from "./style.less";
import { MetaColumn } from "../type";
import { meta_config } from "../final";
import { Icon } from "@/packages/design";

const CodeRender: FC<CodeRenderProps> = ({ column }) => {
  /** @render */
  return (
    <div className={styles["code"]}>
      <Icon name={meta_config[column.type].icon} />
      <span className={styles["code-title"]}>{column.code}</span>
    </div>
  );
};

/**
 * @interface props
 */
export interface CodeRenderProps {
  column: MetaColumn;
}

export default CodeRender;
