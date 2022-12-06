/*
 * Created by zhangq on 2022/11/14
 * UserInformation
 */
import { FC, useContext } from "react";
import styles from "./style.less";
import { useNavigate, useSearchParams } from "react-router-dom";
import { userContext } from "@/plugins/user";
import Option from "../components/Option";
import UserCard from "../components/UserCard";
import { UserAvatar } from "../../components";
import UpdateNickname from "./modules/Nickname";
import UpdateUsername from "./modules/Username";
import UpdateMobile from "./modules/Mobile";
import UpdateAvatar from "./modules/Avatar";
import UpdateEmail from "./modules/Email";

const UserInformation: FC = () => {
  const context = useContext(userContext);
  const navigate = useNavigate();
  const [query] = useSearchParams();

  const update = query.get("update");
  const nickname = context.user.nickname ? (
    context.user.nickname
  ) : (
    <span className={styles["userValueNone"]}>暂未设置昵称</span>
  );
  const mobile = context.user.mobile ? (
    context.user.mobile
  ) : (
    <span className={styles["userValueNone"]}>暂未绑定手机号</span>
  );

  function onNavUpdate(type: string) {
    navigate({
      search: `?update=${type}`,
    });
  }

  /** @render */
  switch (update) {
    case "nickname":
      return <UpdateNickname />;
    case "mobile":
      return <UpdateMobile />;
    case "username":
      return <UpdateUsername />;
    case "avatar":
      return <UpdateAvatar />;
    case "email":
      return <UpdateEmail />;
    default:
      return (
        <div className={styles["information"]}>
          <UserCard title={"资料"}>
            <Option
              label="头像"
              value="设置头像可帮助您个性化账号"
              action={
                <div style={{ padding: "8px 2px 8px 12px" }}>
                  <UserAvatar
                    onRefresh={() => onNavUpdate("avatar")}
                    refresh
                    size="large"
                    user={context.user}
                  />
                </div>
              }
            />
            <Option
              label="昵称"
              value={nickname}
              onAction={() => onNavUpdate("nickname")}
            />
            <Option
              label="用户名(账号)"
              value={context.user.username}
              onAction={() => onNavUpdate("username")}
            />
          </UserCard>
          <UserCard title={"联系方式"}>
            <Option
              label="邮箱"
              value={context.user.email}
              onAction={() => onNavUpdate("email")}
            />
            <Option
              label="手机号"
              value={mobile}
              onAction={() => onNavUpdate("mobile")}
            />
          </UserCard>
        </div>
      );
  }
};

export default UserInformation;
