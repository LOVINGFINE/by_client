/*
 * Created by zhangq on 2022/11/07
 * style
 */
import { FC, useEffect, useState } from "react";
import styles from "./style.less";
import { getSheetTemplates } from "@/pages/sheet/apis";
import TemplateHot from "./components/Hot";
import { CategoryRecord, TemplateListItem } from "./type";
import CategoryWithRecord from "./components/Category";

const SheetTemplate: FC<SheetTemplateProps> = ({ full, search }) => {
  /** @State */
  const [hotList, setHotList] = useState<TemplateListItem[]>([]);
  const [categories, setCategories] = useState<CategoryRecord[]>([]);

  /** @Effect */
  useEffect(() => {
    getSheetTemplates(search).then((res) => {
      const { hot, categories } = res;
      setHotList(hot);
      setCategories(categories);
    });
  }, [search]);

  /**
   * @Methods
   */

  /** render */
  return (
    <div className={`${styles["template"]} ${styles[`template-${full}`]}`}>
      <TemplateHot dataSource={hotList} full={full} />
      {full && (
        <div className={styles["template-categories"]}>
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
  search: string;
  full: boolean;
}

export default SheetTemplate;
