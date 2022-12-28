/*
 * Created by zhangq on 2022/11/28
 * Meta Editor
 */
import { FC, Fragment } from "react";
import styles from "../../style.less";
import { MetaQrCode } from "../../../type";
import { Popover, Form, Icon, Input } from "@/packages/design";
import QrCodeDisplayEditor from "../components/QrCodeDisplayEditor";

const MetaQrCodeForm: FC<MetaQrCodeFormProps> = ({ value, onChange }) => {
  /**
   * @Methods
   */
  function onValueChange(v: Partial<MetaQrCode>) {
    onChange({
      ...value,
      ...v,
    });
  }
  return (
    <Fragment>
      <Form.Item label={"类型"}>
        <QrCodeDisplayEditor
          value={value.display}
          onChange={(e) => {
            onValueChange({
              display: e,
            });
          }}
        />
      </Form.Item>
      <Form.Item label={"大小"}>
        <Input.Number
          value={value.size}
          change={(e) => {
            const v = parseInt(`${e}`);
            onValueChange({
              size: isNaN(v) ? undefined : v,
            });
          }}
          placeholder="请输入二维码展示大小"
        />
      </Form.Item>
      <Form.Item
        label={
          <>
            <span>文本</span>
            <Popover
              placement="top"
              overlay={
                <div className={styles["qrCode-var"]}>
                  <h3>使用变量</h3>
                  <p>格式: {`{{变量名}}`}</p>
                  <p>当前单元格的值: {`{{current}}`}</p>
                  <p>
                    同一行其他单元格的值: {`{{列code}}`}, 如{`{{AA1}}`}
                  </p>
                  <p>当前行的序号: {`{{index}}`}</p>
                </div>
              }
            >
              <Icon
                name="info-circle"
                style={{
                  fontSize: 16,
                  marginLeft: 8,
                  cursor: "pointer",
                }}
              />
            </Popover>
          </>
        }
      >
        <Input
          value={value.text}
          change={(e) => {
            onValueChange({
              text: e,
            });
          }}
          placeholder="请输入展示文本"
        />
      </Form.Item>
    </Fragment>
  );
};

/**
 * @interface props
 */
export interface MetaQrCodeFormProps {
  value: MetaQrCode;
  onChange(e: MetaQrCode): void;
}

export default MetaQrCodeForm;
