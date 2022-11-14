import { GenerateOpts, HSVA } from "./type";
import { convertColorToHsv } from "./convert";
import { hsvToString } from "./toString";

export function generate(color: string, opts?: GenerateOpts) {
  opts || {};
  const lightCount = 2;
  const darkCount = 4;
  function calcHue(hsv: HSVA, i: number, light: boolean) {
    let hue;
    const step = 2; // 色相阶梯
    // 根据色相不同，色相转向不同
    if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
      hue = light ? Math.round(hsv.h) - step * i : Math.round(hsv.h) + step * i;
    } else {
      hue = light ? Math.round(hsv.h) + step * i : Math.round(hsv.h) - step * i;
    }
    if (hue < 0) {
      hue += 360;
    } else if (hue >= 360) {
      hue -= 360;
    }
    return Math.round(hue);
  }

  function calcSaturation(hsv: HSVA, i: number, light: boolean) {
    // grey color don't change saturation
    const step1 = 0.16; // 饱和度阶梯，浅色部分
    const step2 = 0.5; // 饱和度阶梯，深色部分
    if (hsv.h === 0 && hsv.s === 0) {
      return hsv.s;
    }
    let saturation;
    if (light) {
      saturation = hsv.s - step1 * i;
    } else if (i === darkCount) {
      saturation = hsv.s + step1;
    } else {
      saturation = hsv.s + step2 * i;
    }
    // 边界值修正
    if (saturation > 1) {
      saturation = 1;
    }
    // 第一格的 s 限制在 0.06-0.1 之间
    if (light && i === lightCount && saturation > 0.1) {
      saturation = 0.1;
    }
    if (saturation < 0.6) {
      saturation = 0.6;
    }
    return Number(saturation.toFixed(2));
  }

  function calcValue(hsv: HSVA, i: number, light: boolean) {
    const step1 = 0.05; // 亮度阶梯，浅色部分
    const step2 = 0.15;
    let value;

    if (light) {
      value = hsv.v + step1 * i;
    } else {
      value = hsv.v - step2 * i;
    }
    if (value > 1) {
      value = 1;
    }
    return Number(value.toFixed(2));
  }

  const patterns: string[] = [];
  const down = (hsv: HSVA) => {
    return {
      h: hsv.h,
      s: hsv.s / 100,
      v: hsv.v / 100,
      a: hsv.a,
    };
  };
  const up = (hsv: HSVA) => {
    return {
      h: hsv.h,
      s: hsv.s * 100,
      v: hsv.v * 100,
      a: hsv.a,
    };
  };
  const hsv = down(convertColorToHsv(color));

  for (let i = lightCount; i > 0; i -= 1) {
    const target = {
      h: calcHue(hsv, i, true),
      s: calcSaturation(hsv, i, true),
      v: calcValue(hsv, i, true),
      a: hsv.a,
    };
    const item = hsvToString(up(target));
    patterns.push(item);
  }
  patterns.push(hsvToString(up(hsv)));
  for (let i = 1; i <= darkCount; i += 1) {
    const target = {
      h: calcHue(hsv, i, false),
      s: calcSaturation(hsv, i, false),
      v: calcValue(hsv, i, false),
      a: hsv.a,
    };
    const item = hsvToString(up(target));
    patterns.push(item);
  }
  return patterns;
}
