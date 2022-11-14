export function setStyles(
  element: HTMLDivElement,
  childrenRef: HTMLElement | null,
  placement: string
) {
  const {
    offsetHeight = 0,
    offsetWidth = 0,
    offsetTop = 0,
    offsetLeft = 0,
  } = childrenRef || {};
  const overlayWidth = element?.offsetWidth;
  const overlayHeight = element?.offsetHeight;

  const centerH = offsetLeft + offsetWidth / 2;
  const extra = 6;
  switch (placement) {
    case "top": {
      element.style.left = `${centerH - overlayWidth / 2}px`;
      element.style.top = `${offsetTop - overlayHeight - extra}px`;
      element.style.paddingBottom = `${extra}px`;
      break;
    }
    case "topLeft": {
      element.style.left = `${offsetLeft + offsetWidth - overlayWidth}px`;
      element.style.top = `${offsetTop - overlayHeight - extra}px`;
      element.style.paddingBottom = `${extra}px`;
      break;
    }
    case "topRight": {
      element.style.left = `${offsetLeft}px`;
      element.style.top = `${offsetTop - overlayHeight - extra}px`;
      element.style.paddingBottom = `${extra}px`;
      break;
    }
    case "bottomLeft": {
      element.style.left = `${offsetLeft + offsetWidth - overlayWidth}px`;
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
      element.style.left = `${centerH - overlayWidth / 2}px`;
      element.style.top = `${offsetTop + offsetHeight + extra}px`;
      element.style.paddingTop = `${extra}px`;
    }
  }
  element.style.opacity = "1";
}
