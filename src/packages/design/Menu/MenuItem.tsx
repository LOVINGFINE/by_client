import { FC, MouseEvent } from "react";
import { MenuOption } from "./index";

const MenuItem: FC<MenuItemProps> = (props) => {
  const {
    label,
    type = "default",
    disabled,
    icon,
    suffix,
    onClick,
    children,
  } = props;

  const itemClassName = `menu-item menu-item-${type} ${
    disabled ? "menu-item-disabled" : ""
  }`;
  /** render */
  return (
    <li className={itemClassName} onClick={onClick}>
      {icon}
      <span className="menu-item-label">{children ? children : label}</span>
      {suffix}
    </li>
  );
};

export interface MenuItemProps extends MenuOption {
  onClick?(e: MouseEvent): void;
  children?: React.ReactNode;
}

export default MenuItem;
