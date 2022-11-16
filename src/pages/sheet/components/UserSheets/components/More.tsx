/*
 * Created by zhangq on 2022/11/07
 *  item More actions
 */
import { FC } from "react";
import { Icon, Menu, Dropdown, Button } from "@/packages/design";
import { MenuItem } from "@/packages/design/Menu";
import { ListAction } from "./List";

const SheetMoreAction: FC<SheetMoreActionProps> = ({ onAction }) => {
  /**
   * @Methods
   */
  const overlay = (
    <Menu
      style={{
        minWidth: 185,
      }}
    >
      <MenuItem
        icon={<Icon name="edit" />}
        label={"修改标题"}
        onClick={() => onAction(ListAction.rename)}
      />
      <MenuItem
        icon={<Icon name="external-link" />}
        label={`新窗口编辑`}
        onClick={() => onAction(ListAction.openBlank)}
      />
      <MenuItem
        icon={<Icon name="trash-o" />}
        label={`删除`}
        onClick={() => onAction(ListAction.remove)}
      />
    </Menu>
  );

  /** render */
  return (
    <Dropdown overlay={overlay} placement='bottomLeft'>
      <Button round>
        <Icon name="ellipsis-v" />
      </Button>
    </Dropdown>
  );
};

/**
 * @interface props
 */
export interface SheetMoreActionProps {
  onAction(e: ListAction): void;
}

export default SheetMoreAction;
