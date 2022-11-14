/*
 * Created by zhangq on 2022/11/04
 * style
 */
import { FC, useContext } from "react";
import { userContext } from "@/plugins/user";
import styles from "./style.less";
import { Dropdown } from "@/packages/design";
import UserInfo from "./Info";
import UserAvatar from "./Avatar";
import { useNavigate } from "react-router";

const ApplicationUser: FC<ApplicationUserProps> = ({}) => {
  const context = useContext(userContext);
  const navigate = useNavigate();

  /** @state */

  /**
   * @Methods
   */
  function onLogout() {
    navigate("/sign-in");
  }
  /** @render */
  return (
    <Dropdown
      overlay={<UserInfo logout={onLogout} user={context.user} />}
      placement={"bottomLeft"}
    >
      <div className={styles["user"]}>
        <UserAvatar user={context.user} />
      </div>
    </Dropdown>
  );
};

/**
 * @interface props
 */
export interface ApplicationUserProps {}

export default ApplicationUser;
