export interface ControlLink {
  icon?: string;
  label: string;
  path: string;
}

export const CONTROL_LINKS: ControlLink[] = [
  {
    label: "表格",
    path: "/sheets",
    icon: "sheet",
  },
  {
    label: "meta · 表格",
    path: "/meta-sheets",
    icon: "meta-sheet",
  },
];
