/*
 * Created by zhangq on 2022/08/11
 * 添加数据
 */
import { FC, useState, useEffect } from "react";
import { Modal, Input } from "@/packages/design";
import { Radio,Form } from "@/packages/design";
// import styles from "./style.less";

import { INSERT_CONFIG } from "./final";

export enum RowColumnMode {
  column = "column",
  row = "row",
}

export enum PositionMode {
  forward = "forward",
  back = "back",
}

const InsertModel: FC<InsertModelProps> = ({ close, ok, type }) => {
  const [count, setCount] = useState(1);
  const [mode, setMode] = useState<RowColumnMode>(type);
  const [position, setPosition] = useState<PositionMode>(PositionMode.back);

  const config = INSERT_CONFIG[mode];

  useEffect(() => {
    setMode(type);
  }, [type]);

  function onOk() {
    const payload = {
      count,
      mode,
      position,
    };
    ok(payload);
  }

  /** render */
  return (
    <Modal title={config.title} onOk={onOk} onCancel={close}>
      <Form.Item label={"添加模式"}>
        <Radio.Group
          options={config.options}
          onChange={(e) => setPosition(e as PositionMode)}
        />
      </Form.Item>
      <Form.Item label={"添加位置"}>
        <Radio.Group
          options={config.options}
          onChange={(e) => setPosition(e as PositionMode)}
        />
      </Form.Item>
      <Form.Item label={"添加数量"}>
        <Input
          placeholder={"请输入添加数量"}
          value={count}
          change={(e) => setCount(parseInt(e))}
        />
      </Form.Item>
    </Modal>
  );
};

/**
 * @interface props
 */

export interface InsertModelProps {
  type: RowColumnMode;
  close(): void;
  ok(opts: unknown): void;
}

export default InsertModel;
