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
import { useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Pokemon({
  route,
  navigation,
}: StackScreenProps<PkParamListBase, "PokemonStack">) {
  const name = route.params.name;
  const { data, isLoading, isError } = usePokemonInfo(name);
  const backgroundColor = getTypeColor(data?.types.at(0)?.type.name);

  //const
  useEffect(
    () =>
      navigation.setOptions({
        headerRight: () => null,
        headerLeft: () => (
          <Icon
            name="arrow-left"
            size={20}
            style={{ paddingLeft: 20 }}
            color="white"
            onPress={() => navigation.goBack()}
          />
        ),
      }),
    [navigation]
  );

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
      <View style={styles.types}>
        {data?.types.map(({ type }) => (
          <Text
            key={type.name}
            style={{ ...styles.pill, backgroundColor: getTypeColor(type.name) }}
          >
            {type.name}
          </Text>
        ))}
      </View>
      <Text style={styles.statsTitle}>Estadísticas Base</Text>
      {data?.stats.map(({ base_stat, stat }) => (
        <View style={styles.stat} key={stat.name}>
          <Text style={styles.statName}>{stat.name}</Text>
          <Text style={styles.statValue}>{base_stat}</Text>
          <View style={styles.barBg}>
            <View
              style={[
                styles.bar,
                {
                  width: `${Math.min(base_stat, 100)}%`,
                  backgroundColor:
                    base_stat > 100
                      ? "red"
                      : base_stat > 50
                      ? "green"
                      : "orange",
                },
              ]}
            />
          </View>
        </View>
      ))}
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
  types: {
    flex: -1,
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    gap: 20,
  },
  pill: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    color: "#fff",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  statsTitle: {
    marginTop: 60,
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  stat: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
  },
  statName: {
    width: 110,
    textTransform: "capitalize",
  },
  statValue: {
    width: 25,
    textAlign: "right",
  },
  barBg: {
    position: "relative",
    flexGrow: 1,
    borderRadius: 5,
    height: 5,
    backgroundColor: "#ccc",
  },
  bar: {
    position: "absolute",
    height: 5,
    borderRadius: 5,
  },
});
