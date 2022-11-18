/*
 * Created by zhangq on 2022/11/07
 * SettingsModal
 */
import { useImperativeHandle, useState, forwardRef } from "react";
import styles from "./style.less";
import { SheetUserSettings } from "@/pages/sheet/type";
import { Button, Modal, Switch } from "@/packages/design";
import { FormItem } from "@/packages/design/Form";

const SettingsModal = forwardRef<SettingsModalRef | null, SettingsModalProps>(
  (props, ref) => {
    const { onOk } = props;
    /** @State */
    const [visible, setVisible] = useState(false);
    const [hideTemplate, setHideTemplate] = useState(false);

    /**
     * @Methods
     */
    function onSubmit() {
      onOk({
        hideTemplate,
      });
      setVisible(false);
    }

    /** @ref */
    useImperativeHandle(
      ref,
      (): SettingsModalRef => ({
        mount: (e: SheetUserSettings) => {
          setHideTemplate(e.hideTemplate);
          setVisible(true);
        },
      }),
      []
    );
    /** render */
    return (
      <Modal
        visible={visible}
        title={"用户设置"}
        width={620}
        cancelProps={{
          disabled: true,
        }}
        footer={null}
      >
        <div className={styles["form"]}>
          <FormItem label={"在首页隐藏模版库"}>
            <Switch checked={hideTemplate} onChange={setHideTemplate} />
          </FormItem>
          <div className={styles["form-bottom"]}>
            <Button
              type="primary"
              onClick={onSubmit}
              style={{ paddingRight: 25, paddingLeft: 25 }}
            >
              确定
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
);

export interface SettingsModalRef {
  mount(settings: SheetUserSettings): void;
}

/**
 * @interface props
 */
export interface SettingsModalProps {
  onOk(e: Partial<SheetUserSettings>): void;
}

export default SettingsModal;
