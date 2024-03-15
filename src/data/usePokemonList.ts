import {
  InfiniteData,
  QueryFunctionContext,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { QueryContext, qKey } from "@/utils/query";
import instance from "@/utils/instance";
import { AxiosError } from "axios";
import { PaginatedPokemonList } from "@/data/types/pokemonList";


async function queryFn<T = unknown>({
  queryKey,
  pageParam,
  signal,
}: QueryFunctionContext<qKey, number>) {
  const [_key, query] = queryKey;
  const { url, params, headers, method } = query;
  const limit = Number(params?.["limit"]) || 20;

  return (
    await instance<T>({
      url,
      headers,
      method,
      params: { ...params, limit, offset: limit * pageParam },
      signal,
    })
  ).data;
}

export default function usePokemonList() {
  const query: QueryContext = {
    url: "/pokemon",
    params: { limit: 20 },
  };

  return useInfiniteQuery<
    PaginatedPokemonList,
    AxiosError,
    InfiniteData<PaginatedPokemonList>,
    qKey,
    number
  >({
    queryKey: ["pokemonList", query] as qKey,
    queryFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) =>
      lastPage.next ? lastPageParam + 1 : null,
  });
}
