/*
 * Created by zhangq on 2022/11/02
 * style
 */
import { FC, ReactElement } from "react";
import styles from "./style.less";
import ApplicationControl from "./Control";
import ApplicationUser from "./User";
import { Spanging } from "@/packages/design";

const ApplicationLayout: FC<ApplicationLayoutProps> = ({
  children,
  header,
  loading,
  title,
  control = true,
}) => {
  /** render */
  return (
    <div className={styles["layout"]}>
      <div className={styles["layout-header"]}>
        {control && <ApplicationControl title={title} />}
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
  loading: boolean;
  title: string;
  control?: boolean;
}
export default ApplicationLayout;
