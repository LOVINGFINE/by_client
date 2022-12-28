/*
 * Created by zhangq on 2022/09/15
 * selection ref
 */
import { FC } from "react";
import styles from "./style.less";
import SelectionRef from "./components/SelectionRef";
import CellRef from "./components/CellRef";
import { Selection } from "../../components/VcTable";
import { CommonCell, CommonDataSource } from "../type";
const RefHelper: FC<RefHelperProps> = ({
  onRefSelection,
  selection,
  onChange,
  data,
}) => {
  /** @render */
  return (
    <div className={styles["ref"]} onMouseDown={(e) => e.stopPropagation()}>
      <SelectionRef onSelection={onRefSelection} selection={selection} />
      <div className={styles["ref-line"]} />
      <CellRef selection={selection} data={data} onChange={onChange} />
    </div>
  );
};

export interface RefHelperProps {
  onRefSelection(e: Selection): void;
  selection: Selection;
  onChange(e: { [k: string]: Partial<CommonCell> }): void;
  data: CommonDataSource;
}
export default RefHelper;
