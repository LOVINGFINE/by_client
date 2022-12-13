/*
 * Created by zhangq on 2022/11/14
 * UserInformation
 */
import { FC, useContext } from "react";
import styles from "./style.less";
import { useNavigate, useSearchParams } from "react-router-dom";
import { userContext } from "@/pages/user/provider";
import Option from "../components/Option";
import UserCard from "../components/UserCard";
import { UserAvatar } from "../../components";
import UpdateNickname from "./modules/Nickname";
import UpdateUsername from "./modules/Username";
import UpdateMobile from "./modules/Mobile";
import UpdateAvatar from "./modules/Avatar";
import UpdateEmail from "./modules/Email";
import UserSignalCard from "../components/UserSignalCard";
import { Button, Icon } from "@/packages/design";
import UpdatePasswordOld from "./modules/PasswordOld";
import UpdatePasswordWithCode from "./modules/PasswordWithCode";
import dayjs from "dayjs";

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
    case "password-with-old":
      return <UpdatePasswordOld />;
    case "password-with-emailCode":
      return <UpdatePasswordWithCode />;
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
          <div className={styles["signalBox"]}>
            <UserSignalCard
              title={"密码"}
              desecration={"设置安全的密码,可以有效防止账号泄漏"}
            >
              <div className={styles["password"]}>
                <div className={styles["flex"]}>
                  <div className={styles["flex-title"]}>********</div>
                  <span className={styles["flex-desc"]}>
                    上次修改时间:{" "}
                    {dayjs(context.user.passwordUpdated).format(
                      "YYYY年MM月DD日 hh:mm"
                    )}
                  </span>
                </div>
                <Button.Round
                  size="large"
                  onClick={() => onNavUpdate("password-with-old")}
                >
                  <Icon name="pencil" />
                </Button.Round>
              </div>
            </UserSignalCard>
          </div>
        </div>
      );
  }
};

export default UserInformation;
