/*
 * Created by zhangq on 2022/10/26
 * homepage
 */
import { FC, useEffect, useState } from "react";
// import styles from "./style.less";
// import { Switch, Spanging } from "@/packages/design";
import ApplicationLayout from "@/layouts/application";
import PageHeader from "./components/Header";
// import { CONTROL_LINKS, ControlLink } from "@/config/application";

const Homepage: FC = () => {
  /** @State */
  const [loading, setLoading] = useState(true);
  /**
   * @Methods
   */

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <ApplicationLayout
      control={false}
      logo={true}
      loading={loading}
      header={<PageHeader />}
    ></ApplicationLayout>
  );
};

export default Homepage;
