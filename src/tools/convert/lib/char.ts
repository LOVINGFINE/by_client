/**
 * 根据索引返回 code
 * @param index
 * @returns Char code
 */
export function getCodeByIndex(index: number) {
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

/**
 * 根据code返回 索引
 * @param code
 * @returns number
 */
export function getIndexByCode(str: string): number {
  const code = str.toUpperCase();
  let index = 0;
  for (let i = 0; i < code.length; i++) {
    const num = code.charCodeAt(i) - 64;
    const unit = Math.pow(24, code.length - i - 1);
    index += num * unit;
  }
  return index;
}
