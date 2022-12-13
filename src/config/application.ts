export interface ApplicationLink {
  icon?: string;
  label: string;
  path: string;
}

export const application_links: ApplicationLink[] = [
  {
    label: "表格",
    path: "/sheets",
    icon: "sheet",
  },
];
