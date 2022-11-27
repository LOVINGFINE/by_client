/*
 * Created by zhangq on 2022/11/28
 * Meta Editor
 */
import { FC, useEffect } from "react";
// import styles from "../style.less";
// import { useClassNames } from "@/plugins/style";
import { MetaType } from "../../type";
import { FormItem } from "@/packages/design/Form";
// import { meta_config } from "../../final";

// const classNames = useClassNames(styles);

const MetaEditor: FC<MetaEditorProps> = ({ type }) => {
  /** @State */
  // const label = meta_config[type].label;
  /** @Effect */
  useEffect(() => {}, []);

  /**
   * @Methods
   */

  switch (type) {
    case MetaType.Number:
      return (
        <>
          <FormItem label={"小数位数"}></FormItem>
          <FormItem label={"单位"}></FormItem>
        </>
      );
    case MetaType.Date:
      return (
        <>
          <FormItem label={"日期格式"}></FormItem>
        </>
      );
    case MetaType.QrCode:
      return (
        <>
          <FormItem label={"二维码尺寸"}></FormItem>
        </>
      );
    case MetaType.Options:
      return (
        <>
          <FormItem label={"选项"}></FormItem>
        </>
      );
    default:
      return <></>;
  }
};

/**
 * @interface props
 */
export interface MetaEditorProps {
  type: MetaType;
}

export default MetaEditor;
