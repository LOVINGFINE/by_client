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
  offset: {
    offsetHeight: number;
    offsetWidth: number;
    offsetTop: number;
    offsetLeft: number;
  },
  placement: string,
  extra = 4
) {
  const { offsetHeight, offsetWidth, offsetTop, offsetLeft } = offset;
  const centerH = offsetLeft + offsetWidth / 2;
  switch (placement) {
    case "top":
      return {
        left: centerH,
        top: offsetTop - extra,
        transform: `translate(-50%,-100%)`,
        paddingBottom: extra,
      };
    case "topLeft":
      return {
        left: offsetLeft + offsetWidth,
        top: offsetTop - extra,
        transform: `translate(-100%,-100%)`,
        paddingBottom: extra,
      };
    case "topRight":
      return {
        left: offsetLeft,
        top: offsetTop - extra,
        transform: `translateY(-100%)`,
        paddingBottom: extra,
      };
    case "bottomLeft":
      return {
        left: offsetLeft + offsetWidth,
        transform: `translateX(-100%)`,
        top: offsetTop + offsetHeight + extra,
        paddingTop: extra,
      };
    case "bottomRight":
      return {
        left: offsetLeft,
        top: offsetTop + offsetHeight + extra,
        paddingTop: extra,
      };
    default:
      return {
        // bottom
        left: centerH,
        transform: `translateX(-50%)`,
        top: offsetTop + offsetHeight + extra,
        paddingTop: extra,
      };
  }
}

export function getInnerStyles(placement: string, size = 10) {
  switch (placement) {
    case "top":
    case "topLeft":
    case "topRight": {
      return {
        paddingBottom: size,
      };
    }
    case "left":
    case "leftTop":
    case "leftBottom": {
      return {
        paddingRight: size,
      };
    }
    case "right":
    case "rightTop":
    case "rightBottom": {
      return {
        paddingLeft: size,
      };
    }
    default: {
      return {
        paddingTop: size,
      };
    }
  }
}

export function getBarStyles(placement: string, size: number) {
  switch (placement) {
    case "top":
    case "topLeft":
    case "topRight": {
      return {
        left: 0,
        bottom: 0,
        width: "100%",
        height: size,
      };
    }
    case "left":
    case "leftTop":
    case "leftBottom": {
      return {
        right: 0,
        top: 0,
        height: "100%",
        width: size,
      };
    }
    case "right":
    case "rightTop":
    case "rightBottom": {
      return {
        left: 0,
        top: 0,
        height: "100%",
        width: size,
      };
    }
    default: {
      return {
        left: 0,
        top: 0,
        width: "100%",
        height: size,
      };
    }
  }
}
export function getArrowStyles(
  placement: string,
  width: number,
  height: number
) {
  const extra = 45;
  switch (placement) {
    case "top": {
      return {
        bottom: 4,
        left: "50%",
        transform: `translateX(-50%) rotate(45deg)`,
      };
    }
    case "topLeft": {
      return {
        bottom: 4,
        right: width < extra ? width / 2 : extra,
        transform: `rotate(45deg)`,
      };
    }
    case "topRight": {
      return {
        bottom: 4,
        left: width < extra ? width / 2 : extra,
        transform: `rotate(45deg)`,
      };
    }

    case "left": {
      return {
        right: 4,
        top: "50%",
        transform: `translateY(-50%) rotate(45deg)`,
      };
    }
    case "leftTop": {
      return {
        right: 4,
        bottom: height < extra ? height / 2 : extra,
        transform: `rotate(45deg)`,
      };
    }
    case "leftBottom": {
      return {
        right: 4,
        top: height < extra ? height / 2 : extra,
        transform: ` rotate(45deg)`,
      };
    }
    case "right": {
      return {
        left: 4,
        top: "50%",
        transform: `translateY(-50%) rotate(45deg)`,
      };
    }
    case "rightTop": {
      return {
        left: 4,
        bottom: height < extra ? height / 2 : extra,
        transform: ` rotate(45deg)`,
      };
    }
    case "rightBottom": {
      return {
        left: 4,
        top: height < extra ? height / 2 : extra,
        transform: `rotate(45deg)`,
      };
    }
    case "bottomLeft": {
      return {
        top: 4,
        right: width < extra ? width / 2 : extra,
        transform: `rotate(45deg)`,
      };
    }
    case "bottomRight": {
      return {
        top: 4,
        left: width < extra ? width / 2 : extra,
        transform: `rotate(45deg)`,
      };
    }
    default: {
      return {
        top: 4,
        left: "50%",
        transform: `translateX(-50%) rotate(45deg)`,
      };
    }
  }
}
