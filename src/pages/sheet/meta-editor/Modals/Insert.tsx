/*
 * Created by zhangq on 2022/08/11
 * 添加数据
 */
import { FC, useState, useEffect } from "react";
import { Modal, Input } from "@/packages/design";
import { FormItem } from "@/packages/design/Form";
import { RadioGroup } from "@/packages/design/Radio";
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
      {/* <FormItem label={"添加模式"}>
        <RadioGroup
          options={config.options}
          onChange={(e) => setPosition(e as PositionMode)}
        />
      </FormItem> */}
      <FormItem label={"添加位置"}>
        <RadioGroup
          options={config.options}
          onChange={(e) => setPosition(e as PositionMode)}
        />
      </FormItem>
      <FormItem label={"添加数量"}>
        <Input
          placeholder={"请输入添加数量"}
          value={count}
          change={(e) => setCount(parseInt(e))}
        />
      </FormItem>
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
