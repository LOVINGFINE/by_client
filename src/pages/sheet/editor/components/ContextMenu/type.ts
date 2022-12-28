export interface ContextMenuOption<K> {
  value: K;
  label: string;
  icon: string;
  suffix?: {
    label?: string;
    icon?: string;
  };
  children?: MenuOptionType<K>[];
  disabled?:boolean;
}

export type MenuOptionType<K> = ContextMenuOption<K> | "driver";
