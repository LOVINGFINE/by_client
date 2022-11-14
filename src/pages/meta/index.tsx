/*
 * Created by zhangq on 2022/08/09
 * excel table
 */
import { FC, useEffect } from "react";
import VcTable from "@/packages/table";

// import { ActionRes, CellPayload, MetaColumn, RowType } from "../type";
// import { initColumnsAndRows, onCoreAction, onUpdateCells } from "../core";
// import { contextMenuEvent } from "../../utils";

// const { mount, unmount } = contextMenuEvent();

const MetaPage: FC = () => {
  /** @State */
  // const [offset, setOffset] = useState({
  //   width: 0,
  //   height: 0,
  // });

  // const [selection, setSelection] = useState<Selection>({
  //   ...init_selection,
  // });
  // const [clipboard, setClipboard] = useState<ClipboardProp | null>(null);
  // const [tableDataSource, setTableDataSource] = useState<any>([]);
  /**
   * @effect
   */
  useEffect(() => {
    // const payload = {
    //   dataSource,
    // };
    // initColumnsAndRows(, (res) => {
    //   setTableDataSource(res);
    // });
  }, []);

  /**
   * @Methods
   */

  // function onCellSize(options: any, index: number) {}

  // function onAction(key: MenuOptionKey) {}

  /**
   * @actions
   */
  // function onChangeCell(e: CellPayload[]) {
  //   const payload = {
  //     columns: tableColumns,
  //     rows: tableRows,
  //     cells: e,
  //     count: 1,
  //   };
  //   onUpdateCells(payload, (rs) => {
  //     setTableRows(rs);
  //   });
  // }

  // function onSize(s: { width: number; height: number }) {
  //   setOffset(s);
  // }

  // function onTdContextMenu(x: number, y: number, e: MouseEvent) {
  //   e.preventDefault();
  // }
  /** render */
  return <VcTable />;
};

export default MetaPage;
