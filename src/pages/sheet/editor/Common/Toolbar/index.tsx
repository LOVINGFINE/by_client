import { FC } from "react";
import styles from "./style.less";
import { Action, Driver } from "./Widgets";
import { Selection } from "../../components/VcTable";
import { StyleOption, WorkbookCommonData, WorkbookHistory } from "../type";
import { INIT_CELL, NONE_STYLE } from "../final";
import FontSize from "./components/FontSize";
import FontColor from "./components/FontColor";
import BackgroundColor from "./components/BackgroundColor";
import HorizontalAlign from "./components/HorizontalAlign";
import VerticalAlign from "./components/VerticalAlign";
import { getKeyByCoord, onChangeStyle } from "../core";

const Toolbar: FC<ToolbarProps> = ({ selection, history, onChange, data }) => {
  const currentKey = getKeyByCoord(
    selection.column.current,
    selection.row.current
  );
  /** @State */
  const style = (() => {
    if (selection.column.current > -1 && selection.row.current > -1) {
      if (data[currentKey]) {
        return data[currentKey].style;
      }

      return INIT_CELL.style;
    }
    return NONE_STYLE;
  })();

  const history_back = history.current > 0;
  const history_forward =
    history.current > -1 && history.items.length - 1 > history.current;
  /**
   * @Methods
   */
  function onHistoryBack() {}
  function onHistoryForward() {}

  function onActionStyle<K extends keyof StyleOption, V extends StyleOption[K]>(
    k: K,
    v: V
  ) {
    if (selection.column.current > -1 && selection.row.current > -1) {
      const _data = onChangeStyle(data, selection, {
        [k]: v,
      });
      onChange(_data);
    }
  }

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
      <FontColor
        onChange={(e) => onActionStyle("color", e)}
        value={style.color}
      />
      <Driver />
      <FontSize
        value={style.fontSize}
        onChange={(e) => onActionStyle("fontSize", e)}
      />
      <Driver />

      <Action
        icon="bold"
        selected={style.bold}
        onClick={() => onActionStyle("bold", !style.bold)}
      />
      <Action
        icon="italic"
        selected={style.italic}
        onClick={() => onActionStyle("italic", !style.italic)}
      />
      <Action
        icon="underline"
        selected={style.underline}
        onClick={() => onActionStyle("underline", !style.underline)}
      />
      <Action
        icon="strike"
        selected={style.strike}
        onClick={() => onActionStyle("strike", !style.strike)}
      />
      <Driver />
      <HorizontalAlign
        value={style.horizontal}
        onChange={(e) => onActionStyle("horizontal", e)}
      />
      <Driver />
      <VerticalAlign
        value={style.vertical}
        onChange={(e) => onActionStyle("vertical", e)}
      />
      <Driver />
      <BackgroundColor
        onChange={(e) => onActionStyle("background", e)}
        value={style.background}
      />
    </div>
  );
};

export interface ToolbarProps {
  history: WorkbookHistory;
  selection: Selection;
  data: WorkbookCommonData;
  onChange(e: WorkbookCommonData): void;
}
export default Toolbar;
