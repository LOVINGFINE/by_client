import { keyboardEventKey, KeyboardType } from "@/plugins/event";
import { Selection } from "@/pages/sheet/editor/type";

export function createKeyboardEvent() {
  let callback: null | ((e: KeyboardType, p?: unknown) => void) = null;
  const listener = (e: KeyboardEvent) => {
    const key = keyboardEventKey(e);
    if (callback && key) {
      callback(key);
    }
  };
  const on = (c: (e: KeyboardType, p?: unknown) => void) => {
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

export function keydownSelected(type: KeyboardType, selection: Selection) {
  const { column, row } = selection;
  const { selected_top, selected_bottom, selected_left, selected_right } =
    KeyboardType;
  const on = (opts: { r: number; c: number }) => {
    const { r, c } = opts;
    return {
      column: {
        current: c,
        start: c,
        end: c,
      },
      row: {
        current: r,
        start: r,
        end: r,
      },
    };
  };
  if (column.current > -1 && row.current > -1) {
    if (type === selected_top && row.current > 0) {
      return on({ r: row.current - 1, c: column.current });
    }
    if (type === selected_bottom) {
      return on({ r: row.current + 1, c: column.current });
    }
    if (type === selected_left && column.current > 0) {
      return on({ r: row.current, c: column.current - 1 });
    }
    if (type === selected_right) {
      return on({ r: row.current, c: column.current + 1 });
    }
  }
}

export function keydownSelection(type: KeyboardType, selection: Selection) {
  const { column, row } = selection;
  const { selection_top, selection_bottom, selection_left, selection_right } =
    KeyboardType;
  const on = (opts: { r: number; c: number }) => {
    const { r, c } = opts;
    const c_s = c >= column.current ? column.current : c;
    const c_e = c >= column.current ? c : column.current;
    const r_s = r >= row.current ? row.current : r;
    const r_e = r >= row.current ? r : row.current;
    return {
      column: {
        current: column.current,
        start: c_s,
        end: c_e,
      },
      row: {
        current: row.current,
        start: r_s,
        end: r_e,
      },
    };
  };
  if (column.current > -1 && row.current > -1) {
    if (type === selection_top && row.end > 0) {
      return on({ r: row.end - 1, c: column.end });
    }
    if (type === selection_bottom) {
      return on({ r: row.end + 1, c: column.end });
    }
    if (type === selection_left && column.end > 0) {
      return on({ r: row.end, c: column.end - 1 });
    }
    if (type === selection_right) {
      return on({ r: row.end, c: column.end + 1 });
    }
  }
}
