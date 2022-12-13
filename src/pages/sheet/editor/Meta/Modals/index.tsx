/*
 * Created by zhangq on 2022/08/11
 * 添加数据
 */
import { useState, forwardRef, useImperativeHandle } from "react";
import { Modal, Input } from "@/packages/design";
import { Radio, Form } from "@/packages/design";
import { insert_options } from "./final";
import { SimpleValue } from "../../type";
import { MetaColumn } from "../type";
import { RowColumnMode } from "./type";

const InsertModel = forwardRef<InsertModelRef | null, InsertModelProps>(
  (props, ref) => {
    const { addColumns, addEntries } = props;
    const [count, setCount] = useState<string | number>(1);
    const [visible, setVisible] = useState(false);
    const [okLoading, setOkLoading] = useState(false);

    const [mode, setMode] = useState<RowColumnMode>(RowColumnMode.row);

    function onOk() {
      const addNum = isNaN(parseInt(`${count}`)) ? 1 : parseInt(`${count}`);
      if (mode === RowColumnMode.column) {
        // 添加列
        const payload = [];
        for (let i = 0; i < addNum; i++) {
          payload.push({});
        }
        addColumns(payload);
      } else {
        // 添加行
        const payload = [];
        for (let i = 0; i < addNum; i++) {
          payload.push({});
        }
        addEntries(payload);
      }
      setOkLoading(true);
      setTimeout(() => {
        setOkLoading(false);
        setVisible(false);
      }, 500);
    }
    /** @ref */
    useImperativeHandle(
      ref,
      (): InsertModelRef => ({
        mount: (e: RowColumnMode) => {
          setMode(e);
          setVisible(true);
        },
      }),
      []
    );
    /** render */
    return (
      <Modal
        title={"添加"}
        visible={visible}
        onOk={onOk}
        okProps={{
          loading: okLoading,
        }}
        onCancel={() => setVisible(false)}
      >
        <div
          style={{
            padding: "10px 30px 20px",
          }}
        >
          <Form.Item>
            <Radio.Group
              value={mode}
              options={insert_options}
              onChange={(e) => setMode(e as RowColumnMode)}
            />
          </Form.Item>
          <Form.Item label={"添加数量"}>
            <Input
              placeholder={"请输入添加数量"}
              value={count}
              change={(e) => setCount(e)}
            />
          </Form.Item>
        </div>
      </Modal>
    );
  }
);
/**
 * @interface props
 */

export interface InsertModelRef {
  mount(e: RowColumnMode): void;
}

export interface InsertModelProps {
  addColumns(d: Partial<MetaColumn>[]): void;
  addEntries(p: { [k: string]: SimpleValue }[]): void;
}
export * from "./type";

export default InsertModel;
