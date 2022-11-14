/*
 * Created by zhangq on 2022/11/07
 * style
 */
import { FC, useEffect, useState } from "react";
import styles from "./style.less";
import { getSheetTemplates } from "@/pages/sheet/apis";
import Toolbar from "./components/Toolbar";
import TemplateRecommend from "./components/Recommend";
import { TemplateListItem } from "./type";

const SheetTemplate: FC<SheetTemplateProps> = ({ full }) => {
  /** @State */
  const [dataSource, setDataSource] = useState<TemplateListItem[]>([]);
  /** @Effect */
  useEffect(() => {
    getSheetTemplates().then((res) => {
      setDataSource(res);
    });
  }, []);

  /**
   * @Methods
   */

  /** render */
  return (
    <div className={`${styles["template"]} ${styles[`template-${full}`]}`}>
      <Toolbar full={full} />
      <TemplateRecommend dataSource={dataSource} />
    </div>
  );
};

/**
 * @interface props
 */
export interface SheetTemplateProps {
  full: boolean;
}

export default SheetTemplate;
