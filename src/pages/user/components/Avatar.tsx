/*
 * Created by zhangq on 2022/11/14
 * UserAvatar
 */
import { userContext } from "@/plugins/user";
import { FC, useContext } from "react";
import styles from "./style.less";

const UserAvatar: FC<UserAvatarProps> = ({ size = "default" }) => {
  const context = useContext(userContext);
  const firstCode = (() => {
    const { nickname, username } = context.user;
    return nickname[0] || username[0];
  })();
  const avatarUrl = context.user.avatar;
  /**
   * @Methods
   */

  /** render */
  return (
    <div className={`${styles["userAvatar"]} ${styles[`userAvatar-${size}`]}`}>
      {avatarUrl ? <img src={avatarUrl} /> : firstCode}
    </div>
  );
};

interface UserAvatarProps {
  size?: "default" | "small" | "large";
}
export default UserAvatar;
