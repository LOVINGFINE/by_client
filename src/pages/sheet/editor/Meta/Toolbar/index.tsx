import { FC, useContext } from "react";
import styles from "./style.less";
import { editorContext } from "../index";
import ShowRowCount from "./components/ShowRowCount";

const Toolbar: FC = () => {
  const editContextValue = useContext(editorContext);
  /** @State */
  /**
   * @Methods
   */
  function showRowChange(bol: boolean) {
    editContextValue.onShowRow(bol);
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
      </div>
    </div>
  );
};

export default Toolbar;
