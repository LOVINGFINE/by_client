/*
 * Created by zhangq on 2022/09/15
 * selection ref
 */
import { FC, useContext } from "react";
import styles from "./style.less";
import SelectionRef from "./components/SelectionRef";
import CellRef from "./components/CellRef";
import { Selection } from "@/packages/table";
import { editorContext } from "../index";
const RefHelper: FC = () => {
  const editContextValue = useContext(editorContext);
  /** @render */
  function onSelection(e: Selection) {
    if (editContextValue.vcTableRef) {
      editContextValue.vcTableRef.onSelection(e);
    }
  }
  return (
    <div
      className={styles["ref"]}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <SelectionRef onSelection={onSelection} />
      <div className={styles["ref-line"]} />
      <CellRef />
    </div>
  );
};

export default RefHelper;
