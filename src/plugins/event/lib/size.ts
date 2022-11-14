import { toStringByCSSProperties } from "@/plugins/style";
import { DropEndProp, DropEventOption } from "../type";

const init_option: DropEventOption = {
  offsetHeight: 0,
  offsetWidth: 0,
  background: "#13c2c2",
  width: 0,
  height: 0,
};

export function getLineStyle(dom: DOMRect, opts: DropEventOption) {
  const { background, offsetHeight, offsetWidth } = opts;
  let lineStyle: { [k: string]: string | number } = {
    position: "absolute",
    background,
  };

  if (offsetHeight > 0) {
    lineStyle = {
      ...lineStyle,
      height: `${offsetHeight}px`,
      left: `calc(${((dom.width - 1) / 2).toFixed()}px )`,
      top: `0px`,
      width: `1px`,
    };
  }

  if (offsetWidth > 0) {
    lineStyle = {
      ...lineStyle,
      width: `${offsetWidth}px`,
      top: `calc(${((dom.height - 1) / 2).toFixed()}px )`,
      left: `0px`,
      height: `1px`,
    };
  }
  return toStringByCSSProperties(lineStyle);
}

export function getElementStyle(dom: DOMRect, opts: DropEventOption) {
  const { width, height, background } = opts;
  let cursor = "";
  if (width > 0 && height > 0) {
    cursor = "move";
  } else if (width > 0) {
    cursor = "ew-resize";
  } else if (height > 0) {
    cursor = "ns-resize";
  }

  const style: { [k: string]: string | number } = {
    position: "fixed",
    zIndex: 999,
    cursor,
    top: `${dom.top}px`,
    left: `${dom.left}px`,
    height: `${dom.height}px`,
    width: `${dom.width}px`,
    background,
  };
  return toStringByCSSProperties(style);
}

export function dropSizeEvent(
  event: React.MouseEvent,
  opts: Partial<DropEventOption>,
  callBack?: (e: DropEndProp) => void
) {
  const elementId = `mouse-drop-${new Date().getTime()}`;
  const config = {
    ...init_option,
    ...opts,
  };
  const { width, height } = config;
  const mount = () => {
    const element = document.createElement("div");
    const lineDiv = document.createElement("div");
    element.id = elementId;
    const target = event.target as HTMLDivElement;
    const dom = target.getBoundingClientRect();
    element.setAttribute("style", getElementStyle(dom, config));
    lineDiv.setAttribute("style", getLineStyle(dom, config));
    element.appendChild(lineDiv);
    document.body.appendChild(element);
  };
  // 更新位置
  const update = (e: MouseEvent) => {
    const element = document.getElementById(elementId);
    if (element) {
      if (width > 0 && e.pageX > event.pageX - width) {
        element.style.left = `${e.pageX}px`;
      }
      if (height > 0 && e.pageY > event.pageY - height) {
        element.style.top = `${e.pageY}px`;
      }
    }
  };
  // 结束时 回调
  const end = (e: MouseEvent) => {
    const element = document.getElementById(elementId);
    if (callBack) {
      const { pageX, pageY } = event;
      const w = e.pageX - pageX + width;
      const h = e.pageY - pageY + height;
      callBack({
        width: w,
        height: h,
        x: e.pageX,
        y: e.pageY,
      });
    }
    if (element) {
      document.body.removeChild(element);
    }
    document.removeEventListener("mousemove", update);
    document.removeEventListener("mouseup", end);
  };

  mount();
  document.addEventListener("mousemove", update);
  document.addEventListener("mouseup", end);
}
