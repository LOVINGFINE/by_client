/*
 * Created by zhangq on 2022/10/01
 * PageFooter
 */
import { FC, useEffect, useContext, useState } from "react";
import styles from "./style.less";
import { globalContext, WorkbookOption } from "../index";
import { useClassNames } from "@/plugins/style";
import { Icon } from "@/packages/design";
import { getSheetWorkbooksById, insertSheetWorkbookById } from "../../apis";
import { useSearchParams } from "react-router-dom";
const cn = useClassNames(styles);
const PageFooter: FC = () => {
  const [query] = useSearchParams();
  const global = useContext(globalContext);

  /** @State */
  const [workbooks, setWorkbooks] = useState<WorkbookOption[]>([]);
  /** @Effect */
  useEffect(() => {
    const workbookId = query.get("wid");
    getSheetWorkbooksById(global.id).then((res) => {
      setWorkbooks(res);
      if (!global.workbookId) {
        if (workbookId) {
          onChangeWorkbook(workbookId);
        } else {
          onChangeWorkbook(res[0].id);
        }
      }
    });
  }, [query.get("wid")]);

  /**
   * @Methods
   */

  function insertWorkbook() {
    insertSheetWorkbookById(global.id).then((res) => {
      setWorkbooks([
        ...workbooks,
        {
          updatedTime: res.updatedTime,
          createdTime: res.createdTime,
          id: res.id,
          name: res.name,
        },
      ]);
      onChangeWorkbook(res.id);
    });
  }

  function onChangeWorkbook(id: string) {
    global.changeWorkbook(id);
  }
  /** render */
  return (
    <div className={styles["footer"]}>
      <ul className={styles["footer-tabs"]}>
        {workbooks.map((ele) => {
          return (
            <li
              onClick={() => onChangeWorkbook(ele.id)}
              className={cn({
                item: true,
                "item-selected": global.workbookId === ele.id,
              })}
              key={ele.id}
            >
              {ele.name}
            </li>
          );
        })}
        <li className={styles["add"]} onClick={insertWorkbook} key={"add"}>
          <Icon name="plus" />
        </li>
      </ul>
    </div>
  );
};

export default PageFooter;
