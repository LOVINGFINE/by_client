/*
 * Created by zhangq on 2022/09/15
 * action item
 */
import { FC, ReactElement, MouseEvent } from "react";
import { Icon } from "@/packages/design";
import { useClassNames } from "@/plugins/style";
import styles from "../style.less";

const classNames = useClassNames(styles);

const Action: FC<ActionProps> = ({
  icon = "",
  disabled = false,
  selected = false,
  onClick,
  children,
}) => {
  /**
   * @Methods
   */
  function onDivClick(e: MouseEvent) {
    if (!disabled && onClick) {
      onClick(e);
    }
  }
  /** render */
  return (
    <div
      className={classNames({
        action: true,
        "action-disabled": disabled,
        "action-selected": selected,
      })}
      onClick={onDivClick}
    >
      {children ? children : <Icon size={15} name={icon} />}
    </div>
  );
};

/**
 * @interface props
 */
export interface ActionProps {
  icon?: string;
  disabled?: boolean;
  selected?: boolean;
  onClick?(e: MouseEvent): void;
  children?: ReactElement | ReactElement[];
}

export default Action;
