import { QueryFunctionContext } from "@tanstack/react-query";
import instance from "./instance";
import { AxiosRequestConfig } from "axios";

export interface QueryContext {
  url: string;
  params?: Record<
    string,
    string | number | boolean | undefined | null | number[] | string[]
  >;
  headers?: AxiosRequestConfig["headers"];
  method?: AxiosRequestConfig["method"];
  data?: unknown;
}

export type qKey = [string, QueryContext];

export const queryFn = async <T>({
  queryKey,
  signal,
}: QueryFunctionContext<qKey>) => {
  const [_key, query] = queryKey;
  const { url, method, headers, data, params } = query;
  const response = await instance<T>({
    url,
    params,
    method,
    headers,
    data,
    signal,
  });

  return response.data;
};
