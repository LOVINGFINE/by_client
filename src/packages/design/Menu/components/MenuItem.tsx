import { FC, ReactElement, MouseEvent } from "react";
import { MenuOptionType } from "../index";

const MenuItem: FC<MenuItemProps> = (props) => {
  const {
    label,
    type = MenuOptionType.default,
    disabled,
    icon,
    suffix,
    onClick,
  } = props;

  const itemClassName = `menu-item menu-item-${type} ${
    disabled ? "menu-item-disabled" : ""
  }`;
  /** render */
  return (
    <li className={itemClassName} onClick={onClick}>
      {icon}
      <span className="menu-item-label">{label}</span>
      {suffix}
    </li>
  );
};

export interface MenuItemProps {
  label?: string | ReactElement;
  disabled?: boolean;
  type?: MenuOptionType;
  suffix?: string | number | ReactElement;
  icon?: string | number | ReactElement;
  onClick?(e: MouseEvent): void;
}

export default MenuItem;
