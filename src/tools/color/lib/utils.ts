import { color_names, trim_reg_exp, type_matchers } from "./final";
import { ColorMode, MatcherProp, RGBA } from "./type";

export function bound(n: string | number, max: number) {
  const isOnePointZero =
    typeof n === "string" && n.indexOf(".") !== -1 && parseFloat(n) === 1;
  const isPercentage = typeof n === "string" && n.indexOf("%") != -1;

  if (isOnePointZero) {
    n = "100%";
  }
  n = Math.min(max, Math.max(0, parseFloat(`${n}`)));
  // Automatically convert percentage into number
  if (isPercentage) {
    n = parseInt(`${n * max}`, 10) / 100;
  }
  // Handle floating point rounding errors
  if (Math.abs(n - max) < 0.000001) {
    return 1;
  }
  // Convert into [0, 1] range if it isn't already
  return (n % max) / parseFloat(`${max}`);
}

export function parseIntHex(val: string) {
  return parseInt(val, 16);
}

export function numberToHex(d: number) {
  if (d >= 255) {
    return "ff";
  }
  if (d <= 0) {
    return "00";
  }
  const hex = parseFloat(`${d}`).toString(16);
  if (hex.length > 1) {
    return hex;
  }
  return `0${hex}`;
}

// Converts a hex value to a decimal
export function toDecimal(h: string) {
  return parseIntHex(h) / 255;
}

export function colorTransform(str: string) {
  const colorString = str
    .replace(trim_reg_exp.left, "")
    .replace(trim_reg_exp.right, "")
    .toLowerCase();
  if (color_names[colorString]) {
    return color_names[colorString];
  }
  return colorString;
}

export function convertColorTo(color: string): RGBA {
  const match: MatcherProp = {
    key: null,
    regExp: null,
  };

  for (const k in type_matchers) {
    const key = k as ColorMode;
    const regExp = type_matchers[key];
    if (regExp.test(color)) {
      match.key = key;
      match.regExp = regExp;
    }
  }
  const default_mode = {
    r: 0,
    g: 0,
    b: 0,
    a: 0,
  };
  if (match.key) {
    const target = match.regExp?.exec(color);
    if (target) {
      switch (match.key) {
        case ColorMode.hex3:
          return {
            r: parseIntHex(`${target[1]}${target[1]}`),
            g: parseIntHex(`${target[2]}${target[2]}`),
            b: parseIntHex(`${target[3]}${target[3]}`),
            a: 1,
          };
        case ColorMode.hex6:
          return {
            r: parseIntHex(target[1]),
            g: parseIntHex(target[2]),
            b: parseIntHex(target[3]),
            a: 1,
          };
        case ColorMode.hex4:
          return {
            r: parseIntHex(`${target[1]}${target[1]}`),
            g: parseIntHex(`${target[2]}${target[2]}`),
            b: parseIntHex(`${target[3]}${target[3]}`),
            a: toDecimal(`${target[4]}${target[4]}`),
          };
        case ColorMode.hex8:
          return {
            r: parseIntHex(target[1]),
            g: parseIntHex(target[2]),
            b: parseIntHex(target[4]),
            a: toDecimal(target[4]),
          };
        case ColorMode.rgb:
          return {
            r: parseInt(target[1]),
            g: parseInt(target[2]),
            b: parseInt(target[3]),
            a: 1,
          };
        case ColorMode.rgba:
          return {
            r: parseInt(target[1]),
            g: parseInt(target[2]),
            b: parseInt(target[3]),
            a: parseInt(target[4]),
          };
        default:
          return default_mode;
      }
    }
    return default_mode;
  }
  return default_mode;
}
