/*
 * Created by zhangq on 2022/11/07
 * ColumnSettingModal
 */
import { useImperativeHandle, useState, forwardRef } from "react";
import styles from "../style.less";
import MetaEditor from "./Meta";
import { Icon, Input, Modal } from "@/packages/design";
import { FormItem } from "@/packages/design/Form";
import { MetaType, ColumnPayload, VcColumn, MetaConfig } from "../../type";
import { meta_config } from "../../final";
import { useClassNames } from "@/plugins/style";

const cn = useClassNames(styles);
const ColumnSettingModal = forwardRef<
  ColumnSettingModalRef | null,
  ColumnSettingModalProps
>((props, ref) => {
  const { onOk } = props;
  const type_options = (() => {
    const list = [];
    for (const key in meta_config) {
      const value = key as MetaType;
      list.push({
        value,
        ...meta_config[value],
      });
    }
    return list;
  })();
  /** @State */
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState("");
  const [width, setWidth] = useState(0);
  const [title, setTitle] = useState("");
  const [type, setType] = useState(MetaType.Text);
  const [meta, setMeta] = useState<Partial<MetaConfig>>({});
  /**
   * @Methods
   */
  function onSubmit() {
    onOk(code, {
      width,
      title,
      type,
      meta,
    });
    setVisible(false);
  }

  /** @ref */
  useImperativeHandle(
    ref,
    (): ColumnSettingModalRef => ({
      mount: (e: VcColumn) => {
        setCode(e.code);
        setTitle(e.title);
        setType(e.type);
        setWidth(e.width);
        setVisible(true);
        setMeta(e.meta);
      },
    }),
    []
  );
  /** render */
  return (
    <Modal
      visible={visible}
      onOk={onSubmit}
      onCancel={() => setVisible(false)}
      title={`表格列设置 "${code}"`}
      width={520}
    >
      <div className={styles["setting"]}>
        <FormItem label={"标题"}>
          <Input value={title} change={setTitle} placeholder={"请输入标题"} />
        </FormItem>
        <FormItem label={"数据格式"}>
          <div className={styles["metaType"]}>
            {type_options.map((ele) => {
              return (
                <div
                  key={ele.value}
                  className={cn({
                    "metaType-item": true,
                    "metaType-item-selected": type === ele.value,
                  })}
                  onClick={() => setType(ele.value)}
                >
                  <Icon name={ele.icon} />
                </div>
              );
            })}
          </div>
        </FormItem>
        <MetaEditor type={type} />
      </div>
    </Modal>
  );
});

export interface ColumnSettingModalRef {
  mount(settings: VcColumn): void;
}

/**
 * @interface props
 */
export interface ColumnSettingModalProps {
  onOk(code: string, e: ColumnPayload): void;
}

export default ColumnSettingModal;
