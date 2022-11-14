export enum ListMode {
  list = "list",
  grid = "grid",
}

export enum ListSort {
  // 最近编辑时间
  editDate = "editDate",
  // 标题
  title = "title",
  openDate = "openDate",
}

export enum ListFilter {
  none = "none",
  createByMe = "createByMe",
  shareToMe = "shareToMe",
}

export type ActionOptions<T extends string | number | symbol> = {
  [k in T]: {
    label: string;
    icon?: string;
  };
};
