/*
 * Created by zhangq on 2022/11/14
 * UserSignalCard
 */

import { FC } from "react";
import styles from "./style.less";

const UserSignalCard: FC<UserSignalCardProps> = ({ title, desecration, children }) => {
  /** @render */
  return (
    <div className={styles["userSignalCard"]}>
      <div className={styles["userSignalCard-title"]}>{title}</div>
      <div className={styles["userSignalCard-desc"]}>{desecration}</div>
      {children}
    </div>
  );
};

export interface UserSignalCardProps {
  title: React.ReactNode;
  desecration?: React.ReactNode;
  children?: React.ReactNode;
}
export default UserSignalCard;
