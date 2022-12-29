/*
 * Created by zhangq on 2022/07/25 13:31
 * app router
 */
import {
  Route,
  Outlet,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";

import { FC, lazy } from "react";
import { RouteProp } from "./type";

function getAppRoutes(routes: RouteProp[]) {
  function renderCurrentRoute(
    path: string,
    opts?: {
      children?: boolean;
      title?: string;
    }
  ) {
    const { children = false, title = "" } = opts || {};
    const LazyElement = lazy(() => {
      document.title = title;
      return import(`@/${path}`);
    });
    if (children) {
      return (
        <LazyElement>
          <Outlet />
        </LazyElement>
      );
    }
    return <LazyElement />;
  }

  function getElements(routes: RouteProp[]) {
    return routes.map((ele, i) => {
      if (ele.routes) {
        return (
          <Route
            id={i + ele.path}
            key={i + ele.path}
            path={ele.path}
            element={renderCurrentRoute(ele.view, {
              children: true,
              title: ele.title,
            })}
          >
            {getElements(ele.routes)}
          </Route>
        );
      }
      return (
        <Route
          id={i + ele.path}
          key={i + ele.path}
          path={ele.path}
          element={renderCurrentRoute(ele.view, {
            title: ele.title,
          })}
        />
      );
    });
  }
  return <Routes>{getElements(routes)}</Routes>;
}

const AppRouter: FC<{ routes: RouteProp[] }> = ({ routes }) => {
  /** @render */
  return <Router>{getAppRoutes(routes)}</Router>;
};

export default AppRouter;
