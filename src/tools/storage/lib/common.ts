export function createStorageRef<T>(key: string) {
  const set = (data: T) => {
    window.localStorage.setItem(key, JSON.stringify(data));
  };
  const get = () => {
    const str = window.localStorage.getItem(key) || "";
    try {
      return JSON.parse(str) as T;
    } catch {
      return str as unknown as T;
    }
  };
  return {
    get,
    set,
  };
}
