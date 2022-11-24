import { Selection } from "@/pages/sheet/editor/type";
import { getCodeByIndex, getIndexByCode } from "@/plugins/convert";
import { init_selection } from "../final";

export function getSelectionRef(selection: Selection) {
  const { column, row } = selection;
  let columnRef = "";
  let rowRef = "";
  let cellRef = "";
  const colStart = getCodeByIndex(column.start);
  const colEnd = getCodeByIndex(column.end);
  const rowStart = row.start + 1;
  const rowEnd = row.end + 1;
  if (column.start > -1 && column.end > -1) {
    columnRef = colStart;
    if (column.end - column.start > 0) {
      columnRef += `~${colEnd}`;
    }
  }

  if (row.start > -1 && row.end > -1) {
    rowRef = `${rowStart}`;
    if (column.end - column.start > 0) {
      rowRef += `~${rowEnd}`;
    }
  }

  if (column.start > -1 && column.end > -1 && row.start > -1 && row.end > -1) {
    cellRef = `${colStart}${rowStart}`;
    if (column.end - column.start > 0 || column.end - column.start > 0) {
      cellRef += `~${colEnd}${rowEnd}`;
    }
  }

  return {
    columnRef,
    rowRef,
    cellRef,
  };
}

export function getRefBySelection(selection: Selection) {
  const { column, row } = selection;
  const columnCurrent =
    column.current > -1 ? getCodeByIndex(column.current) : "";
  const columnStart = column.current > -1 ? getCodeByIndex(column.start) : "";
  const columnEnd = column.start > -1 ? getCodeByIndex(column.end) : "";
  const rowCurrent = column.end > -1 ? row.current + 1 : "";
  const rowStart = row.start > -1 ? row.start + 1 : "";
  const rowEnd = row.end > -1 ? row.end + 1 : "";
  if (column.end - column.start > 1 || row.end - row.start > 1) {
    return `${columnStart}${rowStart}:${columnEnd}${rowEnd}`;
  }
  return `${columnCurrent}${rowCurrent}`;
}

export function getRefIndex(
  str: string
): { column: number; row: number } | null {
  const refRegExp = /[a-zA-Z]+|[1-9][0-9]*/gi;
  const list = str.match(refRegExp);
  if (list && list?.length > 1) {
    const column = getIndexByCode(list[0]) - 1;
    const row = parseInt(list[1]) - 1;
    if (column > -1 && row > -1) {
      return {
        column,
        row,
      };
    }
  }
  return null;
}

export function getSelectionByRef(ref: string): Selection | null {
  const range = ref.split(":");
  let selection = {
    ...init_selection,
  };

  if (range[0]) {
    const start = getRefIndex(range[0]);
    if (start) {
      selection = {
        column: {
          current: start.column,
          start: start.column,
          end: start.column,
        },
        row: {
          current: start.row,
          start: start.row,
          end: start.row,
        },
      };
    }
  }
  if (range[1]) {
    const end = getRefIndex(range[1]);
    if (end) {
      selection = {
        column: {
          ...selection.column,
          end: end.column,
        },
        row: {
          ...selection.row,
          end: end.row,
        },
      };
    }
  }

  if (selection.column.current > -1 && selection.row.current > -1) {
    return selection;
  }
  return null;
}
