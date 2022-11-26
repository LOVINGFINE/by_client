import { CSSProperties } from "react";
import { OffsetProp } from "./index";

export function getOffset(current?: HTMLBaseElement | null) {
  if (current) {
    const { offsetHeight = 0, offsetWidth = 0 } = current;
    const left = current.getBoundingClientRect().left;
    const top = current.getBoundingClientRect().top;
    return {
      width: offsetWidth,
      height: offsetHeight,
      left,
      top,
    };
  }
  return {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  };
}

export function getStyles(
  element: HTMLDivElement,
  offset: OffsetProp,
  placement: string
): CSSProperties {
  const overlayWidth = element?.offsetWidth;
  const overlayHeight = element?.offsetHeight;
  const centerH = offset.left + offset.width / 2;
  const centerV = offset.top + offset.height / 2;
  switch (placement) {
    case "top":
      return {
        left: centerH - overlayWidth / 2,
        bottom: offset.top + offset.height,
        paddingBottom: 6,
      };
    case "topLeft":
      return {
        left: offset.left + offset.width - overlayWidth,
        bottom: offset.top + offset.height,
        paddingBottom: 6,
      };
    case "topRight":
      return {
        left: offset.left,
        bottom: offset.top + offset.height,
        paddingBottom: 6,
      };
    case "bottomLeft":
      return {
        left: offset.left + offset.width - overlayWidth,
        top: offset.top + offset.height,
        paddingTop: 6,
      };
    case "bottomRight":
      return {
        left: offset.left,
        top: offset.top + offset.height,
        paddingTop: 6,
      };
    case "left":
      return {
        left: offset.left - overlayWidth,
        top: centerV - overlayHeight / 2,
        paddingRight: 6,
      };
    case "leftTop":
      return {
        left: offset.left - overlayWidth,
        top: offset.top - overlayHeight + offset.height,
        paddingRight: 6,
      };
    case "leftBottom":
      return {
        left: offset.left - overlayWidth,
        top: offset.top,
        paddingRight: 6,
      };
    case "right":
      return {
        left: offset.left + offset.width,
        top: centerV - overlayHeight / 2,
        paddingLeft: 6,
      };
    case "rightTop":
      return {
        left: offset.left + offset.width,
        top: offset.top - overlayHeight + offset.height,
        paddingLeft: 6,
      };
    case "rightBottom":
      return {
        left: offset.left + offset.width,
        top: offset.top,
        paddingLeft: 6,
      };
    default:
      return {
        left: centerH - overlayWidth / 2,
        top: offset.top + offset.height,
        paddingTop: 6,
      };
  }
}

export function getArrowStyles(placement: string, offset: OffsetProp) {
  const extra = 45;
  switch (placement) {
    case "top": {
      return {
        inner: {
          paddingBottom: 10,
        },
        bar: {
          left: 0,
          bottom: 0,
          width: "100%",
          height: 10,
        },
        arrow: {
          bottom: 3,
          left: "50%",
          transform: `translateX(-50%) rotate(45deg)`,
        },
      };
    }
    case "topLeft": {
      return {
        inner: {
          paddingBottom: 10,
        },
        bar: {
          left: 0,
          bottom: 0,
          width: "100%",
          height: 10,
        },
        arrow: {
          bottom: 3,
          right: offset.width < extra ? offset.width / 2 : extra,
          transform: `rotate(45deg)`,
        },
      };
    }
    case "topRight": {
      return {
        inner: {
          paddingBottom: 10,
        },
        bar: {
          left: 0,
          bottom: 0,
          width: "100%",
          height: 10,
        },
        arrow: {
          bottom: 3,
          left: offset.width < extra ? offset.width / 2 : extra,
          transform: `rotate(45deg)`,
        },
      };
    }

    case "left": {
      return {
        inner: {
          paddingRight: 10,
        },
        bar: {
          right: 0,
          top: 0,
          height: "100%",
          width: 10,
        },
        arrow: {
          right: 3,
          top: "50%",
          transform: `translateY(-50%) rotate(45deg)`,
        },
      };
    }
    case "leftTop": {
      return {
        inner: {
          paddingRight: 10,
        },
        bar: {
          right: 0,
          top: 0,
          height: "100%",
          width: 10,
        },
        arrow: {
          right: 3,
          bottom: offset.height < extra ? offset.height / 2 : extra,
          transform: `rotate(45deg)`,
        },
      };
    }
    case "leftBottom": {
      return {
        inner: {
          paddingRight: 10,
        },
        bar: {
          right: 0,
          top: 0,
          height: "100%",
          width: 10,
        },
        arrow: {
          right: 3,
          top: offset.height < extra ? offset.height / 2 : extra,
          transform: ` rotate(45deg)`,
        },
      };
    }
    case "right": {
      return {
        inner: {
          paddingLeft: 10,
        },
        bar: {
          left: 0,
          top: 0,
          height: "100%",
          width: 10,
        },
        arrow: {
          left: 3,
          top: "50%",
          transform: `translateY(-50%) rotate(45deg)`,
        },
      };
    }
    case "rightTop": {
      return {
        inner: {
          paddingLeft: 10,
        },
        bar: {
          left: 0,
          top: 0,
          height: "100%",
          width: 10,
        },
        arrow: {
          left: 3,
          bottom: offset.height < extra ? offset.height / 2 : extra,
          transform: ` rotate(45deg)`,
        },
      };
    }
    case "rightBottom": {
      return {
        inner: {
          paddingLeft: 10,
        },
        bar: {
          left: 0,
          top: 0,
          height: "100%",
          width: 10,
        },
        arrow: {
          left: 3,
          top: offset.height < extra ? offset.height / 2 : extra,
          transform: `rotate(45deg)`,
        },
      };
    }
    case "bottomLeft": {
      return {
        inner: {
          paddingTop: 10,
        },
        bar: {
          left: 0,
          top: 0,
          width: "100%",
          height: 10,
        },
        arrow: {
          top: 3,
          right: offset.width < extra ? offset.width / 2 : extra,
          transform: `rotate(45deg)`,
        },
      };
    }
    case "bottomRight": {
      return {
        inner: {
          paddingTop: 10,
        },
        bar: {
          left: 0,
          top: 0,
          width: "100%",
          height: 10,
        },
        arrow: {
          top: 3,
          left: offset.width < extra ? offset.width / 2 : extra,
          transform: `rotate(45deg)`,
        },
      };
    }
    default: {
      return {
        inner: {
          paddingTop: 10,
        },
        bar: {
          left: 0,
          top: 0,
          width: "100%",
          height: 10,
        },
        arrow: {
          top: 3,
          left: "50%",
          transform: `translateX(-50%) rotate(45deg)`,
        },
      };
    }
  }
}

