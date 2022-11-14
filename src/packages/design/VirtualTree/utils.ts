/* eslint-disable @typescript-eslint/no-explicit-any */
/*** @interface */
export interface ExpendReducesOptions {
  expandKeys?: string[];
  childrenKey?: string;
  height: number;
  extra: number;
}

export interface FlattenOptions {
  level?: number;
  parentKey?: string | number | null;
}

/*** @methods */
export function reduceTreeSource(
  dataSource: any[],
  options: ExpendReducesOptions
) {
  const results: any[] = [];
  const { expandKeys = [], childrenKey = "children", height } = options;
  const flatten = (data: any[], props: FlattenOptions) => {
    const length = data.length;
    const { level = 0, parentKey = null } = props;
    for (let index = 0; index < length; index++) {
      const translateY = results.length * height;
      const item = data[index];
      const nodeKey = `${parentKey ? parentKey + "-" : ""}${level}-${index}`;
      const isLeaf = !item[childrenKey];
      const treeNode = {
        nodeKey,
        level,
        isLeaf,
        isExpand: !isLeaf && expandKeys.includes(nodeKey),
        translateY,
        parentKey,
        ...item,
      };
      results.push(treeNode);
      if (Array.isArray(item[childrenKey]) && expandKeys.includes(nodeKey)) {
        flatten(item[childrenKey], {
          parentKey: nodeKey,
          level: level + 1,
        });
      }
    }
  };
  flatten(dataSource, {});
  return results;
}
