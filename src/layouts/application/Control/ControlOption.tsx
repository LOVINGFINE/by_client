/*
 * Created by zhangq on 2022/11/04
 * style
 */
import { FC } from "react";
import styles from "./style.less";
import { Icon } from "@/packages/design";

const ControlOption: FC<ControlOptionProps> = ({ onAction, icon, label }) => {
  /** render */
  return (
    <div className={styles["controlOption"]} onClick={() => onAction()}>
      {icon && <Icon name={icon} size={20} />}
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
}

export default ControlOption;
