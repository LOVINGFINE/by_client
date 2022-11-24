import { arrayToCsv } from "@/plugins/convert";
import { MetaColumn, WorkbookEntry, MetaClipboard } from "./type";
import { Selection } from "@/pages/sheet/editor/type";

export function onCopyToClipboard(
  columns: MetaColumn[],
  entries: WorkbookEntry[],
  selection: Selection
) {
  const { column, row } = selection;
}

/** 粘贴 */
export function onPasteByClipboard(
  selection: Selection,
  clipboard: MetaClipboard
) {}

/** 清除数据 */
export function getClearBySelection() {}

/** 剪切粘贴 */
export function onCutPasteByClipboard(
  selection: Selection,
  clipboard: MetaClipboard
) {}
