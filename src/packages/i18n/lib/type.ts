export interface LocaleOption {
  name: string;
  key: string;
  value: {
    [k: string]: number | string;
  };
}

export interface LocaleListItem {
  name: string;
  key: string;
}

export interface LocaleDataSource {
  [k: string]: number | string;
}

export interface LocaleProps {
  locale: string;
  dataSource: LocaleDataSource;
  options: LocaleListItem[];
  set(k?: string): void;
  t(k: string, n?: { [k: string]: number | string }): number | string;
}
