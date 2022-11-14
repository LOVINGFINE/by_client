/*
 * Created by zhangq on 2022/11/14
 * UserAvatar
 */
import { User } from "@/plugins/user";
import { FC } from "react";
import styles from "./style.less";

const UserAvatar: FC<UserAvatarProps> = ({ user }) => {
  const firstCode = (() => {
    const { nickname, username } = user;
    return nickname[0] || username[0];
  })();
  /**
   * @Methods
   */

  /** render */
  return (
    <div className={styles["user-avatar"]}>
      {user.avatar ? <img src={user.avatar} /> : firstCode}
    </div>
  );
};

/**
 * @interface props
 */
export interface UserAvatarProps {
  user: User;
}

export default UserAvatar;
