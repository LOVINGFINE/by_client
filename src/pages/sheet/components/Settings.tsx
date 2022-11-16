/*
 * Created by zhangq on 2022/11/14
 * UserSheetSettings
 */
import { FC, useEffect } from "react";
import styles from "./style.less";
import { useClassNames } from "@/plugins/style";
import { ControlOption } from "@/layouts/application";
import { SheetUserSettings } from "../type";

const classNames = useClassNames(styles);

const UserSheetSettings: FC<UserSheetSettingsProps> = ({ onSettings }) => {
  /** @State */

  /** @Effect */
  useEffect(() => {}, []);

  /**
   * @Methods
   */
  function onSettingCommon() {
    // 设置配置
    onSettings({
      hideTemplate: false,
    });
  }
  /** render */
  return (
    <>
      <ControlOption
        onAction={onSettingCommon}
        icon={"setting"}
        label={"设置"}
      />
    </>
  );
};

/**
 * @interface props
 */
export interface UserSheetSettingsProps {
  onSettings(p: Partial<SheetUserSettings>): void;
}

export default UserSheetSettings;
