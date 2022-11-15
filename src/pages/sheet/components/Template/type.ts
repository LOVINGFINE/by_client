export interface TemplateListItem {
  id: string;
  title: string;
  description: string;
  createdTime: string;
  updatedTime: string;
}

export interface categoryItem {
  id: string;
  title: string;
  description: string;
}

export interface CategoryRecord extends categoryItem {
  records: TemplateListItem[];
}
