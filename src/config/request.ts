import { axios } from "@/plugins/request";
import { AxiosRequestConfig, AxiosResponse } from "axios";

import { createStorageRef } from "@/plugins/storage";
const accessToken = createStorageRef("access-token");

function beforeRequest(config: AxiosRequestConfig) {
  config.headers["Access-Token"] = accessToken.get();
  return config;
}

function interceptor(res: AxiosResponse) {
  return res.data.data;
}

export default axios("http://127.0.0.1:8080", beforeRequest, interceptor);
