/*
 * Created by zhangq on 2022/11/05
 * sign up
 */
import React, { FC, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import styles from "./style.less";
import ApplicationLayout from "@/layouts/application";
import { manage_options } from "./final";
import { Icon } from "@/packages/design";
import { useClassNames } from "@/packages/design/utils/style";
import { ManageOption } from "./type";

const cn = useClassNames(styles);

const UserSettingsPage: FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const prefixPath = "/user/settings";
  const route = (() => {
    const name = location.pathname.replace(`${prefixPath}/`, "");
    return manage_options.find((ele) => ele.name === name);
  })();

  useEffect(() => {
    if (location.pathname === prefixPath) {
      navigate(`/user/settings/${manage_options[0].name}`, {
        replace: true,
      });
    }
  }, []);

  function onSelected(ele: ManageOption) {
    navigate(`${prefixPath}/${ele.name}`);
  }
  /** @render */
  return (
    <ApplicationLayout
      logo={true}
      title={"表格"}
      control={false}
      header={
        <div className={styles["header"]}>
          <div className={styles["header-title"]}>账号</div>
        </div>
      }
    >
      <div className={styles["settings"]}>
        <div className={styles["settings-menu"]}>
          {manage_options.map((ele) => {
            return (
              <div
                key={ele.name}
                className={cn({
                  option: true,
                  "option-selected": route && route.name === ele.name,
                })}
                onClick={() => onSelected(ele)}
              >
                <Icon name={ele.icon} />
                <span>{ele.label}</span>
              </div>
            );
          })}
        </div>
        {route && (
          <div className={styles["settings-content"]}>
            <div className={styles["title"]}>{route.label}</div>
            <div className={styles["desc"]}>{route.description}</div>
            {children}
          </div>
        )}
      </div>
    </ApplicationLayout>
  );
};

export default UserSettingsPage;
