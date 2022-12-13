/*
 * Created by zhangq on 2022/10/01
 * PageFooter
 */
import { FC, useContext } from "react";
import styles from "./style.less";
import { useClassNames } from "@/plugins/style";
import { globalContext } from "../index";
import { Dropdown, Icon, Menu } from "@/packages/design";
import { WorkbookType } from "../type";
import { insertSheetWorkbook } from "../../apis";

const cn = useClassNames(styles);
const Footer: FC = () => {
  const contextValue = useContext(globalContext);
  /**
   * @Methods
   */

  function navToWorkbook(id: string) {
    contextValue.onWorkbook(id);
  }

  function createWorkbook(type: WorkbookType) {
    insertSheetWorkbook(contextValue.id, {
      type,
    }).then((res) => {
      contextValue.initWorkbooks();
      navToWorkbook(res.id);
    });
  }

  const overlay = (
    <Menu
      style={{
        minWidth: 185,
      }}
    >
      <Menu.Item
        label={"meta工作表"}
        onClick={() => createWorkbook(WorkbookType.meta)}
      />
      <Menu.Item
        label={`普通工作表`}
        onClick={() => createWorkbook(WorkbookType.common)}
      />
      {/* <Menu.Item
        icon={<Icon name="trash-o" />}
        label={`删除`}
        onClick={() => onAction(ListAction.remove)}
      /> */}
    </Menu>
  );
  /** render */
  return (
    <div className={styles["footer"]}>
      <div className={styles["footer-tabs"]}>
        {contextValue.workbooks.map((ele) => {
          return (
            <div
              onClick={() => navToWorkbook(ele.id)}
              className={cn({
                item: true,
                "item-selected": contextValue.workbookId === ele.id,
              })}
              key={ele.id}
            >
              {ele.name}
            </div>
          );
        })}
        <Dropdown placement="topRight" overlay={overlay}>
          <div className={styles["add"]} key={"add"}>
            <Icon name="plus" size={20} />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Footer;
