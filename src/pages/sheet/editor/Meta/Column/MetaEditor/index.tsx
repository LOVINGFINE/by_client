/*
 * Created by zhangq on 2022/11/28
 * Meta Editor
 */
import { FC } from "react";
import { MetaConfig, MetaType } from "../../type";
import {
  MetaNumberForm,
  MetaBooleanForm,
  MetaDateForm,
  MetaQrCodeForm,
  MetaOptionsForm,
} from "./modules";

const MetaEditor: FC<MetaEditorProps> = ({ type, meta, onChange }) => {
  /**
   * @Methods
   */

  function onValueChange(v: Partial<MetaConfig>) {
    onChange({
      ...meta,
      ...v,
    });
  }
  switch (type) {
    case MetaType.Number:
      return (
        <MetaNumberForm
          value={meta.number}
          onChange={(v) => {
            onValueChange({
              number: v,
            });
          }}
        />
      );
    case MetaType.Boolean:
      return (
        <MetaBooleanForm
          value={meta.boolean}
          onChange={(v) => {
            onValueChange({
              boolean: v,
            });
          }}
        />
      );
    case MetaType.Date:
      return (
        <MetaDateForm
          value={meta.date}
          onChange={(v) => {
            onValueChange({
              date: v,
            });
          }}
        />
      );
    case MetaType.QrCode:
      return (
        <MetaQrCodeForm
          value={meta.qrCode}
          onChange={(v) => {
            onValueChange({
              qrCode: v,
            });
          }}
        />
      );
    case MetaType.Options:
      return (
        <MetaOptionsForm
          value={meta.options}
          onChange={(v) => {
            onValueChange({
              options: v,
            });
          }}
        />
      );
    default:
      return <></>;
  }
};

/**
 * @interface props
 */
export interface MetaEditorProps {
  type: MetaType;
  meta: MetaConfig;
  onChange(e: MetaConfig): void;
}

export default MetaEditor;
