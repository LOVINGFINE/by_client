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

export function setStyles(
  childrenRef: HTMLElement | null,
  placement: string,
  element: HTMLDivElement
) {
  const { offsetHeight, offsetWidth, offsetTop, offsetLeft } =
    getOffset(childrenRef);
  const centerH = offsetLeft + offsetWidth / 2;
  const extra = 6;
  switch (placement) {
    case "top": {
      element.style.left = `${centerH}px`;
      element.style.top = `${offsetTop - extra}px`;
      element.style.transform = `translate(-50%,-100%)`;
      element.style.paddingBottom = `${extra}px`;
      break;
    }
    case "topLeft": {
      element.style.left = `${offsetLeft + offsetWidth}px`;
      element.style.top = `${offsetTop - extra}px`;
      element.style.transform = `translate(-100%,-100%)`;
      element.style.paddingBottom = `${extra}px`;
      break;
    }
    case "topRight": {
      element.style.left = `${offsetLeft}px`;
      element.style.top = `${offsetTop - extra}px`;
      element.style.transform = `translateY(-100%)`;
      element.style.paddingBottom = `${extra}px`;
      break;
    }
    case "bottomLeft": {
      element.style.left = `${offsetLeft + offsetWidth}px`;
      element.style.transform = `translateX(-100%)`;
      element.style.top = `${offsetTop + offsetHeight + extra}px`;
      element.style.paddingTop = `${extra}px`;
      break;
    }
    case "bottomRight": {
      element.style.left = `${offsetLeft}px`;
      element.style.top = `${offsetTop + offsetHeight + extra}px`;
      element.style.paddingTop = `${extra}px`;
      break;
    }
    default: {
      // bottom
      element.style.left = `${centerH}px`;
      element.style.transform = `translateX(-50%)`;
      element.style.top = `${offsetTop + offsetHeight + extra}px`;
      element.style.paddingTop = `${extra}px`;
    }
  }
}
