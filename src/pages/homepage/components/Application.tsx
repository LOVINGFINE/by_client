/*
 * Created by zhangq on 2022/11/14
 * Application
 */
import { FC } from "react";
import styles from "./style.less";
import { ApplicationLink } from "@/config/application";
import { useNavigate } from "react-router";
import { Icon } from "@/packages/design";

const Application: FC<ApplicationProps> = ({ label, icon, path }) => {
  const navigate = useNavigate();
  /**
   * @Methods
   */
  function onClick() {
    navigate(path);
  }
  /** render */
  return (
    <div className={styles["app"]} onClick={onClick}>
      <Icon
        name={icon}
        size={260}
        style={{
          height: 200,
          width: 260,
        }}
      />
      <div className={styles["app-bottom"]}>
        <span className={styles["app-bottom-label"]}>{label}</span>
      </div>
    </div>
  );
};

/**
 * @interface props
 */
export interface ApplicationProps extends ApplicationLink {}

export default Application;
