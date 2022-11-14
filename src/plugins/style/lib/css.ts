export function toStringByCSSProperties(style: React.CSSProperties) {
  let styleString = "";
  const paseComboString = (str: string) => {
    let target = "";
    str.split("").forEach((m) => {
      if (m.toUpperCase() === m) {
        target += "-" + m.toLowerCase();
      } else {
        target += m;
      }
    });
    return target;
  };
  for (const [key, value] of Object.entries(style)) {
    styleString += `${paseComboString(key)}:${value};`;
  }
  return styleString;
}
