/*
 * Created by zhangq on 2022/08/09
 * MetaCell
 */
import { FC, useRef, useState } from "react";
import { Checkbox } from "@/packages/design";
import styles from "./style.less";
import { SimpleValue } from "../../components/VcTable";
import TextInput, { TextInputCore } from "../../components/TextInput";
import SelectOptionsPicker from "../../components/SelectOptions";
import DateTimePicker from "../../components/DateTime";
import { MetaType, MetaColumnWithMetaValue, MetaEntry } from "../type";
import { useClassNames } from "@/packages/design/utils/style";
import QrCodePlayer from "../../components/QrCode";

const cn = useClassNames(styles);

const MetaCell: FC<MetaCellProps> = ({
  value,
  onChange,
  column,
  selected,
  index,
  entry,
}) => {
  const { metaValue } = column;
  const inputRef = useRef<TextInputCore>(null);
  const [numberEdit, setNumberEdit] = useState(false);

  function onValueChange(v: unknown) {
    if (onChange) {
      onChange(metaValue.toValue(v));
    }
  }

  const parseValue = metaValue.getValue(value);
  switch (column.type) {
    case MetaType.Options: {
      return (
        <SelectOptionsPicker
          value={parseValue}
          multiple={metaValue.options.multiple}
          options={metaValue.selects}
          enabled={selected}
          onChange={onValueChange}
        />
      );
    }
    case MetaType.Number: {
      return (
        <TextInput
          style={{
            alignItems: "center",
          }}
          onFocus={() => {
            setNumberEdit(true);
          }}
          onBlur={() => {
            setNumberEdit(false);
          }}
          ref={inputRef}
          value={numberEdit ? value : parseValue}
          onChange={onValueChange}
        />
      );
    }
    case MetaType.Date: {
      return (
        <DateTimePicker
          value={parseValue}
          format={column.meta.date.format}
          enabled={selected}
          onChange={(e) => onValueChange(e.toString())}
        />
      );
    }
    case MetaType.Boolean: {
      const label = metaValue.getBooleanLabel(parseValue);
      return (
        <div
          className={cn({
            boolean: true,
            "boolean-center": !label,
          })}
        >
          <Checkbox onChange={onValueChange} checked={parseValue}>
            {label}
          </Checkbox>
        </div>
      );
    }
    case MetaType.QrCode: {
      return (
        <QrCodePlayer
          size={metaValue.qrCode.size}
          value={parseValue}
          enabled={selected}
          display={metaValue.qrCode.display}
          label={metaValue.getQrCodeLabel(index, entry)}
        />
      );
    }

    default:
      return (
        <TextInput
          style={{
            alignItems: "center",
          }}
          ref={inputRef}
          value={parseValue}
          onChange={onValueChange}
        />
      );
  }
};

/**
 * @interface CellProps
 */
export interface MetaCellProps {
  value: SimpleValue;
  column: MetaColumnWithMetaValue;
  entry: MetaEntry;
  index: number;
  onChange?(e: SimpleValue): void;
  selected: boolean;
}

export default MetaCell;
