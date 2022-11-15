/*
 * Created by zhangq on 2022/11/06
 * PageHeader
 */
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./style.less";
import { Button, Icon } from "@/packages/design";

const PageHeader: FC<PageHeaderProps> = ({ onSearch, isTemplate }) => {
  const navigate = useNavigate();

  /** @State */
  const [search, setSearch] = useState("");

  /**
   * @Methods
   */
  function onBlur() {
    onSearch(search);
  }

  function onInput(e: React.FormEvent<HTMLInputElement>) {
    const input = e.currentTarget.value || "";
    setSearch(input);
  }

  function onBackSheetIndex() {
    navigate(`/sheets`);
  }
  /** render */
  return (
    <div className={styles["header"]}>
      <div className={styles["header-left"]}>
        {isTemplate && (
          <>
            <Button round size="large" onClick={onBackSheetIndex}>
              <Icon name="long-arrow-left" />
            </Button>
            <span>{"模版库"}</span>
          </>
        )}
      </div>
      <div className={styles["header-search"]}>
        <Icon
          name="search"
          style={{
            color: "#ddd",
            position: "absolute",
            left: 12,
            fontSize: 15,
          }}
        />
        <input
          type={"text"}
          className={styles["search-input"]}
          placeholder={"请输入关键词"}
          value={search}
          onBlur={onBlur}
          onKeyDown={onBlur}
          onInput={onInput}
        />
      </div>
      <div className={styles["header-right"]}></div>
    </div>
  );
};

/**
 * @interface props
 */
export interface PageHeaderProps {
  onSearch(e: string): void;
  isTemplate: boolean;
}

export default PageHeader;
