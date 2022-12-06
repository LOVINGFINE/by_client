export enum ManageKey {
  information = "information",
  safety = "safety",
}

export interface ManageOption {
  name: ManageKey;
  label: string;
  icon: string;
  description?: string;
}
