import PokemonCard from "@/components/PokemonCard";
import usePokemonList from "@/data/usePokemonList";
import { safeArea } from "@/styles/safeArea";
import { useMemo } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function Pokedex() {
  const { data, isLoading, isError, hasNextPage, isFetching, fetchNextPage } =
    usePokemonList();
  const pokemonList = useMemo(
    () => data?.pages.flatMap((p) => p.results),
    [data]
  );
  return (
    <SafeAreaView style={safeArea.container}>
      {data && (
        <FlatList
          data={pokemonList}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={({ name }) => name}
          renderItem={({ item }) => <PokemonCard {...item} />}
          contentContainerStyle={styles.flatListContentContainer}
          onEndReached={() => hasNextPage && !isFetching && fetchNextPage()}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            isFetching ? (
              <ActivityIndicator size="large" style={styles.spinner} />
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  spinner: { marginTop: 20, marginBottom: 60 },
});
