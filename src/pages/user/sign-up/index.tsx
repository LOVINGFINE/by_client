/*
 * Created by zhangq on 2022/11/05
 * sign up
 */
import { FC, useContext } from "react";
import styles from "../style.less";
import { useNavigate } from "react-router";
import { Icon } from "@/packages/design";
import { UserWithToken } from "../type";
import SignUpForm from "./components/Form";
import { userContext } from "@/plugins/user";

const SignUpPage: FC = () => {
  const context = useContext(userContext);
  const navigate = useNavigate();
  /**
   * @Methods
   */
  function onSignUpOk(res: UserWithToken) {
    context.setToken(res.token);
    navigate("/", {
      replace: true,
    });
  }
  /** render */
  return (
    <div className={styles["sign"]}>
      <div className={styles["sign-card"]}>
        <div className={styles["sign-card-top"]}>
          <Icon name={"doclogo"} size={42} />
          <span className={styles["sign-card-top-title"]}>注册您账号</span>
        </div>
        <SignUpForm onOK={onSignUpOk} />
      </div>
    </div>
  );
};

export default SignUpPage;
