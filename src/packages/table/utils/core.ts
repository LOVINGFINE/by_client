import { Column, VcColumn, VcRow, Row, Selection } from "../type";
import { getCodeByIndex } from "@/plugins/convert";

export function initColumns(columns: Column[]): VcColumn[] {
  let x = 0;
  const init_width = 120;
  return columns.map((ele, i) => {
    const width = ele.width !== undefined ? ele.width : init_width;
    const item = {
      ...ele,
      width,
      x,
      code: ele.code ? ele.code : getCodeByIndex(i),
      index: i,
    };
    x += width;
    return item;
  });
}

export function filterColumns(
  columns: VcColumn[],
  options: {
    scrollLeft: number;
    offsetWidth: number;
    fixed: number;
  }
): VcColumn[] {
  const { scrollLeft, offsetWidth, fixed } = options;
  const colEnd = scrollLeft + offsetWidth;
  const target: VcColumn[] = [];
  let x = 0;
  for (let i = 0; i < columns.length; i++) {
    const item = columns[i];
    if (x + item.width >= scrollLeft) {
      if (x <= colEnd) {
        if (i > fixed - 1) {
          target.push({
            ...item,
            x,
          });
        }
      } else {
        break;
      }
    }
    x += item.width;
  }
  return target;
}

export function resizeColumns(
  columns: VcColumn[],
  index: number,
  width: number
): VcColumn[] {
  let addWidth = 0;
  const list = columns.map((ele) => {
    if (ele.index === index) {
      addWidth = width - ele.width;
      return {
        ...ele,
        width,
      };
    } else {
      if (addWidth !== 0) {
        return {
          ...ele,
          x: ele.x + addWidth,
        };
      } else {
        return ele;
      }
    }
  });
  return list;
}

export function initRows(rows: Row[]): VcRow[] {
  let y = 0;
  const init_height = 28;
  return rows.map((ele, i) => {
    const height = ele.height !== undefined ? ele.height : init_height;
    const item = {
      height,
      y,
      index: i,
    };
    y += height;
    return item;
  });
}

export function filterRows(
  rows: VcRow[],
  options: {
    scrollTop: number;
    offsetHeight: number;
  }
): VcRow[] {
  const { scrollTop, offsetHeight } = options;
  const rowEnd = scrollTop + offsetHeight;
  const target: VcRow[] = [];
  let y = 0;
  for (let i = 0; i < rows.length; i++) {
    const item = rows[i];
    if (y + item.height >= scrollTop) {
      if (y <= rowEnd) {
        target.push({
          ...item,
          y,
        });
      } else {
        break;
      }
    }
    y += item.height;
  }
  return target;
}

export function resizeRows(
  rows: VcRow[],
  index: number,
  height: number
): VcRow[] {
  let addHeight = 0;
  const list = rows.map((ele) => {
    if (ele.index === index) {
      addHeight = height - ele.height;
      return {
        ...ele,
        height,
      };
    } else {
      if (addHeight !== 0) {
        return {
          ...ele,
          y: ele.y + addHeight,
        };
      } else {
        return ele;
      }
    }
  });
  return list;
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
