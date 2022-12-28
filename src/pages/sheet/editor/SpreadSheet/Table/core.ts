import { arrayToCsv } from "@/plugins/convert";
import { Selection } from "../../components/VcTable";
import { INIT_CELL } from "../final";
import {
  CommonCell,
  CellStyle,
  CommonClipboard,
  CommonDataSource,
  ColumnSet,
  RowSet,
} from "../type";

export function getKeyByCoord(x: number, y: number) {
  return `${x}-${y}`;
}

export function getCoordByKey(key: string) {
  const arr = key.split("-")[1];
  const x = parseInt(arr[0]);
  const y = parseInt(arr[1]);
  return {
    x,
    y,
  };
}

export function onCopyToClipboard(
  data: CommonDataSource,
  selection: Selection
): CommonClipboard {
  const { column, row } = selection;
  const target: CommonCell[][] = [];
  // 转化为二维数组
  for (let y = row.start; y <= row.end; y++) {
    const temp = [];
    for (let x = column.start; x <= column.end; x++) {
      const key = getKeyByCoord(x, y);
      if (data[key]) {
        temp.push(data[key]);
      } else {
        temp.push(INIT_CELL);
      }
    }
    target.push(temp);
  }
  const csvArray = target.map((row) => {
    return row.map((cell) => cell.value);
  });
  try {
    // 转化为文本复制
    const clipboard = navigator.clipboard;
    const copyString = arrayToCsv(csvArray);
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
  selection: Selection,
  clipboard: CommonClipboard,
  opts: {
    style: boolean;
  }
): CommonDataSource {
  const target: CommonDataSource = {};
  if (clipboard) {
    // 粘贴
    const getSource = (x: number, y: number) => {
      if (clipboard.data.length === 1 && clipboard.data[0].length === 1) {
        return clipboard.data[0][0];
      }
      if (clipboard.data[y] && clipboard.data[y][x]) {
        return clipboard.data[y][x];
      }
      return null;
    };
    const { column, row } = selection;
    const rowStart = row.start;
    const rowEnd = row.end;
    const colStart = column.start;
    const colEnd = column.end;

    for (let i = rowStart; i <= rowEnd; i++) {
      for (let j = colStart; j <= colEnd; j++) {
        const x = j - colStart;
        const y = i - rowStart;
        const source = getSource(x, y);
        if (source) {
          // 更新
          const key = getKeyByCoord(j, i);
          const style = opts.style ? source.style : INIT_CELL.style;
          target[key] = {
            value: source.value,
            style,
            comments: [],
          };
        }
      }
    }
  }

  return target;
}

/** 清除数据 */
export function getClearBySelection(
  data: CommonDataSource,
  selection: Selection,
  only = true
) {
  const { column, row } = selection;
  const target: CommonDataSource = {};
  for (let y = row.start; y <= row.end; y++) {
    for (let x = column.start; x <= column.end; x++) {
      const key = getKeyByCoord(x, y);
      if (data[key]) {
        if (only) {
          target[key] = {
            ...data[key],
            value: "",
          };
        } else {
          target[key] = INIT_CELL;
        }
      }
    }
  }
  return target;
}

export function onChangeStyle(
  data: CommonDataSource,
  selection: Selection,
  update: Partial<CellStyle>
) {
  const { column, row } = selection;
  const _data: CommonDataSource = {};
  // 转化为二维数组
  for (let y = row.start; y <= row.end; y++) {
    for (let x = column.start; x <= column.end; x++) {
      const key = getKeyByCoord(x, y);
      if (data[key]) {
        _data[key] = {
          ...data[key],
          style: {
            ...data[key].style,
            ...update,
          },
        };
      } else {
        _data[key] = {
          ...INIT_CELL,
          style: {
            ...INIT_CELL.style,
            ...update,
          },
        };
      }
    }
  }
  return _data;
}

/** 删除列 */
export function onDeleteColumn(
  data: CommonDataSource,
  columns: ColumnSet,
  selection: Selection
) {
  const { column } = selection;
  const _data: CommonDataSource = {};
  const _columns: ColumnSet = {};
  const columnLength = column.end - column.start + 1;

  for (const key in data) {
    const { x, y } = getCoordByKey(key);
    if (x >= column.start && x <= column.end) {
      const _key = getKeyByCoord(x + columnLength, y);
      if (data[_key]) {
        _data[key] = data[_key];
        _data[_key] = INIT_CELL;
      } else {
        _data[key] = INIT_CELL;
      }
    }
  }
  for (const key in columns) {
    const index = parseInt(key);
    if (index > column.end) {
      _columns[`${index - columnLength}`] = columns[index];
    } else {
      _columns[`${index}`] = columns[index];
    }
  }
  return {
    data: _data,
    columns: _columns,
  };
}

/** 删除行 */
export function onDeleteRow(
  data: CommonDataSource,
  rows: RowSet,
  selection: Selection
) {
  const { row } = selection;
  const _data: CommonDataSource = {};
  const _rows: RowSet = {};
  const rowLength = row.end - row.start + 1;

  for (const key in data) {
    const { y } = getCoordByKey(key);
    if (y >= row.start && y <= row.end) {
      const _key = getKeyByCoord(y + rowLength, y);
      if (data[_key]) {
        _data[key] = data[_key];
        _data[_key] = INIT_CELL;
      } else {
        _data[key] = INIT_CELL;
      }
    }
  }
  for (const key in rows) {
    const index = parseInt(key);
    if (index > row.end) {
      _rows[index - rowLength] = rows[index];
    } else {
      _rows[index] = rows[index];
    }
  }
  return {
    data: _data,
    rows: _rows,
  };
}

/** 添加列 */
export function onInsertColumn(
  data: CommonDataSource,
  columns: ColumnSet,
  selection: Selection,
  opts: {
    position: "after" | "before";
    count: number;
  }
) {
  const { count, position } = opts;
  const { column } = selection;
  let start = column.start;
  if (position === "after") {
    start = column.end;
  }
  const _data: CommonDataSource = {};
  const _columns: ColumnSet = {};
  // 添加列
  for (const key in data) {
    const { x, y } = getCoordByKey(key);
    if (x > start) {
      const _key = getKeyByCoord(x + count, y);
      _data[_key] = data[key];
      _data[key] = INIT_CELL;
    }
  }
  for (const key in columns) {
    const index = parseInt(key);
    if (index > start) {
      _columns[`${index + count}`] = columns[key];
      _columns[key] = {
        width: 120,
      };
    }
  }
  return {
    data: _data,
    columns: _columns,
  };
}

/** 添加行 */
export function onInsertRow(
  data: CommonDataSource,
  rows: RowSet,
  selection: Selection,
  opts: {
    position: "after" | "before";
    count: number;
  }
) {
  const { count, position } = opts;
  const { row } = selection;
  let start = row.start;
  if (position === "after") {
    start = row.end;
  }
  const _data: CommonDataSource = {};
  const _rows: RowSet = {};
  for (const key in data) {
    const { x, y } = getCoordByKey(key);
    if (x > start) {
      const _key = getKeyByCoord(x + count, y);
      _data[_key] = data[key];
      _data[key] = INIT_CELL;
    }
  }
  for (const key in rows) {
    const index = parseInt(key);
    if (index > start) {
      _rows[`${index + count}`] = rows[key];
      _rows[key] = {
        height: 28,
      };
    }
  }
  return {
    data: _data,
    rows: _rows,
  };
}

// /** 更新行列配置 */
// export function onUpdateVcTableConfig(
//   config: VcTableConfig,
//   option: {
//     mode: RowColumnMode;
//     index: number;
//     target: number;
//   }
// ) {
//   const { mode, index, target } = option;
//   const _config = { ...config };

//   if (mode === RowColumnMode.column) {
//     if (_config.column[index]) {
//       _config.column[index].width = target;
//     } else {
//       _config.column[index] = {
//         width: target,
//       };
//     }
//   }
//   if (mode === RowColumnMode.row) {
//     if (_config.row[index]) {
//       _config.row[index].height = target;
//     } else {
//       _config.row[index] = {
//         height: target,
//       };
//     }
//   }
//   return _config;
// }

// /** 更新单元格 */
// export function onUpdateCell(data: CommonDataSource, payload: unknown) {
//   let updates: UpdateCell[] = [];
//   if (Array.isArray(payload)) {
//     updates = payload as UpdateCell[];
//   } else {
//     updates = [payload] as UpdateCell[];
//   }
//   const target = { ...data };
//   updates.forEach((ele) => {
//     const key = getKeyByCoord(ele.x, ele.y);
//     const cell = data[key] ? data[key] : INIT_CELL;
//     if (ele.value !== undefined) {
//       cell.value = ele.value;
//     }
//     if (ele.value !== undefined) {
//       cell.style = {
//         ...cell.style,
//         ...ele.style,
//       };
//     }
//     data[key] = cell;
//   });
//   return target;
// }
