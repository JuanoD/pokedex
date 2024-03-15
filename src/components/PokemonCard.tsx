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

export default function PokemonCard({ name }: PokemonListItem) {
  const { data, isLoading, isError } = usePokemonInfo(name);
  if (isLoading || isError) return null;
  const backgroundColor = getTypeColor(data?.types.at(0)?.type.name);
  return (
    <TouchableWithoutFeedback>
      <View style={{ ...styles.card, backgroundColor }}>
        <Text style={styles.number}>
          #{data?.order.toString().padStart(3, "0")}
        </Text>
        <Text style={styles.name}>{name}</Text>
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
    justifyContent: "flex-end",
    backgroundColor: "#a4d1b3",
    width: 100,
    height: 100,
    margin: 8,
    borderRadius: 20,
  },
  number: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "#fff",
    fontSize: 11,
  },
  name: {
    color: "#fff",
    paddingLeft: 10,
    fontSize: 15,
    paddingBottom: 10,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  image: {
    position: "absolute",
    bottom: 2,
    right: 8,
    width: 100,
    height: 100,
  },
});
