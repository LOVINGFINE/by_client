import { arrayToCsv } from "@/plugins/convert";
import { MetaColumn, MetaEntry, MetaClipboard, EntryPayload } from "../type";
import { Selection, SimpleValue } from "../../components/VcTable";

export function onCopyToClipboard(
  columns: MetaColumn[],
  entries: MetaEntry[],
  selection: Selection
): MetaClipboard {
  const { column, row } = selection;
  const target: SimpleValue[][] = [];
  // 转化为二维数组
  for (let y = row.start; y <= row.end; y++) {
    const temp = [];
    for (let x = column.start; x <= column.end; x++) {
      const code = columns[x].code;
      if (entries[y].values[code]) {
        temp.push(entries[y].values[code]);
      } else {
        temp.push("");
      }
    }
    target.push(temp);
  }

  try {
    // 转化为文本复制
    const clipboard = navigator.clipboard;
    const copyString = arrayToCsv(target);
    clipboard.writeText(copyString);
  } catch (e) {
    console.warn(e);
  }

  return {
    data: target,
    selection,
  };
}

/** 粘贴 */
export function onPasteByClipboard(
  columns: MetaColumn[],
  entries: MetaEntry[],
  selection: Selection,
  clipboard: MetaClipboard
): EntryPayload {
  const target: EntryPayload = {};
  const { column, row } = selection;
  const rowStart = row.start;
  const rowEnd = row.end;
  const colStart = column.start;
  const colEnd = column.end;
  const getSource = (x: number, y: number) => {
    if (clipboard.data.length === 1 && clipboard.data[0].length === 1) {
      return clipboard.data[0][0];
    }
    if (clipboard.data[y] && clipboard.data[y][x]) {
      return clipboard.data[y][x];
    }
    return null;
  };
  for (let i = rowStart; i <= rowEnd; i++) {
    const values: {
      [k: string]: SimpleValue;
    } = {};
    for (let j = colStart; j <= colEnd; j++) {
      const x = j - colStart;
      const y = i - rowStart;
      const item = getSource(x, y);
      if (item !== null) {
        values[columns[j].code] = item;
      }
    }
    target[entries[i].id] = {
      values,
    };
  }
  return target;
}

/** 清除数据 */
export function getClearBySelection(
  columns: MetaColumn[],
  entries: MetaEntry[],
  selection: Selection
): EntryPayload {
  const { column, row } = selection;
  const target: EntryPayload = {};
  for (let y = row.start; y <= row.end; y++) {
    const values: {
      [k: string]: SimpleValue;
    } = {};

    for (let x = column.start; x <= column.end; x++) {
      values[columns[x].code] = "";
    }
    target[entries[y].id] = {
      values,
    };
  }
  return target;
}
