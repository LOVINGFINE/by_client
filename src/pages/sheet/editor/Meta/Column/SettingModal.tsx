/*
 * Created by zhangq on 2022/11/07
 * ColumnSettingModal
 */
import { useImperativeHandle, useState, forwardRef } from "react";
import styles from "./style.less";
import MetaTypeEditor from "./components/MetaTypeEditor";
import MetaEditor from "./components/MetaEditor";
import { Input, Modal, Form } from "@/packages/design";
import { MetaType, ColumnPayload, VcColumn, MetaConfig } from "../type";

const ColumnSettingModal = forwardRef<
  ColumnSettingModalRef | null,
  ColumnSettingModalProps
>((props, ref) => {
  const { onOk } = props;

  /** @State */
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState("");
  const [width, setWidth] = useState(0);
  const [title, setTitle] = useState("");
  const [type, setType] = useState(MetaType.Text);
  const [meta, setMeta] = useState<MetaConfig | null>(null);
  /**
   * @Methods
   */
  function onSubmit() {
    onOk(code, {
      width,
      title,
      type,
      meta: meta || {},
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
        <Form.Item label={"数据格式"}>
          <MetaTypeEditor value={type} onChange={setType} />
        </Form.Item>
        <Form.Item label={"标题"}>
          <Input value={title} change={setTitle} placeholder={"请输入标题"} />
        </Form.Item>
        {meta && <MetaEditor onChange={setMeta} meta={meta} type={type} />}
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
