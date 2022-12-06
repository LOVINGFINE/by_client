/*
 * Created by zhangq on 2022/12/05
 * FormLayout
 */
import React, { FC } from "react";
import styles from "./style.less";

const FormLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  /** @render */
  return <div className={styles["formLayout"]}>{children}</div>;
};

export default FormLayout;
