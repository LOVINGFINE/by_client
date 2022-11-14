export interface RouteProp {
  path: string;
  view: string;
  title?: string;
  routes?: RouteProp[];
}
