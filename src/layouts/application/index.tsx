/*
 * Created by zhangq on 2022/11/02
 * style
 */
import { FC, ReactElement } from "react";
import styles from "./style.less";
import ApplicationControl from "./Control";
import ApplicationUser from "./User";
import { Icon, Spanging } from "@/packages/design";
import { useNavigate } from "react-router";

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
        <ApplicationUser />
      </div>
      <Spanging loading={loading}>{children}</Spanging>
    </div>
  );
};

export interface ApplicationLayoutProps {
  header?: ReactElement | ReactElement[];
  children?: ReactElement | ReactElement[];
  settings?: ReactElement | ReactElement[];
  loading?: boolean;
  title?: string;
  control?: boolean;
  logo?: boolean;
}

export { default as ControlOption } from "./Control/Option";
export { default as ControlDriver } from "./Control/Driver";

export default ApplicationLayout;
