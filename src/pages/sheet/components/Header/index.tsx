/*
 * Created by zhangq on 2022/11/06
 * Header
 */
import React, { FC, Fragment, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./style.less";
import { Button, Icon } from "@/packages/design";

const Header: FC<HeaderProps> = ({ onSearch, isTemplate }) => {
  const navigate = useNavigate();

  /** @State */
  const [search, setSearch] = useState("");

  /**
   * @Methods
   */
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.code === "Enter") {
      onBlur();
    }
  }
  function onBlur() {
    onSearch(search);
  }

  function onClear() {
    setSearch("");
    onSearch("");
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
          <Fragment>
            <Button.Round size="large" onClick={onBackSheetIndex}>
              <Icon name="long-arrow-left" />
            </Button.Round>
            <span>{"模版库"}</span>
          </Fragment>
        )}
      </div>
      <div className={styles["header-search"]}>
        <Icon name="search" className={styles["header-search-icon"]} />
        <input
          type={"text"}
          className={styles["search-input"]}
          placeholder={"请输入关键词"}
          value={search}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onInput={onInput}
        />
        {!!search && (
          <Icon
            onClick={onClear}
            name="times-circle"
            className={styles["header-search-clear"]}
          />
        )}
      </div>
      <div className={styles["header-right"]}></div>
    </div>
  );
};

/**
 * @interface props
 */
export interface HeaderProps {
  onSearch(e: string): void;
  isTemplate: boolean;
}

export default Header;
