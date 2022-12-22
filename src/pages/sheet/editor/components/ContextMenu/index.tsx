import { Icon, Menu } from "@/packages/design";
import { mouseEventContent } from "@/plugins/event";
import React, { forwardRef, Ref, useImperativeHandle } from "react";
import SuffixTip from "./suffix";
import { MenuOptionType } from "./type";

function ContextMenu<K>(
  props: ContextMenuProps<K>,
  ref: Ref<ContextMenuRef | null>
) {
  const { options = [], onAction } = props;
  const overlay = (list?: MenuOptionType<K>[]) => (
    <Menu>
      {(list || options).map((ele, i) => {
        if (ele === "driver") {
          return <Menu.Driver key={`key-${i}`} />;
        }
        if (ele.children) {
          return (
            <Menu.SubItem
              key={`key-${i}`}
              onClick={(e) => onAction(ele.value, e)}
              icon={<Icon name={ele.icon} />}
              label={ele.label}
            >
              {ele.children.map((subItem, j) => {
                if (subItem === "driver") {
                  return <Menu.Driver key={`sub-key-${i}-${j}`} />;
                }
                return (
                  <Menu.Item
                    key={`sub-key-${i}-${j}`}
                    icon={<Icon name={subItem.icon} />}
                    label={subItem.label}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAction(subItem.value, e);
                    }}
                    suffix={
                      subItem.suffix && (
                        <SuffixTip
                          icon={subItem?.suffix.icon}
                          label={subItem.suffix.label}
                        />
                      )
                    }
                  />
                );
              })}
            </Menu.SubItem>
          );
        }
        return (
          <Menu.Item
            key={`key-${i}`}
            icon={<Icon name={ele.icon} />}
            label={ele.label}
            onClick={(e) => onAction(ele.value, e)}
            suffix={
              ele.suffix && (
                <SuffixTip icon={ele?.suffix.icon} label={ele.suffix.label} />
              )
            }
          />
        );
      })}
    </Menu>
  );
  /** @ref */
  useImperativeHandle(
    ref,
    (): ContextMenuRef => ({
      mount: (e: React.MouseEvent, l?: MenuOptionType<K>[]) => {
        e.preventDefault();
        e.stopPropagation();
        mouseEventContent(e, overlay(l));
      },
    }),
    []
  );
  /** render */
  return <></>;
}

interface ContextMenuProps<K> {
  options?: MenuOptionType<K>[];
  onAction(k: K, e: React.MouseEvent): void;
}

export interface ContextMenuRef {
  mount(e: React.MouseEvent, l?: MenuOptionType<unknown>[]): void;
}

export * from "./type";

export default forwardRef(ContextMenu);
