/*
 * Created by zhangq on 2022/11/07
 * Toolbar
 */
import { FC } from "react";
import { useNavigate } from "react-router";
import styles from "../style.less";
import { Icon } from "@/packages/design";

const Toolbar: FC<ToolbarProps> = ({ full }) => {
  const navigate = useNavigate();
  function onOpenAll() {
    navigate(`/sheets?st=1`);
  }
  /** render */
  return (
    <div className={styles["toolbar"]}>
      <div className={styles["toolbar-left"]}></div>
      <div className={styles["toolbar-right"]}>
        {!full && (
          <div onClick={onOpenAll} className={styles["toolbar-right-btn"]}>
            模版库 <Icon name={`sort`} />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * @interface props
 */
export interface ToolbarProps {
  full: boolean;
}

export default Toolbar;
