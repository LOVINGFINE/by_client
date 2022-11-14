/*
 * Created by zhangq on 2022/11/02
 * style
 */
import { FC, useState } from "react";
import styles from "./style.less";
import { Icon } from "@/packages/design";
import ControlOption from "./ControlOption";
import { CONTROL_LINKS } from "../final";
import { ControlLink } from "../type";
import { useNavigate } from "react-router";
import { useClassNames } from "@/plugins/style";

const cn = useClassNames(styles);

const ApplicationControl: FC<ApplicationControlProps> = ({ title }) => {
  const navigate = useNavigate();
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

  function onControlAction(ele: ControlLink) {
    navigate(ele.path);
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
        <div className={styles["control-drawer-driver"]} />
        <div className={styles["control-drawer-body"]}>
          {CONTROL_LINKS.map((ele, i) => {
            return (
              <ControlOption
                key={i}
                icon={ele.icon}
                label={ele.label}
                onAction={() => onControlAction(ele)}
              />
            );
          })}
          <div className={styles["control-drawer-driver"]} />
        </div>
        <div className={styles["control-drawer-footer"]}></div>
      </div>
    </div>
  );
};
interface ApplicationControlProps {
  title: string;
}
export default ApplicationControl;
