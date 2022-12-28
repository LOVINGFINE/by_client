/*
 * Created by zhangq on 2022/04/03
 * QrCodePlayer 组件
 */

import { FC, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import styles from "./style.less";
import { Icon } from "@/packages/design";
import { getStyles } from "./utils";
import { SimpleValue } from "../VcTable";
import ReactDOM from "react-dom";
import { QrCodeDisplayType } from "../../MetaSheet/type";

const QrCodePlayer: FC<QrCodePlayerProps> = ({
  placement = "bottom",
  value,
  enabled = false,
  label = "",
  size,
  display,
}) => {
  const [visible, setVisible] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const renderStyles = getStyles(selectRef.current, placement);

  const open = enabled && display.indexOf("VIEW") === -1;

  const renderElement = (show: boolean) => {
    return (
      <>
        {show && <QRCodeCanvas size={size} value={`${value}`} />}
        {display.indexOf("LABEL") > -1 && (
          <div className={styles["qrCode-label"]}>{label}</div>
        )}
      </>
    );
  };

  /**
   * @method
   */

  function onVisible() {
    if (!visible) {
      setTimeout(() => {
        window.addEventListener("mouseup", () => setVisible(false), {
          once: true,
        });
      });
    }
    setVisible(!visible);
  }

  /** render */
  return (
    <div className={styles["qrCode"]} ref={selectRef}>
      {visible &&
        ReactDOM.createPortal(
          <div className={styles["qrCode-content"]} style={renderStyles}>
            {renderElement(true)}
          </div>,
          document.body
        )}
      {open && (
        <Icon
          onClick={onVisible}
          name="eye"
          className={styles["qrCode-open"]}
        />
      )}

      {renderElement(display.indexOf("VIEW") > -1)}
    </div>
  );
};

export interface QrCodePlayerProps {
  placement?: "bottom" | "top";
  value: SimpleValue;
  display: QrCodeDisplayType;
  label: string;
  size: number;
  enabled?: boolean;
}

export default QrCodePlayer;
