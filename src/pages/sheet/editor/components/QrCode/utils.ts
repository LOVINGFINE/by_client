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
  const extra = 2;
  switch (placement) {
    case "top":
      return {
        left: centerH,
        top: offsetTop - extra,
        transform: `translate(-50%,-100%)`,
      };
    default:
      return {
        // bottom
        left: centerH,
        transform: `translateX(-50%)`,
        top: offsetTop + offsetHeight + extra,
      };
  }
}
