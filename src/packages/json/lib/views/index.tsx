/*
 * Created by zhangq on 2022/09/05
 *
 */
import { FC } from "react";
import { JsonItem, JsonType } from "../../type";
import StringItem from "./String";
import NumberItem from "./Number";
import BooleanItem from "./Boolean";
import ObjectItem from "./Object";
import ArrayItem from "./Array";

const ItemView: FC<ItemViewProps> = (props) => {
  /** @State */
  const {
    indentation = 0,
    label,
    value,
    children,
    depth,
    path,
    type,
    isRoot,
    onSelect,
    selects,
  } = props;

  const item: JsonItem = {
    depth,
    children,
    label,
    path,
    value,
    type,
  };
  const selected = selects.includes(path);
  /**
   * @Methods
   */

  switch (type) {
    case JsonType.string:
      return (
        <StringItem
          label={label}
          value={value as string}
          indentation={indentation}
          item={item}
          selected={selected}
          onSelect={onSelect}
        />
      );
    case JsonType.number:
      return (
        <NumberItem
          label={label}
          value={value as number}
          indentation={indentation}
          item={item}
          selected={selected}
          onSelect={onSelect}
        />
      );
    case JsonType.boolean:
      return (
        <BooleanItem
          label={label}
          value={value as boolean}
          indentation={indentation}
          item={item}
          selected={selected}
          onSelect={onSelect}
        />
      );
    case JsonType.object:
      return (
        <ObjectItem
          label={props.label}
          isRoot={props.isRoot}
          paddingLeft={indentation}
          items={props.children}
          item={item}
          selects={selects}
          onSelect={onSelect}
        />
      );

    case JsonType.array:
      return (
        <ArrayItem
          label={label}
          isRoot={isRoot}
          indentation={indentation}
          items={props.children}
          item={item}
          selects={selects}
          onSelect={onSelect}
        />
      );

    default:
      return <div>{props.type}</div>;
  }
};

/**
 * @interface props
 */
export interface ItemViewProps extends JsonItem {
  indentation?: number;
  isRoot?: boolean;
  onSelect(e?: JsonItem): void;
  selects: string[];
}

export default ItemView;
