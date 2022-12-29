import React from "react";
import { KeyboardType } from "../type";
import platform, { OsType } from "@/tools/platform";

const {
  copy,
  paste,
  paste_cut,
  paste_all,
  paste_cut_all,
  selected_top,
  selected_bottom,
  selected_left,
  selected_right,
  selection_top,
  selection_bottom,
  selection_left,
  selection_right,
} = KeyboardType;

export function keyboardWindowsOs(event: KeyboardEvent | React.KeyboardEvent) {
  const { ctrlKey, key, altKey, shiftKey } = event;
  const keyCode = key.toLowerCase();
  if (ctrlKey) {
    if (keyCode === "v") {
      // 粘贴
      if (altKey && shiftKey) {
        // 粘贴 / 剪切
        return paste_cut_all;
      }
      if (altKey) {
        // 粘贴 / 剪切
        return paste_cut;
      }
      if (shiftKey) {
        // 粘贴 / 样式
        return paste_all;
      }
      return paste;
    }

    if (keyCode === "c") {
      // 拷贝
      return copy;
    }
  }

  if (altKey) {
    if (keyCode === "arrowup") {
      if (shiftKey) {
        return selection_top;
      }
      return selected_top;
    }
    if (keyCode === "arrowdown") {
      if (shiftKey) {
        return selection_bottom;
      }
      return selected_bottom;
    }
    if (keyCode === "arrowleft") {
      if (shiftKey) {
        return selection_left;
      }
      return selected_left;
    }
    if (keyCode === "arrowright") {
      if (shiftKey) {
        return selection_right;
      }
      return selected_right;
    }
  }
}

export function keyboardMacOs(event: KeyboardEvent | React.KeyboardEvent) {
  const { metaKey, key, altKey, shiftKey } = event;
  const keyCode = key.toLowerCase();
  if (metaKey) {
    // 粘贴
    if (keyCode === "v") {
      if (altKey && shiftKey) {
        // 粘贴 / 剪切
        return paste_cut_all;
      }
      if (altKey) {
        // 粘贴 / 剪切
        return paste_cut;
      }
      if (shiftKey) {
        // 粘贴 / 样式
        return paste_all;
      }
      return paste;
    }
    // 拷贝
    if (keyCode === "c") {
      return copy;
    }
  }

  if (altKey) {
    if (keyCode === "arrowup") {
      if (shiftKey) {
        return selection_top;
      }
      return selected_top;
    }
    if (keyCode === "arrowdown") {
      if (shiftKey) {
        return selection_bottom;
      }
      return selected_bottom;
    }
    if (keyCode === "arrowleft") {
      if (shiftKey) {
        return selection_left;
      }
      return selected_left;
    }
    if (keyCode === "arrowright") {
      if (shiftKey) {
        return selection_right;
      }
      return selected_right;
    }
  }
}

export function keyboardEventKey(event: KeyboardEvent | React.KeyboardEvent) {
  let key: KeyboardType | undefined;
  if (platform.os === OsType.MacOS) {
    key = keyboardMacOs(event);
  } else {
    key = keyboardWindowsOs(event);
  }
  if (key) {
    event.preventDefault();
  }
  return key;
}
