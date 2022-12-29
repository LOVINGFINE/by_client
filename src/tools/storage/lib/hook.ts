import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string) {
  const state = useState<T>(get());

  function set() {
    window.localStorage.setItem(key, JSON.stringify(state[0]));
  }

  function get() {
    const str = window.localStorage.getItem(key) || "";
    try {
      return JSON.parse(str) as T;
    } catch {
      return str as unknown as T;
    }
  }

  useEffect(() => {
    set();
  }, [state[0]]);

  return state;
}
