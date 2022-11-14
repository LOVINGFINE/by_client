/*
 * Created by zhangq on 2022/10/01
 * SuffixTip
 */
import { FC } from "react";
import { Icon } from "@/packages/design";
import styles from "../style.less";

const SuffixTip: FC<SuffixTipProps> = ({ icon, label }) => {
  /** @render */
  return (
    <span className={styles["suffixTip"]}>
      {icon && <Icon name={icon} />}
      {label}
    </span>
  );
};

/**
 * @interface props
 */
export interface SuffixTipProps {
  icon?: string;
  label?: string;
}

export default SuffixTip;
