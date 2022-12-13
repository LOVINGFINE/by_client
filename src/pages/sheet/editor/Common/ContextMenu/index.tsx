import { FC, Fragment, MouseEvent } from "react";
import { Icon, Menu } from "@/packages/design";
import { Selection } from "@/pages/sheet/editor/type";
import { getSelectionRef } from "../RefTool/utils";
import SuffixTip from "./suffix";
import platform, { OsType } from "@/plugins/platform";
import { CellMenuKey } from "../type";

const {
  CLEAR,
  COPY,
  INSERT_COLUMN,
  INSERT_ROW,
  PASTE,
  PASTE_CONTROL,
  PASTE_CUT,
  PASTE_CUT_CONTROL,
  REMOVE_COLUMN,
  REMOVE_ROW,
} = CellMenuKey;
const ContextMenu: FC<CellMenuProps> = (props) => {
  const { onAction, selection } = props;
  const selectionRef = getSelectionRef(selection);

  const metaKeyIcon = (() => {
    if (platform.os === OsType.MacOS) {
      return "command";
    }
    return "angle-up";
  })();

  function onPaste(e: MouseEvent) {
    const { altKey, shiftKey } = e;
    // 粘贴
    if (altKey && shiftKey) {
      onAction(PASTE_CUT_CONTROL);
      return;
    } else if (!altKey && shiftKey) {
      onAction(PASTE_CONTROL);
    } else if (altKey && !shiftKey) {
      onAction(PASTE_CUT);
    } else {
      onAction(PASTE);
    }
  }

  function onMoreInsert() {}

  /** render */
  return (
    <Fragment>
      <Menu>
        <Menu.Item
          icon={<Icon name="edit-copy" />}
          label={"拷贝"}
          onClick={() => onAction(COPY)}
          suffix={<SuffixTip icon={metaKeyIcon} label="C" />}
        />
        <Menu.Item
          icon={<Icon name="edit-paste" />}
          label={`粘贴 ${selectionRef.cellRef}`}
          onClick={onPaste}
          suffix={<SuffixTip icon={metaKeyIcon} label={`(⇧/⌥/) V`} />}
        />
        <Menu.SubItem
          label={`清除单元格 ${selectionRef.cellRef}`}
          icon={<Icon name="trash-o" />}
        >
          <Menu.Item
            icon={<Icon name="close" />}
            label={"仅清除数据"}
            onClick={() => onAction(CLEAR, true)}
          />
          <Menu.Item
            icon={<Icon name="times-circle" />}
            label={"清除数据和样式"}
            onClick={() => onAction(CLEAR, false)}
          />
        </Menu.SubItem>
        <Menu.Driver />
        <Menu.SubItem icon={<Icon name="plus" />} label="添加行">
          <Menu.Item
            icon={<Icon name="long-arrow-up" />}
            label={"在上方添加一行"}
            onClick={() =>
              onAction(INSERT_ROW, {
                position: "before",
                count: 1,
              })
            }
          />
          <Menu.Item
            icon={<Icon name="long-arrow-down" />}
            label={"在下方添加一行"}
            onClick={() =>
              onAction(INSERT_ROW, {
                position: "after",
                count: 1,
              })
            }
          />
        </Menu.SubItem>
        <Menu.SubItem icon={<Icon name="plus" />} label="添加列">
          <Menu.Item
            icon={<Icon name="long-arrow-left" />}
            label={"在前方添加一列"}
            onClick={() =>
              onAction(INSERT_COLUMN, {
                position: "before",
                count: 1,
              })
            }
          />
          <Menu.Item
            icon={<Icon name="long-arrow-right" />}
            label={"向后方添加一列"}
            onClick={() =>
              onAction(INSERT_COLUMN, {
                position: "after",
                count: 1,
              })
            }
          />
        </Menu.SubItem>
        <Menu.Item
          icon={<Icon name="ellipsis-v" />}
          label={"更多添加选项"}
          onClick={() => onMoreInsert()}
        />
        <Menu.Driver />
        <Menu.Item
          icon={<Icon name="edit-remove-col" />}
          label={`删除列 ${selectionRef.columnRef}`}
          onClick={() => onAction(REMOVE_COLUMN)}
        />
        <Menu.Item
          icon={<Icon name="edit-remove-row" />}
          label={`删除行 ${selectionRef.rowRef}`}
          onClick={() => onAction(REMOVE_ROW)}
        />
      </Menu>
    </Fragment>
  );
};

interface CellMenuProps {
  onAction(k: CellMenuKey, e?: unknown): void;
  selection: Selection;
}

export default ContextMenu;
