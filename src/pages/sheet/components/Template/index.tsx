/*
 * Created by zhangq on 2022/11/07
 * style
 */
import { FC, Fragment, useEffect, useState } from "react";
import styles from "./style.less";
import { getSheetTemplates } from "@/pages/sheet/apis";
import Toolbar from "./components/Toolbar";
import TemplateHot from "./components/Hot";
import { CategoryRecord, TemplateListItem } from "./type";
import CategoryWithRecord from "./components/Category";

const SheetTemplate: FC<SheetTemplateProps> = ({ full }) => {
  /** @State */
  const [hotList, setHotList] = useState<TemplateListItem[]>([]);
  const [categories, setCategories] = useState<CategoryRecord[]>([]);

  /** @Effect */
  useEffect(() => {
    getSheetTemplates().then((res) => {
      const { hot, categories } = res;
      setHotList(hot);
      setCategories(categories);
    });
  }, []);

  /**
   * @Methods
   */

  /** render */
  return (
    <div className={`${styles["template"]} ${styles[`template-${full}`]}`}>
      <Toolbar full={full} />
      <TemplateHot dataSource={hotList} />

      {full && (
        <div
          className={`${styles["template-categories"]} ${
            styles[`template-categories-${full}`]
          }`}
        >
          {categories.map((ele) => {
            return <CategoryWithRecord key={ele.id} {...ele} />;
          })}
        </div>
      )}
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
