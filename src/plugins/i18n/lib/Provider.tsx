import { ReactElement, FC, useEffect, useState } from "react";
import context from "./context";
import { LocaleDataSource, LocaleListItem, LocaleOption } from "./type";
import { getLocaleString } from "./utils";

const Provider: FC<ProviderProps> = ({ initial, defaultNs, children }) => {
  const [dataSource, setDataSource] = useState<LocaleDataSource>({});
  const [locale, setLocale] = useState<string>("");
  const [options, setOptions] = useState<LocaleListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const $t = (k: string, named?: { [k: string]: number | string }) => {
    return getLocaleString(dataSource, k, named);
  };

  function onChange(k?: string) {
    if (k) {
      setLoading(true);
      sessionStorage.setItem("locale", k);
      setLocale(k);
      setDataSource(initial[k].value || {});
      window.i18n = initial[k].value || {};
      setTimeout(() => {
        setLoading(false);
      });
    }
  }

  useEffect(() => {
    window.$t = $t;
  }, []);
  useEffect(() => {
    const list: LocaleListItem[] = [];
    for (const key in initial) {
      list.push({
        key,
        name: initial[key].name,
      });
    }
    const key = sessionStorage.getItem("locale") || defaultNs;
    onChange(key);
    setOptions(list);
  }, [initial, defaultNs]);

  return (
    <context.Provider
      value={{
        set: onChange,
        locale,
        dataSource,
        options,
        t: $t,
      }}
    >
      {!loading && children}
    </context.Provider>
  );
};

export interface ProviderProps {
  children?: ReactElement | ReactElement[] | null;
  initial: { [k: string]: LocaleOption };
  defaultNs: string;
}

export default Provider;
