/*
 * Created by zhangq on 2022/11/02
 * ApplicationControl
 */
import { FC, useState } from "react";
import styles from "./style.less";
import { Icon } from "@/packages/design";
import ControlDriver from "./Driver";
import { useClassNames } from "@/tools/style";

const cn = useClassNames(styles);

const ApplicationControl: FC<ApplicationControlProps> = ({
  title,
  children,
}) => {
  /** @State */
  const [visible, setVisible] = useState(false);
  /**
   * @Methods
   */
  function close() {
    setVisible(false);
    document.removeEventListener("mousedown", close);
  }

  function open() {
    setVisible(true);
    document.addEventListener("mousedown", close);
  }
  /** render */
  return (
    <div className={styles["control"]}>
      <span className={styles["control-action"]} onClick={open}>
        <Icon name="bars" />
      </span>
      {/* content */}
      <div
        className={cn({
          "control-drawer": true,
          "control-drawer-open": visible,
        })}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles["control-drawer-top"]}>
          <Icon name={"doclogo"} size={38} />
          <span className={styles["control-drawer-top-title"]}>{title}</span>
        </div>
        <ControlDriver />
        <div className={styles["control-drawer-body"]}>{children}</div>
        <div className={styles["control-drawer-footer"]}></div>
      </div>
    </div>
  );
};

interface ApplicationControlProps {
  title: string;
  children?: React.ReactNode;
}

export default ApplicationControl;
