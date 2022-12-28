import { FC } from "react";
import styles from "./style.less";
import ShowRowCount from "./components/ShowRowCount";
import { MetaConfigure } from "../type";

const Toolbar: FC<ToolbarProps> = ({ configure, onConfigure }) => {
  /**
   * @Methods
   */
  function showRowChange(bol: boolean) {
    onConfigure({
      showRowCount: bol,
    });
  }
  /** render */
  return (
    <div className={styles["toolbar"]} onMouseDown={(e) => e.stopPropagation()}>
      <div className={styles["toolbar-left"]}></div>
      <div className={styles["toolbar-right"]}>
        <ShowRowCount value={configure.showRowCount} onChange={showRowChange} />
      </div>
    </div>
  );
};

export interface ToolbarProps {
  configure: MetaConfigure;
  onConfigure(e: Partial<MetaConfigure>): void;
}
export default Toolbar;
