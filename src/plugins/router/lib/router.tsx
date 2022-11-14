/*
 * Created by zhangq on 2022/07/25 13:31
 * app router
 */
import { Route, Outlet, Routes } from "react-router-dom";
import { lazy } from "react";
import { RouteProp } from "./type";

export function AppRouter(routes: RouteProp[]) {
  function renderCurrentRoute(path: string, children?: boolean) {
    const LazyElement = lazy(() => import(`@/${path}`));
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
            key={i + ele.path}
            path={ele.path}
            element={renderCurrentRoute(ele.view, true)}
          >
            {getElements(ele.routes)}
          </Route>
        );
      }
      return (
        <Route
          index={i === 0}
          key={i + ele.path}
          path={ele.path}
          element={renderCurrentRoute(ele.view)}
        />
      );
    });
  }
  return <Routes>{getElements(routes)}</Routes>;
}
