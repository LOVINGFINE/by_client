import { FC, ReactElement } from "react";
import { MenuOption, MenuOptionDriver, MenuOptionType } from "../index";
import Icon from "../../Icon";
import Menu from "./Menu";

const SubMenuItem: FC<SubMenuItemProps> = (props) => {
  const {
    label,
    type = MenuOptionType.default,
    disabled,
    icon,
    options,
    onClick,
    children,
  } = props;

  /** render */
  return (
    <li
      className={`menu-item menu-item-${type} ${
        disabled ? "menu-item-disabled" : ""
      }`}
      onClick={onClick}
    >
      {icon}
      <span className={"menu-item-label"}>{label}</span>
      <span className="menu-item-right">
        <Icon name="caret-right" />
      </span>
      {!disabled && (
        <div
          className={"menu-sub"}
          style={{
            width: 240 + 12,
          }}
        >
          <div className={"menu-sub-content"}>
            <Menu options={options} onClick={onClick}>
              {children}
            </Menu>
          </div>
        </div>
      )}
    </li>
  );
};

export interface SubMenuItemProps {
  label?: string | ReactElement;
  disabled?: boolean;
  type?: MenuOptionType;
  icon?: string | number | ReactElement;
  onClick?(e: React.MouseEvent): void;
  options?: (MenuOption | MenuOptionDriver)[];
  children?: ReactElement | ReactElement[];
}

export default SubMenuItem;
