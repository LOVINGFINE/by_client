/** @api */
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

export interface SheetUserSettings {
  hideTemplate: boolean;
  defaultTitle: string;
  mode: ListMode;
  sort: ListSort;
  filter: ListFilter;
}

export interface Sheet {
  id: string;
  name: string;
  createdTime: string;
  updatedTime: string;
  lastOpenTime: string;
  owner: string;
  share: string[];
}
