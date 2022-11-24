import { FC, useContext } from "react";
import styles from "./style.less";
import { Action, Driver } from "./Widgets";
import { editorContext } from "../index";

const Toolbar: FC = () => {
  const editContextValue = useContext(editorContext);
  /** @State */

  const history_back = editContextValue.history.current > 0;
  const history_forward =
    editContextValue.history.current > -1 &&
    editContextValue.history.items.length - 1 >
      editContextValue.history.current;
  /**
   * @Methods
   */
  function onHistoryBack() {}
  function onHistoryForward() {}

  /** render */
  return (
    <div className={styles["toolbar"]} onMouseDown={(e) => e.stopPropagation()}>
      <Action
        icon="mail-reply"
        disabled={!history_back}
        onClick={onHistoryBack}
      />
      <Action
        icon="forward-share"
        disabled={!history_forward}
        onClick={onHistoryForward}
      />
      <Driver />
    </div>
  );
};

export default Toolbar;
