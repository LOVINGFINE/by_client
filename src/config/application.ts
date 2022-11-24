export interface ControlLink {
  icon?: string;
  label: string;
  path: string;
}

export const CONTROL_LINKS: ControlLink[] = [
  {
    label: "表格",
    path: "/sheets",
    icon: "file-excel",
  },
];
