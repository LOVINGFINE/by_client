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

export function getStyles(
  childrenRef: HTMLElement | null,
  size: {
    overlayWidth: number;
    overlayHeight: number;
  },
  placement: string
) {
  const { offsetHeight, offsetWidth, offsetTop, offsetLeft } =
    getOffset(childrenRef);
  const { overlayWidth, overlayHeight } = size;
  const centerH = offsetLeft + offsetWidth / 2;
  const extra = 6;
  switch (placement) {
    case "top": {
      // element.style.left = `${centerH - overlayWidth / 2}px`;
      // element.style.top = `${offsetTop - overlayHeight - extra}px`;
      // element.style.paddingBottom = `${extra}px`;
      // break;
      return {
        left: centerH - overlayWidth / 2,
        top: offsetTop - overlayHeight - extra,
        paddingBottom: extra,
      };
    }
    case "topLeft": {
      // element.style.left = `${offsetLeft + offsetWidth - overlayWidth}px`;
      // element.style.top = `${offsetTop - overlayHeight - extra}px`;
      // element.style.paddingBottom = `${extra}px`;
      return {
        left: offsetLeft + offsetWidth - overlayWidth,
        top: offsetTop - overlayHeight - extra,
        paddingBottom: extra,
      };
    }
    case "topRight": {
      // element.style.left = `${offsetLeft}px`;
      // element.style.top = `${offsetTop - overlayHeight - extra}px`;
      // element.style.paddingBottom = `${extra}px`;
      return {
        left: offsetLeft,
        top: offsetTop - overlayHeight - extra,
        paddingBottom: extra,
      };
    }
    case "bottomLeft": {
      // element.style.left = `${offsetLeft + offsetWidth - overlayWidth}px`;
      // element.style.top = `${offsetTop + offsetHeight + extra}px`;
      // element.style.paddingTop = `${extra}px`;
      return {
        left: offsetLeft + offsetWidth - overlayWidth,
        top: offsetTop + offsetHeight + extra,
        paddingTop: extra,
      };
    }
    case "bottomRight": {
      // element.style.left = `${offsetLeft}px`;
      // element.style.top = `${offsetTop + offsetHeight + extra}px`;
      // element.style.paddingTop = `${extra}px`;
      return {
        left: offsetLeft,
        top: offsetTop + offsetHeight + extra,
        paddingTop: extra,
      };
    }
    default: {
      // bottom
      // element.style.left = `${centerH - overlayWidth / 2}px`;
      // element.style.top = `${offsetTop + offsetHeight + extra}px`;
      // element.style.paddingTop = `${extra}px`;
      return {
        left: centerH - overlayWidth / 2,
        top: offsetTop + offsetHeight + extra,
        paddingTop: extra,
      };
    }
  }
}
