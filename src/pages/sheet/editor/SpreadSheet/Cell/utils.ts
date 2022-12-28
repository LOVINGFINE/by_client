import { CSSProperties } from "react";
import { CellStyle, Horizontal, Vertical } from "../type";

export function getCellStyle(cellStyle: CellStyle): CSSProperties {
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
    lineHeight,
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
    lineHeight,
    justifyContent: align(horizontal),
    alignItems: align(vertical),
    fontWeight: bold ? "bold" : "normal",
    fontStyle: italic ? "italic" : "normal",
    textDecoration: `${underline ? "underline" : ""} ${
      strike ? "line-through" : ""
    }`,
  };
}

export function getRefCellInputStyle(cellStyle: CellStyle): CSSProperties {
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
