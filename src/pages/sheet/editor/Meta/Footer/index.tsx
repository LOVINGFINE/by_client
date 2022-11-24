/*
 * Created by zhangq on 2022/10/01
 * PageFooter
 */
import { FC, useEffect, useContext, useState } from "react";
import styles from "./style.less";
import { globalContext } from "../../index";
import { useClassNames } from "@/plugins/style";
import { Icon } from "@/packages/design";
import { editorContext } from "../index";

const cn = useClassNames(styles);
const Footer: FC = () => {
  const global = useContext(globalContext);
  const contextValue = useContext(editorContext);
  /**
   * @Methods
   */

  /** render */
  return <div className={styles["footer"]}></div>;
};

export default Footer;
