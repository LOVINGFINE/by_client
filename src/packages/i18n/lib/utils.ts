import { LocaleDataSource } from "./type";

export function replaceVariable(
  str: string | number,
  named: { [k: string]: string | number | boolean }
) {
  let target = str;
  for (const k in named) {
    const varRegExp = new RegExp(`\{${k}\}`, "g");
    target = `${target}`.replace(varRegExp, `${named[k]}`);
  }
  return target;
}

export function getLocaleString(
  dataSource: LocaleDataSource,
  k: string,
  named?: { [k: string]: number | string }
) {
  if (dataSource[k]) {
    if (named) {
      return replaceVariable(dataSource[k], named);
    }
    return dataSource[k];
  }
  console.warn(`locale key [${k}] not found text`);
  return "";
}
