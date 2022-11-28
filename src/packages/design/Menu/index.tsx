import "./style.less";
import { ReactElement } from "react";
import MenuNormal, { MenuProps } from "./Menu";
import SubMenuItem from "./SubMenuItem";
import MenuItem from "./MenuItem";
import MenuDriver from "./MenuDriver";

type MenuOptionDriver = "driver";

export type { MenuProps, MenuOptionDriver };

export interface MenuOption {
  label?: string | ReactElement;
  disabled?: boolean;
  type?: "default" | "error" | "warning";
  suffix?: string | number | ReactElement;
  icon?: string | number | ReactElement;
}

export interface MenuOptionChildren extends MenuOption {
  options?: (MenuOption | MenuOptionDriver)[];
}

const Menu = MenuNormal as React.ForwardRefExoticComponent<MenuProps> & {
  SubItem: typeof SubMenuItem;
  Item: typeof MenuItem;
  Driver: typeof MenuDriver;
};

Menu.SubItem = SubMenuItem;
Menu.Item = MenuItem;
Menu.Driver = MenuDriver;

export default Menu;
