import { JsonType, JsonItem } from "../../type";
export function transformFromMap(
  label: string,
  value: { [k: string]: unknown },
  depth: number,
  path: string
): JsonItem {
  const children: JsonItem[] = [];
  for (const k in value) {
    if (typeof value[k] === "string") {
      // 文本
      children.push(
        transformFromString(k, value[k] as string, depth + 1, `${path}.${k}`)
      );
    } else if (typeof value[k] === "number") {
      // 数字
      children.push(
        transformFromNumber(k, value[k] as number, depth + 1, `${path}.${k}`)
      );
    } else if (typeof value[k] === "boolean") {
      // 布尔
      children.push(
        transformFromBoolean(k, value[k] as boolean, depth + 1, `${path}.${k}`)
      );
    } else if (Array.isArray(value[k])) {
      // 数组
      children.push(
        transformFromArray(k, value[k] as unknown[], depth + 1, `${path}.${k}`)
      );
    } else {
      // map
      if (typeof value[k] === "object") {
        children.push(
          transformFromMap(
            k,
            value[k] as { [k: string]: unknown },
            depth + 1,
            `${path}.${k}`
          )
        );
      }
    }
  }
  return {
    label,
    depth,
    path,
    value,
    type: JsonType.object,
    children,
  };
}

export function transformFromArray(
  label: string,
  value: unknown[],
  depth: number,
  path: string
): JsonItem {
  const children: JsonItem[] = [];
  value.forEach((ele, i) => {
    if (typeof ele === "string") {
      // 文本
      children.push(
        transformFromString(`[${i}]`, ele as string, depth + 1, `${path}.[${i}]`)
      );
    } else if (typeof ele === "number") {
      // 数字
      children.push(
        transformFromNumber(`[${i}]`, ele as number, depth + 1, `${path}.[${i}]`)
      );
    } else if (typeof ele === "boolean") {
      // 布尔
      children.push(
        transformFromBoolean(`[${i}]`, ele as boolean, depth + 1, `${path}.[${i}]`)
      );
    } else if (Array.isArray(ele)) {
      // 数组
      children.push(
        transformFromArray(`[${i}]`, ele as unknown[], depth + 1, `${path}.[${i}]`)
      );
    } else {
      // map
      if (typeof ele === "object") {
        children.push(
          transformFromMap(
            `[${i}]`,
            ele as { [k: string]: unknown },
            depth + 1,
            `${path}.[${i}]`
          )
        );
      }
    }
  });
  return {
    label,
    depth,
    path,
    value,
    type: JsonType.array,
    children,
  };
}

export function transformFromString(
  label: string,
  value: string,
  depth: number,
  path: string
): JsonItem {
  return {
    path,
    label,
    depth,
    value,
    type: JsonType.string,
  };
}

export function transformFromNumber(
  label: string,
  value: number,
  depth: number,
  path: string
): JsonItem {
  return {
    path,
    label,
    depth,
    value,
    type: JsonType.number,
  };
}

export function transformFromBoolean(
  label: string,
  value: boolean,
  depth: number,
  path: string
): JsonItem {
  return {
    path,
    label,
    depth,
    value,
    type: JsonType.boolean,
  };
}

export default function transformJson(json: { [k: string]: unknown }) {
  return transformFromMap("$", json, 0, "$");
}
