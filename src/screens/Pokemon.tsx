import { usePokemonInfo } from "@/data/usePokemonInfo";
import { PkParamListBase } from "@/utils/types/navigationParams";
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import getTypeColor from "@/utils/pokemonTypeColors";

export default function Pokemon({
  route,
}: StackScreenProps<PkParamListBase, "PokemonStack">) {
  const name = route.params.name;
  const { data, isLoading, isError } = usePokemonInfo(name);
  const backgroundColor = getTypeColor(data?.types.at(0)?.type.name);

  if (isLoading) return <ActivityIndicator />;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ ...styles.bg, backgroundColor }} />
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.order}>
          #{data?.order.toString().padStart(3, "0")}
        </Text>
      </View>
      <Image
        source={{
          uri: data?.sprites.other?.["official-artwork"]?.front_default,
        }}
        style={styles.image}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg: {
    position: "absolute",
    width: "100%",
    height: 400,
    borderBottomEndRadius: 300,
    borderBottomStartRadius: 300,
    transform: [{ scaleX: 2 }],
  },
  header: {
    flex: -1,
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  name: {
    textTransform: "capitalize",
    color: "#fff",
    fontSize: 27,
    fontWeight: "bold",
  },
  order: { color: "#fff", fontWeight: "bold" },
  container: { flex: 1, alignItems: "center", paddingTop: 30 },
  image: {
    width: 250,
    height: 250,
  },
});
