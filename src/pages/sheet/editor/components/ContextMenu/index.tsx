import { Icon, Menu } from "@/packages/design";
import styles from "./style.less";
import React, {
  CSSProperties,
  forwardRef,
  Ref,
  useImperativeHandle,
  useState,
} from "react";
import SuffixTip from "./suffix";
import { MenuOptionType } from "./type";
import ReactDOM from "react-dom";

function ContextMenu<K>(
  props: ContextMenuProps<K>,
  ref: Ref<ContextMenuRef | null>
) {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<MenuOptionType<K>[]>([]);
  const [renderStyles, setRenderStyles] = useState<CSSProperties>({});

  function onVisible() {
    setTimeout(() => {
      window.addEventListener(
        "mouseup",
        () => {
          setVisible(false);
          setRenderStyles({});
        },
        { once: true }
      );
    }, 200);
    setVisible(true);
  }

  /** @ref */
  useImperativeHandle(
    ref,
    (): ContextMenuRef => ({
      mount: (e: React.MouseEvent, l?: MenuOptionType<K>[]) => {
        e.preventDefault();
        e.stopPropagation();
        if (l) {
          setOptions(l);
        } else {
          setOptions(props.options || []);
        }
        const { pageX, pageY } = e;
        const clientWidth = document.body.clientWidth;
        const clientHeight = document.body.clientHeight;
        setRenderStyles({
          left: pageX,
          top: pageY,
        });
        onVisible();
      },
    }),
    []
  );

  function onAction(k: K, e: React.MouseEvent) {
    props.onAction(k, e);
    setVisible(false);
  }
  /** render */
  return (
    <>
      {visible &&
        ReactDOM.createPortal(
          <div
            style={renderStyles}
            className={styles["contextMenu"]}
            onMouseUp={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <Menu>
              {options.map((ele, i) => {
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
                      disabled={ele.disabled}
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
                            disabled={subItem.disabled}
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
                    disabled={ele.disabled}
                    suffix={
                      ele.suffix && (
                        <SuffixTip
                          icon={ele?.suffix.icon}
                          label={ele.suffix.label}
                        />
                      )
                    }
                  />
                );
              })}
            </Menu>
          </div>,
          document.body
        )}
    </>
  );
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
