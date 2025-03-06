import { IndexRouteObject } from "react-router-dom";

export interface RouteObjectCus extends IndexRouteObject {
  name: string;
}

export interface Resp {
  code: number;
  data: any;
  message: string;
}
