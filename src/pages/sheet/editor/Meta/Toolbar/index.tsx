import { FC, useContext } from "react";
import styles from "./style.less";
import { editorContext } from "../index";
import ShowRowCount from "./components/ShowRowCount";
import { Action } from "./Widgets";

const Toolbar: FC = () => {
  const editContextValue = useContext(editorContext);
  /** @State */
  /**
   * @Methods
   */
  function showRowChange(bol: boolean) {
    editContextValue.onShowRow(bol);
  }

  function onDelete() {
    // 删除 工作表
    editContextValue.onDelete();
  }
  /** render */
  return (
    <div className={styles["toolbar"]} onMouseDown={(e) => e.stopPropagation()}>
      <div className={styles["toolbar-left"]}></div>
      <div className={styles["toolbar-right"]}>
        <ShowRowCount
          value={editContextValue.showRowCount}
          onChange={showRowChange}
        />
        {editContextValue.workbooks.length > 1 && (
          <Action onClick={onDelete} icon="trash" />
        )}
      </div>
    </div>
  );
};

export default Toolbar;
