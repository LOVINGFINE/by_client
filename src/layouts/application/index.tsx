/*
 * Created by zhangq on 2022/11/02
 * ApplicationLayout
 */
import { FC, useContext } from "react";
import styles from "./style.less";
import ApplicationControl from "./Control";
import { Dropdown } from "@/packages/design";
import { UserCarte, UserAvatar } from "@/pages/user/components";
import { Icon, Spanging } from "@/packages/design";
import { useNavigate } from "react-router";
import { userContext } from "@/plugins/user";

const ApplicationLayout: FC<ApplicationLayoutProps> = ({
  children,
  header,
  loading = false,
  title = "",
  control = true,
  logo = false,
  settings,
}) => {
  const navigate = useNavigate();
  const context = useContext(userContext);
  /** render */
  return (
    <div className={styles["layout"]}>
      <div className={styles["layout-header"]}>
        {logo && (
          <div
            className={styles["layout-header-logo"]}
            onClick={() => navigate("/")}
          >
            <Icon name="doclogo" size={38} />
          </div>
        )}
        {control && (
          <ApplicationControl title={title}>{settings}</ApplicationControl>
        )}
        <div className={styles["layout-header-content"]}>{header}</div>
        <div className={styles["layout-header-user"]}>
          <Dropdown
            overlay={<UserCarte user={context.user} />}
            placement={"bottomLeft"}
          >
            <UserAvatar user={context.user} />
          </Dropdown>
        </div>
      </div>
      <Spanging loading={loading}>{children}</Spanging>
    </div>
  );
};

export interface ApplicationLayoutProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
  settings?: React.ReactNode;
  loading?: boolean;
  title?: string;
  control?: boolean;
  logo?: boolean;
}

export { default as ControlOption } from "./Control/Option";
export { default as ControlDriver } from "./Control/Driver";

export default ApplicationLayout;
