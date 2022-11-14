/*
 * Created by zhangq on 2022/11/07
 * style
 */
import { FC, useEffect, useRef, useState } from "react";
import styles from "./style.less";
import { Spanging } from "@/packages/design";
import UserSheetsToolbar from "./components/Toolbar";
import SheetList from "./components/List";
import { SheetListItem } from "../../editor";
import { deleteUserSheet, getUserSheets } from "../../apis";
import RenameModal, { RenameModalRef } from "./components/Rename";
import { ListFilter, ListMode, ListSort } from "./type";

const UserSheets: FC<UserSheetsProps> = ({ search, hide }) => {
  /** @State */
  const [loading, setLoading] = useState(true);
  const [userSheets, setUserSheets] = useState<SheetListItem[]>([]);
  const [listMode, setListMode] = useState<ListMode>(ListMode.list);
  const [listSort, setListSort] = useState<ListSort>(ListSort.openDate);
  const [listFilter, setListFilter] = useState<ListFilter>(ListFilter.none);

  // 重命名
  const renameRef = useRef<RenameModalRef>(null);

  /**
   * @effect
   */
  useEffect(() => {
    initSheets();
  }, [search]);

  /** @Method */
  function initSheets() {
    setLoading(true);
    getUserSheets(search)
      .then((res) => {
        setUserSheets(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onSheetRename(e: SheetListItem) {
    renameRef.current?.focus(e);
  }

  function onSheetRemove(item: SheetListItem) {
    deleteUserSheet(item.id).then(() => {
      initSheets();
    });
  }
  /** render */
  return (
    <div className={`${styles["userSheet"]} ${styles[`userSheet-${hide}`]}`}>
      <RenameModal ref={renameRef} onOk={initSheets} />
      <UserSheetsToolbar
        mode={listMode}
        sort={listSort}
        filter={listFilter}
        onSort={setListSort}
        onMode={setListMode}
        onFilter={setListFilter}
      />
      <div className={styles["userSheet-content"]}>
        <Spanging loading={loading} type="alternate" size="small">
          <SheetList
            onRemove={onSheetRemove}
            onRename={onSheetRename}
            dataSource={userSheets}
            listMode={listMode}
          />
        </Spanging>
      </div>
    </div>
  );
};

/**
 * @interface props
 */
export interface UserSheetsProps {
  search: string;
  hide: boolean;
}

export default UserSheets;
