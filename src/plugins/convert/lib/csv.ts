/**
 *
 * @param array string[][]
 * @returns 二维数组 csv string
 */
export function arrayToCsv(array: (string | number | boolean)[][]): string {
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
export function csvToArray(csvString: string): (string | number | boolean)[][] {
  const rows = csvString.split("\n");
  return rows.map((row) => {
    return row.split("\t");
  });
}
