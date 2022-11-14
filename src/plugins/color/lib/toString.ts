import { hsvToRgba, rgbaToHsv } from "./convert";
import { RGBA, ColorString, HSVA } from "./type";
import { numberToHex } from "./utils";

export function rgbaToString(rgba: RGBA, mode: ColorString = ColorString.hex) {
  const hsva = rgbaToHsv(rgba);
  const { r, g, b } = rgba;
  const { h, s, v } = hsva;
  if (mode === ColorString.hsv) {
    if (hsva.a === 1) {
      return `hsv(${h / 360},${s / 100},${v / 100})`;
    }
    return `hsva(${h / 360},${s / 100},${v / 100},${hsva.a})`;
  }
  if (mode === ColorString.rgb) {
    if (rgba.a === 1) {
      return `rgb(${r},${g},${b})`;
    }
    return `rgba(${r},${g},${b},${rgba.a})`;
  }
  if (rgba.a === 1) {
    return `#${numberToHex(r)}${numberToHex(g)}${numberToHex(b)}`;
  }
  return `#${numberToHex(r)}${numberToHex(g)}${numberToHex(b)}${numberToHex(
    rgba.a * 255
  )}`;
}

export function hsvToString(hsva: HSVA, mode: ColorString = ColorString.hex) {
  const rgba = hsvToRgba(hsva);
  const { h, s, v } = hsva;
  const { r, g, b } = rgba;
  if (mode === ColorString.rgb) {
    if (rgba.a === 1) {
      return `rgb(${r},${g},${b})`;
    }
    return `rgba(${r},${g},${b},${rgba.a})`;
  }
  if (mode === ColorString.hsv) {
    if (hsva.a === 1) {
      return `hsv(${h / 360},${s / 100},${v / 100})`;
    }
    return `hsva(${h / 360},${s / 100},${v / 100},${hsva.a})`;
  }
  if (rgba.a === 1) {
    return `#${numberToHex(r)}${numberToHex(g)}${numberToHex(b)}`;
  }
  return `#${numberToHex(r)}${numberToHex(g)}${numberToHex(b)}${numberToHex(
    rgba.a * 255
  )}`;
}
