import { Selection } from "@/pages/sheet/editor/type";
import { VcColumn, VcRow, RowConfig, ColumnConfig } from "../../type";
import { DEFAULT_COLUMN_WIDTH, DEFAULT_ROW_HEIGHT } from "../../final";

export function getBodyStyle(
  grid: {
    column: number;
    row: number;
  },
  columns: ColumnConfig,
  rows: RowConfig
) {
  const style = {
    width: 0,
    height: 0,
  };
  for (let index = 0; index < grid.column; index++) {
    if (columns[`${index}`]) {
      style.width += columns[`${index}`].width;
    } else {
      style.width += DEFAULT_COLUMN_WIDTH;
    }
  }
  for (let index = 0; index < grid.row; index++) {
    if (rows[`${index}`]) {
      style.height += rows[`${index}`].height;
    } else {
      style.height += DEFAULT_ROW_HEIGHT;
    }
  }
  return style;
}

export function filterColumns(
  columnLength: number,
  options: {
    scrollLeft: number;
    offsetWidth: number;
    maps: ColumnConfig;
  }
): VcColumn[] {
  const { scrollLeft, offsetWidth, maps } = options;
  const colEnd = scrollLeft + offsetWidth;
  const target: VcColumn[] = [];
  let x = 0;
  for (let i = 0; i < columnLength; i++) {
    const width = maps[`${i}`] ? maps[`${i}`].width : DEFAULT_COLUMN_WIDTH;
    if (x + width >= scrollLeft) {
      if (x <= colEnd) {
        target.push({
          width,
          index: i,
          x,
        });
      } else {
        break;
      }
    }
    x += width;
  }
  return target;
}

export function filterRows(
  rowLength: number,
  options: {
    scrollTop: number;
    offsetHeight: number;
    maps: RowConfig;
  }
): VcRow[] {
  const { scrollTop, offsetHeight, maps } = options;
  const rowEnd = scrollTop + offsetHeight;
  const target: VcRow[] = [];
  let y = 0;
  for (let i = 0; i < rowLength; i++) {
    const height = maps[`${i}`] ? maps[`${i}`].height : DEFAULT_ROW_HEIGHT;
    if (y + height >= scrollTop) {
      if (y <= rowEnd) {
        target.push({
          height,
          index: i,
          y,
        });
      } else {
        break;
      }
    }
    y += height;
  }
  return target;
}

export function initSelected(x: number, y: number): Selection {
  return {
    column: {
      current: x,
      start: x,
      end: x,
    },
    row: {
      current: y,
      start: y,
      end: y,
    },
  };
}

export function getMoveSelection(
  x: number,
  y: number,
  selection: Selection
): Selection {
  const { column, row } = selection;
  const c_s = x >= column.current ? column.current : x;
  const c_e = !(x >= column.current) ? column.current : x;
  const r_s = y >= row.current ? row.current : y;
  const r_e = !(y >= row.current) ? row.current : y;
  return {
    column: {
      current: column.current,
      start: c_s,
      end: c_e,
    },
    row: {
      current: row.current,
      start: r_s,
      end: r_e,
    },
  };
}

export function getInitColumnSelection(index: number, end: number): Selection {
  return {
    column: {
      current: index,
      start: index,
      end: index,
    },
    row: {
      current: 0,
      start: 0,
      end,
    },
  };
}

export function getColumnMoveSelection(
  index: number,
  end: number,
  selection: Selection
): Selection {
  const { column, row } = selection;
  const c_s = index >= column.current ? column.current : index;
  const c_e = !(index >= column.current) ? column.current : index;
  return {
    column: {
      current: column.current,
      start: c_s,
      end: c_e,
    },
    row: {
      current: row.current,
      start: 0,
      end,
    },
  };
}

export function getInitRowSelection(index: number, end: number): Selection {
  return {
    column: {
      current: 0,
      start: 0,
      end,
    },
    row: {
      current: index,
      start: index,
      end: index,
    },
  };
}

export function getRowMoveSelection(
  index: number,
  end: number,
  selection: Selection
): Selection {
  const { column, row } = selection;
  const r_s = index >= row.current ? row.current : index;
  const r_e = !(index >= row.current) ? row.current : index;
  return {
    column: {
      current: column.current,
      start: 0,
      end,
    },
    row: {
      current: row.current,
      start: r_s,
      end: r_e,
    },
  };
}

export function getRefStyle(
  grid: {
    column: number;
    row: number;
  },
  columns: ColumnConfig,
  rows: RowConfig,
  selection: Selection,
  rowIndexWidth: number
) {
  const { column, row } = selection;
  let left = rowIndexWidth;
  let width = 0;
  let top = 0;
  let height = 0;
  for (let i = 0; i < grid.column; i++) {
    if (i < column.start) {
      if (columns[`${i}`]) {
        left += columns[`${i}`].width;
      } else {
        left += DEFAULT_COLUMN_WIDTH;
      }
    } else {
      if (i <= column.end) {
        if (columns[`${i}`]) {
          width += columns[`${i}`].width;
        } else {
          width += DEFAULT_COLUMN_WIDTH;
        }
      } else {
        break;
      }
    }
  }
  for (let i = 0; i < grid.row; i++) {
    if (i < row.start) {
      if (rows[`${i}`]) {
        top += rows[`${i}`].height;
      } else {
        top += DEFAULT_ROW_HEIGHT;
      }
    } else {
      if (i <= row.end) {
        if (rows[`${i}`]) {
          height += rows[`${i}`].height;
        } else {
          height += DEFAULT_ROW_HEIGHT;
        }
      } else {
        break;
      }
    }
  }
  return {
    width,
    left,
    top,
    height,
  };
}
