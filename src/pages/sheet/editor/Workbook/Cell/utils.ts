import { CSSProperties } from "react";
import { StyleOption, Horizontal, Vertical } from "../type";

export function getCellStyle(cellStyle: StyleOption): CSSProperties {
  const {
    color,
    background,
    horizontal,
    bold,
    italic,
    fontSize,
    strike,
    underline,
    vertical,
  } = cellStyle;

  const align = (e?: Vertical | Horizontal) => {
    if (e === Vertical.bottom || e === Horizontal.right) {
      return "flex-end";
    }
    if (e === Vertical.middle || e === Horizontal.center) {
      return "center";
    }
  };
  return {
    fontSize,
    color,
    background,
    alignItems: align(horizontal),
    justifyContent: align(vertical),
    fontWeight: bold ? "bold" : "normal",
    fontStyle: italic ? "italic" : "normal",
    textDecoration: `${underline ? "underline" : ""} ${
      strike ? "line-through" : ""
    }`,
  };
}

export function getRefCellInputStyle(cellStyle: StyleOption): CSSProperties {
  const { color, bold, italic, underline, strike } = cellStyle;
  const style: CSSProperties = {
    color,
    fontWeight: bold ? "bold" : "normal",
    fontStyle: italic ? "italic" : "normal",
    textDecoration: `${underline ? "underline" : ""} ${
      strike ? "line-through" : ""
    }`,
  };
  return style;
}
