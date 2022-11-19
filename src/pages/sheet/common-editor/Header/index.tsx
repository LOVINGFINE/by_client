/*
 * Created by zhangq on 2022/10/01
 * SheetHeader
 */
import { FC, useContext, useEffect, useState, useRef, FormEvent } from "react";
import styles from "./style.less";
import { globalContext } from "../index";
import { Icon } from "@/packages/design";
import { useNavigate } from "react-router";
// import { useNavigate } from "react-router";

const SheetHeader: FC = () => {
  const navigate = useNavigate();
  const global = useContext(globalContext);

  const inputRef = useRef<HTMLInputElement>(null);
  const [isRename, setIsRename] = useState(false);

  function onRename() {
    setIsRename(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current?.focus();
        // inputRef.current?.select();
      }
    });
  }

  function onFocus(e: React.BaseSyntheticEvent) {
    setTimeout(() => {
      const rang = window.getSelection();
      rang?.selectAllChildren(e.target);
      rang?.collapseToEnd();
    });
  }

  function onBlur(e: React.BaseSyntheticEvent) {
    const input = e.target?.textContent || "";
    setIsRename(false);
    if (input !== global.name) {
      global.onRename(input);
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      inputRef.current?.blur();
    }
  }

  function onBack() {
    navigate("/sheets");
  }
  /** @render */
  return (
    <div className={styles["header"]}>
      <div onClick={onBack} className={styles["header-logo"]}>
        <Icon name="sheet" size={28} />
      </div>
      <div className={styles["sheetName"]}>
        <span
          ref={inputRef}
          suppressContentEditableWarning
          className={styles["sheetName-name"]}
          contentEditable={isRename}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
        >
          {global.name}
        </span>
        {!isRename && (
          <span className={styles["sheetName-rename"]} onClick={onRename}>
            <Icon name="rename" />
          </span>
        )}
      </div>
    </div>
  );
};

export default SheetHeader;
