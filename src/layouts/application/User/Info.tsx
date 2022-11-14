/*
 * Created by zhangq on 2022/11/14
 * style
 */
import { FC } from "react";
import styles from "./style.less";
import { Icon, Menu } from "@/packages/design";
import { MenuItem } from "@/packages/design/Menu";
import { User } from "@/plugins/user";
import UserAvatar from "./Avatar";

const UserInfo: FC<UserInfoProps> = ({ user, logout }) => {
  /** render */
  return (
    <div className={styles["userInfo"]}>
      <div className={styles["userInfo-message"]}>
        <UserAvatar user={user} />
        <span className={styles["userInfo-message-nickname"]}>
          {user.nickname}
        </span>
        <span className={styles["userInfo-message-email"]}>{user.email}</span>
      </div>
      <Menu>
        <MenuItem
          icon={<Icon name="sign-out" />}
          label={"退出登录"}
          type="error"
          onClick={logout}
        />
      </Menu>
    </div>
  );
};

/**
 * @interface props
 */
export interface UserInfoProps {
  user: User;
  logout(): void;
}

export default UserInfo;
