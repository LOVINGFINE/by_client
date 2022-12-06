/*
 * Created by zhangq on 2022/11/14
 * UserCard
 */

import { FC } from "react";
import styles from "./style.less";

const UserCard: FC<UserCardProps> = ({
  title,
  desecration,
  children,
}) => {
  /** @render */
  return (
    <div className={styles["userCard"]}>
      <div className={styles["userCard-title"]}>{title}</div>
      <div className={styles["userCard-desc"]}>{desecration}</div>
      {children}
    </div>
  );
};

export interface UserCardProps {
  title: React.ReactNode;
  desecration?: React.ReactNode;
  children?: React.ReactNode;
}
export default UserCard;
