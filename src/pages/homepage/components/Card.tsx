/*
 * Created by zhangq on 2022/11/14
 * style
 */
import { FC, useEffect } from "react";
import styles from "./style.less";
import { useClassNames } from "@/plugins/style";

const classNames = useClassNames(styles);

const ApplicationCard: FC<ApplicationCardProps> = ({}) => {
  /** @State */

  /** @Effect */
  useEffect(() => {}, []);

  /**
   * @Methods
   */

  /** render */
  return <div className={styles["card"]}></div>;
};

/**
 * @interface props
 */
export interface ApplicationCardProps {}

export default ApplicationCard;
