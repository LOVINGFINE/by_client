import { type_matchers } from "./final";
import { ColorMode, MatcherProp, RGBA, HSVA } from "./type";
import { parseIntHex, toDecimal } from "./utils";

export function rgbaToHsv(rgba: RGBA): HSVA {
  let h = 0;
  let s = 0;
  let v = 0;
  const r = rgba.r;
  const g = rgba.g;
  const b = rgba.b;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  v = max / 255;
  if (max === 0) {
    s = 0;
  } else {
    s = 1 - min / max;
  }
  if (max === min) {
    h = 0; //事实上，max===min的时候，h无论为多少都无所谓
  } else if (max === r && g >= b) {
    h = 60 * ((g - b) / (max - min)) + 0;
  } else if (max === r && g < b) {
    h = 60 * ((g - b) / (max - min)) + 360;
  } else if (max === g) {
    h = 60 * ((b - r) / (max - min)) + 120;
  } else if (max === b) {
    h = 60 * ((r - g) / (max - min)) + 240;
  }
  h = Math.floor(h);
  s = Math.floor(s * 100);
  v = Math.floor(v * 100);
  return { h, s, v, a: rgba.a };
}

export function hsvToRgba(hsva: HSVA): RGBA {
  const h = hsva.h;
  let s = hsva.s;
  let v = hsva.v;
  s = s / 100;
  v = v / 100;
  const i = parseInt(`${(h / 60) % 6}`);
  const f = h / 60 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  const mod = i % 6;
  const _r = [v, q, p, p, t, v][mod];
  const _g = [t, v, v, q, p, p][mod];
  const _b = [p, p, t, v, v, q][mod];
  const r = parseInt(`${_r * 255}`);
  const g = parseInt(`${_g * 255}`);
  const b = parseInt(`${_b * 255 + 1}`);
  return { r, g, b, a: hsva.a };
}

export function convertColorToRgba(color: string): RGBA {
  let match: MatcherProp = {
    key: null,
    regExp: null,
  };

  for (const k in type_matchers) {
    const key = k as ColorMode;
    const regExp = type_matchers[key];
    if (regExp.test(color)) {
      match = {
        key,
        regExp,
      };
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

export function convertColorToHsv(color: string): HSVA {
  const rgba = convertColorToRgba(color);
  return rgbaToHsv(rgba);
}
