/*
 * Created by zhangq on 2022/12/11
 * ActiveHistoryCard
 */
import { FC, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Icon } from "@/packages/design";
import styles from "./style.less";
import { ActiveHistory, ActiveType } from "../../type";
import { getActiveHistory } from "../../apis";

const ActiveHistoryCard: FC = () => {
  /** @State */
  const [dataSource, setDataSource] = useState<ActiveHistory[]>([]);
  /** @Effect */
  useEffect(() => {
    getActiveHistory().then((res) => {
      setDataSource(res);
    });
  }, []);

  const getLabel = (ele: ActiveHistory) => {
    if (ele.type === ActiveType.signIn) {
      const { device } = ele.platform;
      return `在 ${device.type} 设备上有新的的登录活动`;
    }
    return "未知活动";
  };

  const getTime = (ele: ActiveHistory) => {
    return dayjs(ele.date).format("MM月DD日 hh:mm");
  };
  /**
   * @Methods
   */
  function onItemActive(ele: ActiveHistory) {
    console.log(ele);
  }
  /** render */
  return (
    <div className={styles["activeHistoryCard"]}>
      <div className={styles["activeHistoryCard-title"]}>{"安全活动记录"}</div>
      {dataSource.map((ele) => {
        return (
          <div
            className={styles["item"]}
            onClick={() => onItemActive(ele)}
            key={ele.id}
          >
            <div className={styles["item-label"]}>{getLabel(ele)}</div>
            <div className={styles["item-time"]}>{getTime(ele)}</div>
            <Icon
              name="angle-right"
              size={20}
              style={{
                color: "var(--d-desc)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ActiveHistoryCard;
