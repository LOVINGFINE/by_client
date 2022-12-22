import { Selection } from "./type";
import { VcColumn, VcRow } from "./type";

export function getBodyStyle(
  columns: { width: number }[],
  rows: { height: number }[]
) {
  const style = {
    width: 0,
    height: 0,
  };
  for (let i = 0; i < columns.length; i++) {
    style.width += columns[i].width;
  }
  for (let i = 0; i < rows.length; i++) {
    style.height += rows[i].height;
  }
  return style;
}

export function filterColumns(
  columns: { width: number }[],
  options: {
    scrollLeft: number;
    offsetWidth: number;
  }
): VcColumn[] {
  const { scrollLeft, offsetWidth } = options;
  const colEnd = scrollLeft + offsetWidth;
  const target: VcColumn[] = [];
  let x = 0;
  for (let i = 0; i < columns.length; i++) {
    const width = columns[i].width;
    if (x + width >= scrollLeft) {
      if (x <= colEnd) {
        target.push({
          ...columns[i],
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
  entries: { height: number }[],
  options: {
    scrollTop: number;
    offsetHeight: number;
  }
): VcRow[] {
  const { scrollTop, offsetHeight } = options;
  const rowEnd = scrollTop + offsetHeight;
  const target: VcRow[] = [];
  let y = 0;
  for (let i = 0; i < entries.length; i++) {
    const height = entries[i].height;
    if (y + height >= scrollTop) {
      if (y <= rowEnd) {
        target.push({
          ...entries[i],
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
  columns: { width: number }[],
  rows: { height: number }[],
  selection: Selection,
  rowIndexWidth: number
) {
  const { column, row } = selection;
  let left = rowIndexWidth;
  let width = 0;
  let top = 0;
  let height = 0;
  for (let i = 0; i < columns.length; i++) {
    if (i < column.start) {
      left += columns[i].width;
    } else {
      if (i <= column.end) {
        width += columns[i].width;
      } else {
        break;
      }
    }
  }
  for (let i = 0; i < rows.length; i++) {
    if (i < row.start) {
      if (rows[i]) {
        top += rows[i].height;
      }
    } else {
      if (i <= row.end) {
        if (rows[i]) {
          height += rows[i].height;
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
