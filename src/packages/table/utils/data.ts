import { Selection, DataSource } from "../index";

/**
 *
 * @param array string[][]
 * @returns 二维数组 csv string
 */
export function arrayToCsv(array: DataSource): string {
  return array
    .map((row) => {
      return row.map((cell) => `${cell}`).join("\t");
    })
    .join("\n");
}

/**
 *
 * @param csvString csv string
 * @returns array: string[][]
 */
export function csvToArray(csvString: string): DataSource {
  const rows = csvString.split("\n");
  return rows.map((row) => {
    return row.split("\t");
  });
}

/**
 * 将数据复制到 粘贴板
 * @param dataSource TwoArray
 * @param selection Selection
 * @returns Promise<void>
 */
export async function copyArrayBySelection(
  dataSource: DataSource,
  selection: Selection
): Promise<void> {
  return new Promise((resolve, reject) => {
    const clipboard = navigator.clipboard;
    const { column, row } = selection;
    const target: DataSource = [];
    // 转化为二维数组
    for (let i = row.start; i <= row.end; i++) {
      const temp = [];
      const item = dataSource[i];
      for (let j = column.start; j <= column.end; j++) {
        if (item[j] === undefined) {
          temp.push("");
        } else {
          temp.push(item[j]);
        }
      }
      target.push(temp);
    }

    // 转化为文本复制
    const copyString = arrayToCsv(target);
    if (copyString && clipboard) {
      clipboard
        .writeText(copyString)
        .then(() => {
          resolve();
        })
        .catch((e) => {
          reject(e);
        });
    } else {
      reject("clipboard not found");
    }
  });
}

/**
 *
 * @param dataSource TwoArray
 * @param selection Selection
 * @returns new TwoArray
 */
export async function pasteDataBySelection(
  dataSource: DataSource,
  selection: Selection
): Promise<DataSource> {
  try {
    const clipboard = navigator.clipboard;
    const copyString = await clipboard.readText();
    const copyData = csvToArray(copyString);
    const target = [...dataSource];
    // 转化 信息
    if (copyData.length) {
      const { column, row } = selection;
      for (let i = row.start; i <= row.end; i++) {
        const y = i - row.start;
        if (y >= copyData.length) {
          break;
        } else {
          const item = target[i];
          for (let j = column.start; j <= column.end; j++) {
            const x = j - column.start;
            if (y >= copyData.length) {
              break;
            } else {
              const oldVal = item[j];
              const newVal = copyData[y][x];
              if (newVal !== undefined && newVal !== oldVal) {
                target[i][j] = newVal;
              }
            }
          }
        }
      }
    }
    return Promise.resolve(target);
  } catch (e) {
    return Promise.reject(e);
  }
}

/**
 * 根据索引返回 code
 * @param index
 * @returns Char code
 */
export function getCharByNumber(index: number) {
  let dividend = index + 1;
  let columnName = "";
  let modulo;
  while (dividend > 0) {
    modulo = (dividend - 1) % 26;
    columnName = String.fromCharCode(65 + modulo).toString() + columnName;
    dividend = parseInt(`${(dividend - modulo) / 26}`);
  }
  return columnName;
}

export async function onCopyByTwoArray(arr: DataSource) {
  try {
    // 转化为文本复制
    const clipboard = navigator.clipboard;
    const copyString = arrayToCsv(arr);
    await clipboard.writeText(copyString);
    return copyString;
  } catch (e) {
    return e;
  }
}

export async function getPasteTwoArray() {
  const clipboard = navigator.clipboard;
  const copyString = await clipboard.readText();
  return csvToArray(copyString || "");
}
