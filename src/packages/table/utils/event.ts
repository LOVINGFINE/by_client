import { keyboardEvent, KeyboardType } from "@/plugins/event";

export function createKeyboardEvent() {
  let callback: null | ((e: KeyboardType) => void) = null;
  const listener = (e: KeyboardEvent) => {
    const key = keyboardEvent(e);
    if (callback && key) {
      callback(key);
    }
  };
  const on = (c: (e: KeyboardType) => void) => {
    callback = c;
    window.addEventListener("keydown", listener);
  };

  const remove = () => {
    window.removeEventListener("keydown", listener);
    callback = null;
  };

  return {
    on,
    remove,
  };
}
