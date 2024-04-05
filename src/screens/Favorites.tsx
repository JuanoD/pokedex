import PokemonCard from "@/components/PokemonCard";
import useFavorites from "@/data/favorites";
import { SafeAreaView, FlatList, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAtomValue } from "jotai";
import userAtom from "@/atoms/userAtom";

export default function Favorites() {
  const auth = useAtomValue(userAtom);

  if (auth) return <FavoritesList />;
  else return <NotLogged />;
}

function NotLogged() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.login}>
      <Button
        title="Inicia sesión para ver tus favoritos"
        onPress={() => navigation.navigate("Account" as never)}
      />
    </SafeAreaView>
  );
}

function FavoritesList() {
  const { data } = useFavorites();

  return (
    <SafeAreaView>
      {data && (
        <FlatList
          data={data}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(name) => name}
          renderItem={({ item }) => <PokemonCard name={item} />}
          contentContainerStyle={styles.flatListContentContainer}
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
  login: { marginVertical: 120, marginHorizontal: 20 },
});
