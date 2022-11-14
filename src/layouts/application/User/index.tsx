/*
 * Created by zhangq on 2022/11/04
 * style
 */
import { FC, useContext } from "react";
import { userContext } from "@/plugins/user";
import styles from "./style.less";

const ApplicationUser: FC<ApplicationUserProps> = ({}) => {
  const context = useContext(userContext);

  const firstCode = (() => {
    const { nickname, username } = context.user;
    return nickname[0] || username[0];
  })();

  /**
   * @Methods
   */
  /** @render */
  return <div className={styles["user"]}>
    <div className={styles["user-avatar"]}>{firstCode}</div>
  </div>;
};

/**
 * @interface props
 */
export interface ApplicationUserProps {}

export default ApplicationUser;
