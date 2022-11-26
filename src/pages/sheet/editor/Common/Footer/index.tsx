/*
 * Created by zhangq on 2022/10/01
 * PageFooter
 */
import { FC, useContext } from "react";
import styles from "./style.less";
import { globalContext } from "../../index";
import { useClassNames } from "@/plugins/style";
import { Icon } from "@/packages/design";
import { editorContext } from "../index";
import { insertCommonWorkbook } from "@/pages/sheet/apis";

const cn = useClassNames(styles);
const Footer: FC = () => {
  const global = useContext(globalContext);
  const contextValue = useContext(editorContext);
  /**
   * @Methods
   */

  function insertWorkbook() {
    insertCommonWorkbook(global.id).then((res) => {
      contextValue.initWorkbooks();
      navToWorkbook(res.id);
    });
  }

  function navToWorkbook(id: string) {
    contextValue.onWorkbook(id);
  }

  /** render */
  return (
    <div className={styles["footer"]}>
      <ul className={styles["footer-tabs"]}>
        {contextValue.workbooks.map((ele) => {
          return (
            <li
              onClick={() => navToWorkbook(ele.id)}
              className={cn({
                item: true,
                "item-selected": contextValue.id === ele.id,
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

export default Footer;
