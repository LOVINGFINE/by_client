/*
 * Created by zhangq on 2022/11/04
 * style
 */
import { FC } from "react";
import styles from "./style.less";
import { Icon } from "@/packages/design";

const ControlOption: FC<ControlOptionProps> = ({
  onAction,
  icon,
  label,
  size = 28,
}) => {
  /** render */
  return (
    <div className={styles["controlOption"]} onClick={() => onAction()}>
      <span className={styles["controlOption-icon"]}>
        {icon && <Icon name={icon} size={size} />}
      </span>
      <span>{label}</span>
    </div>
  );
};

/**
 * @interface props
 */
export interface ControlOptionProps {
  label: string;
  icon?: string;
  onAction(): void;
  size?: number;
}

export default ControlOption;
