/*
 * Created by zhangq on 2022/10/01
 * SuffixTip
 */
import { FC } from "react";
import { Icon } from "@/packages/design";

const SuffixTip: FC<SuffixTipProps> = ({ icon, label }) => {
  /** @render */
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        color: "#8898a5",
        gap: 3,
        fontSize: 14,
      }}
    >
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
