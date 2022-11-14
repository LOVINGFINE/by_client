/*
 * Created by zhangq on 2022/10/18
 * Container
 */
import { FC } from "react";
import styles from "./style.less";

const Container: FC<ContainerProps> = ({ children }) => {
  /** render */
  return <div className={styles["container"]}>{children}</div>;
};

/**
 * @interface props
 */
export interface ContainerProps {
  children?: React.ReactElement | React.ReactElement[] | string;
}

export default Container;
