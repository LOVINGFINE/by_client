/*
 * Created by zhangq on 2021/07/01
 * app
 */
import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "@/plugins/router";
import { I18nProvider } from "@/plugins/i18n";
import UserProvider from "@/pages/user/provider";
import routes, { ACCESS_TOKEN_NEGLECT } from "@/config/router";
import i18n from "@/locales";
import "./styles/common.less";

const App: FC = () => {
  /** render */
  return (
    <Router>
      <UserProvider neglect={ACCESS_TOKEN_NEGLECT}>
        <I18nProvider initial={i18n} defaultNs="zh-CN">
          {AppRouter(routes)}
        </I18nProvider>
      </UserProvider>
    </Router>
  );
};

export default App;
