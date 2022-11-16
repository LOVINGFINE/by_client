/*
 * Created by zhangq on 2022/11/07
 * sheet list
 */
import { FC } from "react";
import styles from "../style.less";
import { SheetListItem,ListMode } from "@/pages/sheet/type";
import SheetMoreAction from "./More";

import { useNavigate } from "react-router";
import { Icon } from "@/packages/design";

const List: FC<ListProps> = ({
  dataSource,
  onRename,
  onRemove,
  mode,
  getOwner,
  getTime,
}) => {
  const navigate = useNavigate();

  /** @State */

  /**
   * @Methods
   */
  function onItemAction(action: ListAction, item: SheetListItem) {
    switch (action) {
      case ListAction.openBlank: {
        window.open(`/sheets/${item.id}`, "_blank");
        break;
      }
      case ListAction.rename: {
        onRename(item);
        break;
      }
      case ListAction.remove: {
        onRemove(item);
        break;
      }
    }
  }

  function onEdit(item: SheetListItem) {
    navigate(`/sheets/${item.id}`);
  }

  const sheetsList = (
    <ul className={styles["sheets-list"]}>
      {dataSource.map((item) => {
        return (
          <li
            key={item.id}
            className={styles[`listItem`]}
            onClick={() => onEdit(item)}
          >
            <Icon name="sheet" size={20} />
            <span className={styles[`listItem-name`]}>{item.name}</span>
            <span className={styles[`listItem-isOwner`]}>{getOwner(item)}</span>
            <span className={styles[`listItem-updateTime`]}>
              {getTime(item)}
            </span>
            <span onClick={(e) => e.stopPropagation()}>
              <SheetMoreAction onAction={(k) => onItemAction(k, item)} />
            </span>
          </li>
        );
      })}
    </ul>
  );

  const sheetGrid = (
    <ul className={styles["sheets-grid"]}>
      {dataSource.map((item) => {
        return (
          <li
            key={item.id}
            className={styles[`gridItem`]}
            onClick={() => onEdit(item)}
          >
            <div className={styles[`gridItem-display`]}></div>
            <div className={styles[`gridItem-row`]}>
              <Icon name="sheet" size={18} />
              <span className={styles[`data-gridItem-name`]}>{item.name}</span>
            </div>
            <div className={styles[`gridItem-row`]}>
              <span className={styles[`gridItem-updateTime`]}>
                {getTime(item)}
              </span>
              <span onClick={(e) => e.stopPropagation()}>
                <SheetMoreAction onAction={(k) => onItemAction(k, item)} />
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
  /** render */
  return mode === ListMode.grid ? sheetGrid : sheetsList;
};

/**
 * @interface props
 */
export interface ListProps {
  dataSource: SheetListItem[];
  mode: ListMode;
  onRename(e: SheetListItem): void;
  onRemove(e: SheetListItem): void;
  getOwner(e: SheetListItem): string;
  getTime(e: SheetListItem): string;
}

export enum ListAction {
  rename = "rename",
  remove = "remove",
  openBlank = "openBlank",
}
export default List;
