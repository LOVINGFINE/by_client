/*
 * Created by zhangq on 2022/11/14
 * style
 */
import { FC, useContext } from "react";
import styles from "./style.less";
import { Icon, Menu } from "@/packages/design";
import { userContext } from "@/plugins/user";
import UserAvatar from "./Avatar";

const UserInfo: FC<UserInfoProps> = ({}) => {
  const context = useContext(userContext);

  /**
   * @Methods
   */
  function onLogout() {
    location.replace("/sign-in");
  }
  /** render */
  return (
    <div className={styles["userInfo"]}>
      <div className={styles["userInfo-message"]}>
        <UserAvatar />
        <span className={styles["userInfo-message-nickname"]}>
          {context.user.nickname}
        </span>
        <span className={styles["userInfo-message-email"]}>
          {context.user.email}
        </span>
      </div>
      <Menu>
        <Menu.Item
          icon={<Icon name="sign-out" />}
          label={"退出登录"}
          type="error"
          onClick={onLogout}
        />
      </Menu>
    </div>
  );
};

/**
 * @interface props
 */
export interface UserInfoProps {}

export default UserInfo;
