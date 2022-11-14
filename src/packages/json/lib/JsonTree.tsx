/*
 * Created by zhangq on 2022/09/05
 *. json tree
 */
import { FC, useEffect, useState } from "react";
import styles from "./style.less";
import ItemView from "./views";
import { JsonItem } from "../type";
import { transformJson, inSelectedKeys, unSelectedKeys } from "./utils";

import jsonMap from "../__test__/dataSource.json";
const JsonTree: FC<JsonTreeProps> = ({}) => {
  /** @State */
  const [dataSource, setDataSource] = useState<JsonItem>();
  const [selects, setSelects] = useState<string[]>([]);
  /** @Effect */
  useEffect(() => {
    setDataSource(transformJson(jsonMap));
  }, []);

  /**
   * @Methods
   */

  function onSelectedNode(item: JsonItem) {
    if (dataSource) {
      if (selects.includes(item.path)) {
        const unKeys = unSelectedKeys(item, selects);
        console.log(unKeys);

        setSelects(unKeys);
      } else {
        const keys = inSelectedKeys(dataSource, item, selects);
        console.log(keys);

        setSelects(keys);
      }
    }
  }

  /** render */
  return (
    <div className={styles["json"]}>
      <div className={styles["json-view"]}>
        {dataSource && (
          <ItemView
            {...dataSource}
            selects={selects}
            onSelect={onSelectedNode}
            label=""
            isRoot={true}
          />
        )}
      </div>
    </div>
  );
};

/**
 * @interface props
 */
export interface JsonTreeProps {}

export default JsonTree;
