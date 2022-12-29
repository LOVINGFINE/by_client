export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface HSVA {
  h: number;
  s: number;
  v: number;
  a: number;
}


export enum ColorMode {
  hex3 = "hex3",
  hex6 = "hex6",
  hex4 = "hex4",
  hex8 = "hex8",
  rgb = "rgb",
  rgba = "rgba",
  hsv = "hsv",
  hsva = "hsva",
}

export type TypeMatcher = {
  [k in ColorMode]: RegExp;
};

export type MatcherProp = {
  key: ColorMode | null;
  regExp: RegExp | null;
};

export enum ColorString {
  hex = "hex",
  rgb = "rgb",
  hsv = "hsv",
}

export interface GenerateOpts {
  theme?: string;
}
