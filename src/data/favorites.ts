import userAtom from "@/atoms/userAtom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useCallback } from "react";

export default function useFavorites() {
  const auth = useAtomValue(userAtom);
  const user = auth?.username;

  const queryKey = ["favorites", user];
  const query = useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_key, user] }) => {
      const favorites = await AsyncStorage.getItem(`favorites-${user}`);
      return favorites ? (JSON.parse(favorites) as string[]) : [];
    },
    enabled: !!user,
  });

  const client = useQueryClient();

  const addFavorite = useCallback(
    async (pokemon: string) => {
      if (query.isLoading) return;
      const favorites = query.data
        ? (query.data as string[]).concat(pokemon)
        : [pokemon];
      await AsyncStorage.setItem(
        `favorites-${user}`,
        JSON.stringify(favorites)
      );
      client.setQueryData(queryKey, favorites);
    },
    [client, query.data, query.isLoading, queryKey, user]
  );

  const removeFavorite = useCallback(
    async (pokemon: string) => {
      if (query.isLoading || !query.data) return;
      const favorites = query.data.filter((favorite) => favorite !== pokemon);
      await AsyncStorage.setItem(
        `favorites-${user}`,
        JSON.stringify(favorites)
      );
      client.setQueryData(queryKey, favorites);
    },
    [client, query.data, query.isLoading, queryKey, user]
  );

  const isFavorite = useCallback(
    (pokemon: string) => {
      if (query.isLoading || !query.data) return false;
      return query.data.includes(pokemon);
    },
    [query.data, query.isLoading]
  );

  return { ...query, addFavorite, removeFavorite, isFavorite };
}
