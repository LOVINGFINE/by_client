import { OffsetProp } from "./index";

export function getOffset(current?: HTMLElement | null) {
  if (current) {
    const { offsetHeight = 0, offsetWidth = 0 } = current;
    const offsetLeft = current.getBoundingClientRect().left;
    const offsetTop = current.getBoundingClientRect().top;
    return {
      offsetWidth,
      offsetHeight,
      offsetLeft,
      offsetTop,
    };
  }
  return {
    offsetWidth: 0,
    offsetHeight: 0,
    offsetLeft: 0,
    offsetTop: 0,
  };
}

export function getStyles(childrenRef: HTMLElement | null, placement: string) {
  const { offsetHeight, offsetWidth, offsetTop, offsetLeft } =
    getOffset(childrenRef);
  const centerH = offsetLeft + offsetWidth / 2;
  const extra = 6;
  switch (placement) {
    case "top":
      return {
        width: offsetWidth,
        left: centerH,
        top: offsetTop - extra,
        transform: `translate(-50%,-100%)`,
        paddingBottom: extra,
      };
    default:
      return {
        // bottom
        width: offsetWidth,
        left: centerH,
        transform: `translateX(-50%)`,
        top: offsetTop + offsetHeight + extra,
        paddingTop: extra,
      };
  }
}

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
