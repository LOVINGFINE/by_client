export type ActionOptions<T extends string | number | symbol> = {
  [k in T]: {
    label: string;
    icon?: string;
  };
};
