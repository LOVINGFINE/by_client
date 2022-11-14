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

const ExcelPage: FC = () => {
  const [query] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const isTemplate = (() => {
    return !!query.get("st");
  })();
  /**
   * @Methods
   */

  /**
   * @effect
   */

  /** @render */
  return (
    <ApplicationLayout
      title={"表格"}
      loading={loading}
      control={!isTemplate}
      header={<PageHeader isTemplate={isTemplate} onSearch={setSearch} />}
    >
      <SheetTemplate full={isTemplate} />
      <UserSheets hide={isTemplate} search={search} />
    </ApplicationLayout>
  );
};

export default ExcelPage;
