/*
 * Created by zhangq on 2022/09/15
 * Group
 */
import { FC } from "react";
import styles from "../style.less";

const GroupNormal: FC<NormalProps> = ({ children }) => {
  /** @render */
  return <div className={styles["group"]}>{children}</div>;
};

export const GroupRow: FC<NormalProps> = ({ children }) => {
  /** @render */
  return <div className={styles["group-row"]}>{children}</div>;
};

/**
 * @interface props
 */
export interface NormalProps {
  children?: React.ReactNode;
}

const Group = GroupNormal as React.ForwardRefExoticComponent<NormalProps> & {
  Row: typeof GroupRow;
  Number: typeof Number;
};

Group.Row = GroupRow;

export default Group;
