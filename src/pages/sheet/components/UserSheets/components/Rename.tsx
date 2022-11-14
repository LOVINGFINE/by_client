/*
 * Created by zhangq on 2022/11/07
 * sheet list
 */
import {
  FC,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
  forwardRef,
} from "react";
import styles from "../style.less";
import { SheetListItem } from "@/pages/sheet/editor";
import { Input, Modal } from "@/packages/design";
import { InputRef } from "@/packages/design/Input";
import { updateUserSheetName } from "@/pages/sheet/apis";

const RenameModal = forwardRef<RenameModalRef | null, RenameModalProps>(
  (props, ref) => {
    const { onOk } = props;
    /** @State */
    const inputRef = useRef<InputRef>(null);
    const [visible, setVisible] = useState(false);
    const [dataSource, setDataSource] = useState<null | SheetListItem>(null);
    const [loading, setLoading] = useState(false);
    const [rename, setRename] = useState("");

    const okDisable = !(rename && dataSource && dataSource.name !== rename);

    /**
     * @Methods
     */
    function onSubmit() {
      if (dataSource && dataSource.id) {
        setLoading(true);
        updateUserSheetName(dataSource?.id, rename)
          .then((res) => {
            onOk(res);
            setVisible(false);
            setDataSource(null);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }

    useEffect(() => {
      if (visible) {
        if (dataSource && dataSource.name !== rename) {
          setRename(dataSource.name);
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current?.focus();
              inputRef.current?.select();
            }
          });
        }
      }
    }, [visible]);

    /** @ref */
    useImperativeHandle(
      ref,
      (): RenameModalRef => ({
        focus: (e: SheetListItem) => {
          setDataSource(e);
          setVisible(true);
        },
      }),
      []
    );
    /** render */
    return (
      <Modal
        visible={visible}
        title={"修改表格标题"}
        onCancel={() => setVisible(false)}
        onOk={onSubmit}
        okProps={{ loading, disabled: okDisable }}
      >
        <div className={styles["rename-form"]}>
          <Input
            ref={inputRef}
            value={rename}
            change={setRename}
            placeholder={"请输入表格标题"}
          />
        </div>
      </Modal>
    );
  }
);

export interface RenameModalRef {
  focus(e: SheetListItem): void;
}

/**
 * @interface props
 */
export interface RenameModalProps {
  onOk(e: SheetListItem): void;
}

export default RenameModal;
