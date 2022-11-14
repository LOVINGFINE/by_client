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

export function covClass(d: string | string[] | { [k: string]: unknown }) {
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
