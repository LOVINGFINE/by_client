/*
 * Created by zhangq on 2022/08/09
 * excel table
 */
import { FC, useEffect, useState } from "react";
import ApplicationLayout from "@/layouts/application";
import PageHeader from "./components/PageHeader";
import UserSheets from "./components/UserSheets";
import SheetTemplate from "./components/Template";
import { useSearchParams } from "react-router-dom";
import UserSheetSettings from "./components/Settings";
import { getUserSheetSettings, updateUserSheetSettings } from "./apis";
import { ListFilter, ListMode, ListSort, SheetUserSettings } from "./type";

const ExcelPage: FC = () => {
  const [query] = useSearchParams();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [userSettings, setUserSettings] = useState<SheetUserSettings>({
    sort: ListSort.openDate,
    filter: ListFilter.none,
    mode: ListMode.list,
    hideTemplate: false,
  });

  const display = (() => {
    if (!!query.get("st")) {
      return "full";
    }
    if (userSettings?.hideTemplate) {
      return "hide";
    }
    return "normal";
  })();

  useEffect(() => {
    getUserSheetSettings()
      .then((res) => {
        setUserSettings(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /** @methods */
  function onHideTemplate() {
    onUserSettings({
      hideTemplate: true,
    });
  }

  function onUserSettings(payload: Partial<SheetUserSettings>) {
    setUserSettings({
      ...userSettings,
      ...payload,
    });
    updateUserSheetSettings(payload);
  }
  /** @render */
  return (
    <ApplicationLayout
      title={"表格"}
      control={display !== "full"}
      settings={<UserSheetSettings onSettings={onUserSettings} />}
      loading={loading}
      header={
        <PageHeader isTemplate={display === "full"} onSearch={setSearch} />
      }
    >
      <SheetTemplate
        onHide={onHideTemplate}
        display={display}
        search={search}
      />
      <UserSheets
        display={display}
        search={search}
        settings={userSettings}
        onSettings={onUserSettings}
      />
    </ApplicationLayout>
  );
};

export default ExcelPage;
