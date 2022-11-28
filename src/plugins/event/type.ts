export interface DropEventOption {
  offsetHeight: number;
  offsetWidth: number;
  background: string;
  width: number;
  height: number;
}

export interface DropEndProp {
  width: number;
  height: number;
  x: number;
  y: number;
}

export enum KeyboardType {
  copy = "copy",
  paste = "paste",
  paste_control = "paste_control",
  paste_cut = "paste_cut",
  paste_cut_control = "paste_cut_control",
  selected_top = "selected_top",
  selected_bottom = "selected_bottom",
  selected_left = "selected_left",
  selected_right = "selected_right",
  selection_top = "selection_top",
  selection_bottom = "selection_bottom",
  selection_left = "selection_left",
  selection_right = "selection_right",
}
