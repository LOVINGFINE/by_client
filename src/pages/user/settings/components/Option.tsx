/*
 * Created by zhangq on 2022/11/14
 * UserInfo
 */

import { FC } from "react";
import styles from "./style.less";
import { Button, Icon } from "@/packages/design";

const Option: FC<OptionProps> = ({ label, value, action, onAction }) => {
  /** render */
  return (
    <div className={styles["option"]}>
      <div className={styles["option-label"]}>{label}</div>
      <div className={styles["option-value"]}>{value}</div>
      {action ? (
        action
      ) : (
        <div className={styles["option-action"]} onClick={onAction}>
          <Button.Round size="large">
            <Icon name="pencil" />
          </Button.Round>
        </div>
      )}
    </div>
  );
};

export interface OptionProps {
  label: string;
  value: React.ReactNode;
  action?: React.ReactNode;
  onAction?(): void;
}
export default Option;
