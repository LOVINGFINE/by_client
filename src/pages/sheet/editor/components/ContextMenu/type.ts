export interface ContextMenuOption<K> {
  value: K;
  label: string;
  icon: string;
  suffix?: {
    label?: string;
    icon?: string;
  };
  children?: MenuOptionType<K>[];
}

export type MenuOptionType<K> = ContextMenuOption<K> | "driver";
