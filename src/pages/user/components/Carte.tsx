/*
 * Created by zhangq on 2022/11/14
 * style
 */
import { FC } from "react";
import styles from "./style.less";
import { Button } from "@/packages/design";
import { User } from "@/pages/user/type";
import UserAvatar from "./Avatar";
import { useNavigate } from "react-router";

const UserCarte: FC<UserCarteProps> = ({ user }) => {
  const navigate = useNavigate();
  /**
   * @Methods
   */
  function onMangeAccent() {
    navigate("/user/settings/information");
  }

  function onLogout() {
    navigate("/sign-in");
  }
  /** render */
  return (
    <div className={styles["userCarte"]}>
      <div className={styles["userCarte-message"]}>
        <UserAvatar user={user} size="large" />
        <span className={styles["userCarte-message-nickname"]}>
          {user.nickname}
        </span>
        <span className={styles["userCarte-message-email"]}>{user.email}</span>
      </div>
      <div className={styles["userCarte-actions"]}>
        <Button
          style={{
            borderRadius: 19,
            padding: "7px 30px",
          }}
          size="large"
          onClick={onMangeAccent}
        >
          管理您的账号
        </Button>
        <div className={styles["userCarte-driver"]} />
        <Button icon="sign-out" type="error" onClick={onLogout}>
          退出登录
        </Button>
      </div>
    </div>
  );
};

/**
 * @interface props
 */
export interface UserCarteProps {
  user: User;
}

export default UserCarte;
