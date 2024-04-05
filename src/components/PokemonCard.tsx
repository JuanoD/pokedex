import {
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { PokemonListItem } from "@/data/types/pokemonList";
import { usePokemonInfo } from "@/data/usePokemonInfo";
import getTypeColor from "@/utils/pokemonTypeColors";
import { useNavigation } from "@react-navigation/core";

export default function PokemonCard({ name }: PokemonListItem) {
  const navigation = useNavigation();
  const { data, isLoading, isError } = usePokemonInfo(name);
  if (isLoading || isError) return <View style={styles.card} />;
  const backgroundColor = getTypeColor(data?.types.at(0)?.type.name);
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate(...(["PokemonStack", { name }] as never))
      }
    >
      <View style={{ ...styles.card, backgroundColor }}>
        <Text style={styles.number}>
          #{data?.order.toString().padStart(3, "0")}
        </Text>
        <Text style={styles.name}>{data?.name.replace(/-/g, " ")}</Text>
        <Image
          source={{ uri: data?.sprites.front_default }}
          style={styles.image}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#a4d1b3",
    padding: 10,
    width: 100,
    height: 100,
    margin: 8,
    borderRadius: 20,
  },
  number: {
    color: "#fff",
    fontSize: 11,
  },
  name: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    maxWidth: 100,
    textTransform: "capitalize",
  },
  image: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 100,
    height: 100,
  },
});