export function getTooltipArrowStyles(placement: string, offset: OffsetProp) {
  const extra = 45;
  switch (placement) {
    case "top": {
      return {
        inner: {
          paddingBottom: 7,
        },
        bar: {
          left: 0,
          bottom: 0,
          width: "100%",
          height: 7,
        },
        arrow: {
          bottom: 3,
          left: "50%",
          transform: `translateX(-50%) rotate(45deg)`,
        },
      };
    }
    case "topLeft": {
      return {
        inner: {
          paddingBottom: 7,
        },
        bar: {
          left: 0,
          bottom: 0,
          width: "100%",
          height: 7,
        },
        arrow: {
          bottom: 3,
          right: offset.width < extra ? offset.width / 2 : extra,
          transform: `rotate(45deg)`,
        },
      };
    }
    case "topRight": {
      return {
        inner: {
          paddingBottom: 7,
        },
        bar: {
          left: 0,
          bottom: 0,
          width: "100%",
          height: 7,
        },
        arrow: {
          bottom: 3,
          left: offset.width < extra ? offset.width / 2 : extra,
          transform: `rotate(45deg)`,
        },
      };
    }

    case "left": {
      return {
        inner: {
          paddingRight: 7,
        },
        bar: {
          right: 0,
          top: 0,
          height: "100%",
          width: 7,
        },
        arrow: {
          right: 3,
          top: "50%",
          transform: `translateY(-50%) rotate(45deg)`,
        },
      };
    }
    case "leftTop": {
      return {
        inner: {
          paddingRight: 7,
        },
        bar: {
          right: 0,
          top: 0,
          height: "100%",
          width: 7,
        },
        arrow: {
          right: 3,
          bottom: offset.height < extra ? offset.height / 2 : extra,
          transform: `rotate(45deg)`,
        },
      };
    }
    case "leftBottom": {
      return {
        inner: {
          paddingRight: 7,
        },
        bar: {
          right: 0,
          top: 0,
          height: "100%",
          width: 7,
        },
        arrow: {
          right: 3,
          top: offset.height < extra ? offset.height / 2 : extra,
          transform: ` rotate(45deg)`,
        },
      };
    }
    case "right": {
      return {
        inner: {
          paddingLeft: 7,
        },
        bar: {
          left: 0,
          top: 0,
          height: "100%",
          width: 7,
        },
        arrow: {
          left: 3,
          top: "50%",
          transform: `translateY(-50%) rotate(45deg)`,
        },
      };
    }
    case "rightTop": {
      return {
        inner: {
          paddingLeft: 7,
        },
        bar: {
          left: 0,
          top: 0,
          height: "100%",
          width: 7,
        },
        arrow: {
          left: 3,
          bottom: offset.height < extra ? offset.height / 2 : extra,
          transform: ` rotate(45deg)`,
        },
      };
    }
    case "rightBottom": {
      return {
        inner: {
          paddingLeft: 7,
        },
        bar: {
          left: 0,
          top: 0,
          height: "100%",
          width: 7,
        },
        arrow: {
          left: 3,
          top: offset.height < extra ? offset.height / 2 : extra,
          transform: `rotate(45deg)`,
        },
      };
    }
    case "bottomLeft": {
      return {
        inner: {
          paddingTop: 7,
        },
        bar: {
          left: 0,
          top: 0,
          width: "100%",
          height: 7,
        },
        arrow: {
          top: 3,
          right: offset.width < extra ? offset.width / 2 : extra,
          transform: `rotate(45deg)`,
        },
      };
    }
    case "bottomRight": {
      return {
        inner: {
          paddingTop: 7,
        },
        bar: {
          left: 0,
          top: 0,
          width: "100%",
          height: 7,
        },
        arrow: {
          top: 3,
          left: offset.width < extra ? offset.width / 2 : extra,
          transform: `rotate(45deg)`,
        },
      };
    }
    default: {
      return {
        inner: {
          paddingTop: 7,
        },
        bar: {
          left: 0,
          top: 0,
          width: "100%",
          height: 7,
        },
        arrow: {
          top: 3,
          left: "50%",
          transform: `translateX(-50%) rotate(45deg)`,
        },
      };
    }
  }
}
