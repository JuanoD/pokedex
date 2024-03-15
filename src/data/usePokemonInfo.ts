import { QueryContext, qKey, queryFn } from "@/utils/query";
import { useQuery } from "@tanstack/react-query";
import PokemonInfo from "@/data/types/pokemonInfo";
import { AxiosError } from "axios";

export function usePokemonInfo(idOrName: string | number) {
  const query: QueryContext = {
    url: `/pokemon/${idOrName}`,
  };

  const queryKey: qKey = ["pokemonInfo", query];

  return useQuery<PokemonInfo, AxiosError, PokemonInfo, qKey>({
    queryKey,
    queryFn,
  });
}
