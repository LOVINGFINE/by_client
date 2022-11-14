/*
 * Created by zhangq on 2022/11/05
 * sign up
 */
import { FC, useContext } from "react";
import { useNavigate } from "react-router";
import { Icon } from "@/packages/design";
import { UserWithToken } from "../type";
import SignInForm from "./components/Form";
import styles from "./style.less";
import { userContext } from "@/plugins/user";

const SignInPage: FC = () => {
  const context = useContext(userContext);
  const navigate = useNavigate();
  /**
   * @Methods
   */
  function onSignInOk(res: UserWithToken) {
    context.setToken(res.token);
    navigate("/", {
      replace: true,
    });
  }
  /** render */
  return (
    <div className={styles["signIn"]}>
      <div className={styles["signIn-card"]}>
        <div className={styles["signIn-card-top"]}>
          <Icon name={"doclogo"} size={42} />
          <span className={styles["signIn-card-top-title"]}>登录账号</span>
        </div>
        <SignInForm onOK={onSignInOk} />
      </div>
    </div>
  );
};

export default SignInPage;
