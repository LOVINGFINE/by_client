import { convertColorToHsv } from "./convert";
import { color_names } from "./final";

/*
 * 判断颜色属于深色还是浅色
 */
export function testColorDarkOrLight(rgb: string) {
  const hsv = convertColorToHsv(color_names[rgb] ? color_names[rgb] : rgb);
  if (hsv.a < 0.6) {
    return "light";
  }
  return hsv.v > 70 ? "light" : "dark";
}
