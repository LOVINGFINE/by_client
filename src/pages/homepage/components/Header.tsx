/*
 * Created by zhangq on 2022/11/06
 * PageHeader
 */
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./style.less";
import { Button, Icon } from "@/packages/design";

const PageHeader: FC<PageHeaderProps> = ({}) => {
  const navigate = useNavigate();

  /** render */
  return (
    <div className={styles["header"]}>
      <div className={styles["header-left"]}></div>
      <div className={styles["header-search"]}></div>
      <div className={styles["header-right"]}></div>
    </div>
  );
};

/**
 * @interface props
 */
export interface PageHeaderProps {}

export default PageHeader;
