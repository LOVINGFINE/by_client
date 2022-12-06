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
import UpdatePasswordOld from "./modules/PasswordOld";
import UpdatePasswordWithCode from "./modules/PasswordWithCode";

const UserInformation: FC = () => {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const update = query.get("update");
  const password = "*************";

  function onNavUpdate(type: string) {
    navigate({
      search: `?update=${type}`,
    });
  }

  /** @render */
  switch (update) {
    case "password-with-old":
      return <UpdatePasswordOld />;
    case "password-with-emailCode":
      return <UpdatePasswordWithCode />;
    default:
      return (
        <div className={styles["safety"]}>
          <UserCard title={"账户"}>
            <Option
              label="密码"
              value={password}
              onAction={() => onNavUpdate("password-with-old")}
            />
          </UserCard>
        </div>
      );
  }
};

export default UserInformation;
