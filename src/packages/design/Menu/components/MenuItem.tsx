import { FC, MouseEvent } from "react";
import { MenuOption } from "..";

const MenuItem: FC<MenuItemProps> = (props) => {
  const { label, type = "default", disabled, icon, suffix, onClick } = props;

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

export interface MenuItemProps extends MenuOption {
  onClick?(e: MouseEvent): void;
}

export default MenuItem;
