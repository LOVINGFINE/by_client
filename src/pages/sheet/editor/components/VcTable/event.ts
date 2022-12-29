import { keyboardEventKey, KeyboardType } from "@/tools/event";
import { Selection } from "./type";

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
    window.removeEventListener("keydown", listener);
    setTimeout(() => {
      window.addEventListener("keydown", listener);
    });
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
  const on = (opts: { r?: number; c?: number }) => {
    const { r, c } = opts;
    const c_c = c === undefined ? column.current : c;
    const r_c = r === undefined ? row.current : r;
    return {
      column: {
        current: c_c,
        start: c_c,
        end: c_c,
      },
      row: {
        current: r_c,
        start: r_c,
        end: r_c,
      },
    };
  };
  if (column.current > -1 && row.current > -1) {
    if (type === selected_top && row.current > 0) {
      return on({ r: row.current - 1 });
    }
    if (type === selected_bottom) {
      return on({ r: row.current + 1 });
    }
    if (type === selected_left && column.current > 0) {
      return on({ c: column.current - 1 });
    }
    if (type === selected_right) {
      return on({ c: column.current + 1 });
    }
  }
}

export function keydownSelection(type: KeyboardType, selection: Selection) {
  const { column, row } = selection;
  const { selection_top, selection_bottom, selection_left, selection_right } =
    KeyboardType;
  const on = (opts: { r?: number; c?: number }) => {
    const { r, c } = opts;
    let c_s = column.start;
    let c_e = column.end;
    let r_s = row.start;
    let r_e = row.end;
    if (c != undefined) {
      c_s = c > column.current ? column.current : c;
      c_e = c > column.current ? c : column.current;
    }
    if (r != undefined) {
      r_s = r >= row.current ? row.current : r;
      r_e = r >= row.current ? r : row.current;
    }
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
    if (type === selection_top && row.start > 0) {
      if (row.end - 1 >= row.current) {
        return on({ r: row.end - 1 });
      }
      return on({ r: row.start - 1 });
    }
    if (type === selection_bottom) {
      if (row.start + 1 <= row.current) {
        return on({ r: row.start + 1 });
      }
      return on({ r: row.end + 1 });
    }
    if (type === selection_left && column.start > 0) {
      if (column.end - 1 >= column.current) {
        return on({ c: column.end - 1 });
      }
      return on({ c: column.start - 1 });
    }
    if (type === selection_right) {
      if (column.start + 1 <= column.current) {
        return on({ c: column.start + 1 });
      }
      return on({ c: column.end + 1 });
    }
  }
}
