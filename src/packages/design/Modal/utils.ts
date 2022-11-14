import React from "react";
import { createRoot } from "react-dom/client";

export class ModalEvent {
  constructor() {
    this.elementId = `modal-${new Date().getTime()}`;
    const div = document.createElement("div");
    div.id = this.elementId;
    this.element = div;
  }
  elementId: string;
  element: HTMLDivElement;

  setChildrenRef(children: React.ReactElement) {
    const root = createRoot(this.element);
    root.render(children);
  }

  unmount(destroy = false) {
    const is = document.getElementById(this.elementId);
    if (is) {
      if (destroy) {
        document.body.removeChild(is);
      } else {
        is.style.display = "none";
      }
    }
  }

  mount(children: React.ReactElement) {
    const is = document.getElementById(this.elementId);
    if (is) {
      is.style.display = "block";
    } else {
      this.setChildrenRef(children);
      document.body.appendChild(this.element);
    }
  }
}
