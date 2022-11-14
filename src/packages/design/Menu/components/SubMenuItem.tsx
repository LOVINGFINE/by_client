import { FC, ReactElement } from "react";
import { MenuOptionChildren } from "../index";
import Icon from "../../Icon";
import Menu from "./Menu";

const SubMenuItem: FC<SubMenuItemProps> = (props) => {
  const {
    label,
    type = "default",
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

export interface SubMenuItemProps extends MenuOptionChildren {
  children?: ReactElement | ReactElement[];
  onClick?(e: React.MouseEvent): void;
}

export default SubMenuItem;
