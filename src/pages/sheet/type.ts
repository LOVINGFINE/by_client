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
  mode: ListMode;
  sort: ListSort;
  filter: ListFilter;
}

export interface Sheet {
  id: string;
  name: string;
  createdTime: string;
  updatedTime: string;
  owner: string;
  share: string[];
}

export interface WorkbookListItem {
  id: string;
  name: string;
  createdTime: string;
  updatedTime: string;
}

export interface SheetListItem {
  id: string;
  name: string;
  createdTime: string;
  updatedTime: string;
  lastOpenTime: string;
  owner: string;
  share: string[];
}

export type updateSizePayload =
  | {
      index: number;
      width: number;
    }
  | { index: number; height: number };
