import { toStringByCSSProperties } from "@/plugins/style";
import React, { CSSProperties } from "react";
import { createRoot } from "react-dom/client";

export function getReactElementOffset(ele: HTMLDivElement) {
  const content = ele.firstElementChild as HTMLElement;
  if (content) {
    return {
      width: content.offsetWidth,
      height: content.offsetHeight,
    };
  }
  return {
    width: 0,
    height: 0,
  };
}

export function getContentStyle(
  event: React.MouseEvent | MouseEvent,
  opts: {
    width: number;
    height: number;
  }
) {
  const { width, height } = opts;
  const style: CSSProperties = {
    borderRadius: "4px",
    boxShadow: "0 2px 6px 2px #ddd",
    background: "#fff",
    position: "fixed",
    zIndex: "999",
  };
  const { pageX, pageY } = event;
  const clientWidth = document.body.clientWidth;
  const clientHeight = document.body.clientHeight;
  style.left = `${pageX}px`;
  style.top = `${pageY}px`;
  if (pageX + width > clientWidth) {
    style.left = `${pageX - width}px`;
  }
  if (pageY + height > clientHeight) {
    style.top = `${pageY - height}px`;
  }
  return toStringByCSSProperties(style);
}

export function mouseEventContent(
  event: React.MouseEvent | MouseEvent,
  children: React.ReactElement
) {
  event.preventDefault();
  const elementId = `mouse-content-${new Date().getTime()}`;
  const element = document.createElement("div");
  element.id = elementId;
  element.addEventListener("contextmenu", (e) => e.stopPropagation());
  element.addEventListener("mouseup", (e) => e.stopPropagation());
  element.addEventListener("mousedown", (e) => e.stopPropagation());
  element.addEventListener("click", (e) => e.stopPropagation());
  // ReactDOM.render(children, element);
  const root = createRoot(element);
  root.render(children);
  const offset = getReactElementOffset(element);
  element.setAttribute("style", getContentStyle(event, offset));
  const unmount = () => {
    const is = document.getElementById(elementId);
    if (is) {
      document.body.removeChild(element);
    }
    window.removeEventListener("contextmenu", unmount);
    window.removeEventListener("mousedown", unmount);
    window.removeEventListener("mouseup", unmount);
    window.removeEventListener("click", unmount);
  };

  document.body.appendChild(element);
  setTimeout(() => {
    window.addEventListener("contextmenu", unmount);
    window.addEventListener("mouseup", unmount);
    window.addEventListener("mousedown", unmount);
    window.addEventListener("click", unmount);
  });
}
