/*
 * Created by zhangq on 2022/11/14
 * Settings
 */
import { FC, useEffect, Fragment, useRef } from "react";
import { ControlOption } from "@/layouts/application";
import { SheetUserSettings } from "../../type";
import SettingsModal, { SettingsModalRef } from "./modal";

const Settings: FC<SettingsProps> = ({ onSettings, settings }) => {
  /** @State */
  const settingsModalRef = useRef<SettingsModalRef>(null);
  /** @Effect */
  useEffect(() => {}, []);

  /**
   * @Methods
   */
  function onSettingCommon() {
    // 设置配置
    settingsModalRef.current?.mount(settings);
  }
  /** render */
  return (
    <Fragment>
      <SettingsModal ref={settingsModalRef} onOk={onSettings} />
      <ControlOption
        onAction={onSettingCommon}
        icon={"setting"}
        label={"设置"}
      />
    </Fragment>
  );
};

/**
 * @interface props
 */
export interface SettingsProps {
  settings: SheetUserSettings;
  onSettings(p: Partial<SheetUserSettings>): void;
}

export default Settings;
