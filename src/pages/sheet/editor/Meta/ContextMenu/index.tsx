import { FC } from "react";
import { Icon, Menu } from "@/packages/design";
import { Selection } from "@/pages/sheet/editor/type";
import SuffixTip from "./suffix";
import platform, { OsType } from "@/plugins/platform";
import { ContextMenuKey } from "../type";

const { CLEAR, COPY, PASTE, REMOVE_COLUMN, REMOVE_ENTRY } = ContextMenuKey;
const ContextMenu: FC<CellMenuProps> = (props) => {
  const { onAction } = props;

  const metaKeyIcon = (() => {
    if (platform.os === OsType.MacOS) {
      return "command";
    }
    return "angle-up";
  })();

  /** render */
  return (
    <Menu>
      <Menu.Item
        icon={<Icon name="edit-copy" />}
        label={"拷贝"}
        onClick={() => onAction(COPY)}
        suffix={<SuffixTip icon={metaKeyIcon} label="C" />}
      />
      <Menu.Item
        icon={<Icon name="edit-paste" />}
        label={"粘贴"}
        onClick={() => onAction(PASTE)}
        suffix={<SuffixTip icon={metaKeyIcon} label="V" />}
      />
      <Menu.Driver />
      <Menu.Item
        icon={<Icon name="close" />}
        label={"清除数据"}
        onClick={() => onAction(CLEAR, true)}
      />
      <Menu.Item
        icon={<Icon name="edit-remove-col" />}
        label={`删除列`}
        onClick={() => onAction(REMOVE_COLUMN)}
      />
      <Menu.Item
        icon={<Icon name="edit-remove-row" />}
        label={`删除行`}
        onClick={() => onAction(REMOVE_ENTRY)}
      />
    </Menu>
  );
};

interface CellMenuProps {
  onAction(k: ContextMenuKey, e?: unknown): void;
  selection: Selection;
}

export default ContextMenu;
