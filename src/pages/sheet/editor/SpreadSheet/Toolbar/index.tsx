import { FC } from "react";
import styles from "./style.less";
import { Action, Driver } from "./Widgets";
import { Selection } from "../../components/VcTable";
import { CellStyle, CommonDataSource, CommonHistory } from "../type";
import { INIT_CELL, NONE_STYLE } from "../final";
import FontSize from "./components/FontSize";
import FontColor from "./components/FontColor";
import BackgroundColor from "./components/BackgroundColor";
import HorizontalAlign from "./components/HorizontalAlign";
import VerticalAlign from "./components/VerticalAlign";
import { getKeyByCoord, onChangeStyle } from "../Table/core";
import Group from "./Widgets/Group";

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

  function onActionStyle<K extends keyof CellStyle, V extends CellStyle[K]>(
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
      <Group>
        <Group.Row />
        <Group.Row>
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
        </Group.Row>
      </Group>

      <Driver height={56} />
      <Group>
        <Group.Row>
          <FontSize
            value={style.fontSize}
            onChange={(e) => onActionStyle("fontSize", e)}
          />
          <Action
            icon="fontSizeDub"
            selected={style.bold}
            onClick={() => onActionStyle("bold", !style.bold)}
          />
          <Action
            icon="fontSizeSub"
            selected={style.italic}
            onClick={() => onActionStyle("italic", !style.italic)}
          />
        </Group.Row>
        <Group.Row>
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
          <FontColor
            onChange={(e) => onActionStyle("color", e)}
            value={style.color}
          />
          <Driver />
          <BackgroundColor
            onChange={(e) => onActionStyle("background", e)}
            value={style.background}
          />
        </Group.Row>
      </Group>
      <Driver height={56} />
      <Group>
        <Group.Row>
          <HorizontalAlign
            value={style.horizontal}
            onChange={(e) => onActionStyle("horizontal", e)}
          />
        </Group.Row>
        <Group.Row>
          <VerticalAlign
            value={style.vertical}
            onChange={(e) => onActionStyle("vertical", e)}
          />
        </Group.Row>
      </Group>
    </div>
  );
};

export interface ToolbarProps {
  history: CommonHistory;
  selection: Selection;
  data: CommonDataSource;
  onChange(e: CommonDataSource): void;
}

export default Toolbar;
