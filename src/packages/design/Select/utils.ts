import { OffsetProp } from "./index";
export function setStyles(
  element: HTMLDivElement,
  offset: OffsetProp,
  placement: string
) {
  const overlayWidth = element?.offsetWidth;
  const centerH = offset.left + offset.width / 2;
  const extra = 2;
  if (placement === "top") {
    element.style.left = `${centerH - overlayWidth / 2}px`;
    element.style.bottom = `${offset.top + offset.height + extra}px`;
    element.style.paddingBottom = `${extra}px`;
  } else {
    element.style.left = `${centerH - overlayWidth / 2}px`;
    element.style.top = `${offset.top + offset.height + extra}px`;
    element.style.paddingTop = `${extra}px`;
  }
  element.style.opacity = "1";
}
