/*
 * Created by zhangq on 2022/11/05
 * sign up
 */
import { FC, useContext } from "react";
import { useNavigate } from "react-router";
import { Icon } from "@/packages/design";
import { UserWithToken } from "../type";
import SignUpForm from "./components/Form";
import styles from "./style.less";
import { userContext } from "@/plugins/user";

const SignUpPage: FC = () => {
  const context = useContext(userContext);
  const navigate = useNavigate();
  /**
   * @Methods
   */
  function onSignUpOk(res: UserWithToken) {
    context.setToken(res.token);
    navigate("/excel");
  }
  /** render */
  return (
    <div className={styles["signUp"]}>
      <div className={styles["signUp-card"]}>
        <div className={styles["signUp-card-top"]}>
          <Icon name={"doclogo"} size={42} />
          <span className={styles["signUp-card-top-title"]}>注册您账号</span>
        </div>
        <SignUpForm onOK={onSignUpOk} />
      </div>
    </div>
  );
};

export default SignUpPage;
