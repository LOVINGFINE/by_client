/*
 * Created by zhangq on 2021/07/01
 * app
 */
import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "@/plugins/router";
import { LocaleProvider } from "@/plugins/i18n";
import UserProvider from "@/pages/user/provider";
import routes, { ACCESS_TOKEN_NEGLECT } from "@/config/router";
import i18n from "@/locales";
import "./styles/common.less";

const App: FC = () => {
  /** render */
  return (
    <Router>
      <UserProvider neglect={ACCESS_TOKEN_NEGLECT}>
        <LocaleProvider initial={i18n} defaultNs="zh-CN">
          {AppRouter(routes)}
        </LocaleProvider>
      </UserProvider>
    </Router>
  );
};

export default App;
