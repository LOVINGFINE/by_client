/*
 * Created by zhangq on 2022/11/14
 * UserSheetSettings
 */
import { FC, useEffect } from "react";
import styles from "./style.less";
import { useClassNames } from "@/plugins/style";
import { ControlOption } from "@/layouts/application";

const classNames = useClassNames(styles);

const UserSheetSettings: FC<UserSheetSettingsProps> = ({}) => {
  /** @State */

  /** @Effect */
  useEffect(() => {}, []);

  /**
   * @Methods
   */
  function onSettingCommon() {
    // 设置配置
  }
  /** render */
  return (
    <>
      <ControlOption onAction={onSettingCommon} icon={"setting"} label={"设置"} />
    </>
  );
};

/**
 * @interface props
 */
export interface UserSheetSettingsProps {}

export default UserSheetSettings;
