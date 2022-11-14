import axios from "axios";
import { AxiosResponse, AxiosRequestConfig } from "axios";

export default (
  baseURL: string,
  config: (
    p: AxiosRequestConfig
  ) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
  interceptor: <T>(r: AxiosResponse) => Promise<T>
) => {
  const axiosApp = axios.create({
    baseURL,
  });

  axiosApp.interceptors.request.use(config, (e: unknown) => Promise.reject(e));
  axiosApp.interceptors.response.use(interceptor, (e) =>
    Promise.reject(e?.response?.data || e)
  );
  return async <T>(config: AxiosRequestConfig) => {
    return axiosApp(config)
      .then((res: unknown) => {
        return Promise.resolve(res as T);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};
