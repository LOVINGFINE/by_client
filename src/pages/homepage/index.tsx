/*
 * Created by zhangq on 2022/10/26
 * homepage
 */
import { FC } from "react";
import styles from "./style.less";
import ApplicationLayout from "@/layouts/application";
import PageHeader from "./components/Header";
import Application from "./components/Application";
import { application_links } from "@/config/application";

const Homepage: FC = () => {
  /** @State */

  /**
   * @Methods
   */

  return (
    <ApplicationLayout
      control={false}
      logo={true}
      loading={false}
      header={<PageHeader />}
    >
      <div className={styles["applications"]}>
        {application_links.map((ele) => {
          return <Application {...ele} key={ele.path} />;
        })}
      </div>
    </ApplicationLayout>
  );
};

export default Homepage;
