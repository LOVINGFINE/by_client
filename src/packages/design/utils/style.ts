export function objectToClassNameString(obj: { [k: string]: unknown }) {
  const arr = [];
  for (const key in obj) {
    if (!!obj[key]) {
      arr.push(key);
    }
  }
  return arr.join(" ");
}

export function useClassNames(classNames: { [k: string]: string }) {
  const cn = (d: string | string[] | { [k: string]: unknown }) => {
    if (typeof d === "string") {
      return classNames[d];
    } else if (Array.isArray(d)) {
      return d.map((ele) => classNames[ele]).join(" ");
    } else {
      const n: string[] = [];
      for (const k in d) {
        if (!!d[k]) {
          n.push(classNames[k]);
        }
      }
      return n.join(" ");
    }
  };
  return cn;
}

export function covertNames(d: string | string[] | { [k: string]: unknown }) {
  if (typeof d === "string") {
    return d;
  } else if (Array.isArray(d)) {
    return d.join(" ");
  } else {
    const n: string[] = [];
    for (const k in d) {
      if (!!d[k]) {
        n.push(k);
      }
    }
    return n.join(" ");
  }
}