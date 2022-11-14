import { JsonItem } from "../../type";

const intExp = /\.\[[0-9]*\]/g;

export function inSelectedKeys(json: JsonItem, item: JsonItem, keys: string[]) {
  const targetKeys: string[] = [...keys];
  const path = item.path.replace(intExp, "");
  const depth = item.depth;
  const find = (data: JsonItem) => {
    const dataPath = data.path.replace(intExp, "");
    const dataDepth = data.depth;
    if (dataDepth === depth && path === dataPath) {
      targetKeys.push(data.path);
    }
    if (data.children && dataDepth < depth) {
      data.children.forEach((ele) => {
        find(ele);
      });
    }
  };
  find(json);
  return targetKeys;
}

export function unSelectedKeys(item: JsonItem, keys: string[]) {
  const path = item.path.replace(intExp, "");
  return keys.filter((ele) => {
    return ele.replace(intExp, "") !== path;
  });
}
