import userAtom from "@/atoms/userAtom";
import useFavorites from "@/data/favorites";
import { useAtom } from "jotai";
import { View, Text, StyleSheet, Button } from "react-native";

export default function UserData() {
  const [auth, setAuth] = useAtom(userAtom);
  const { data } = useFavorites();

  return (
    <View style={styles.content}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Bienvenido,</Text>
        <Text style={styles.title}>{`${auth!.firstName} ${
          auth!.lastName
        }`}</Text>
      </View>

      <View style={styles.dataContent}>
        <ItemMenu
          title="Nombre"
          text={`${auth!.firstName} ${auth!.lastName}`}
        />
        <ItemMenu title="Username" text={auth!.username} />
        <ItemMenu title="Email" text={auth!.email} />
        <ItemMenu
          title="Total Favoritos"
          text={`${data?.length ?? "..."} Pokèmones`}
        />
      </View>

      <Button title="Desconectarse" onPress={() => setAuth(null)} />
    </View>
  );
}

function ItemMenu({ title, text }: { title: string; text: string }) {
  return (
    <View style={styles.itemMenu}>
      <Text style={styles.itemMenuTitle}>{title}:</Text>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleBlock: {
    marginBottom: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  dataContent: {
    marginBottom: 40,
  },
  itemMenu: {
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#CFCFCF",
  },
  itemMenuTitle: {
    fontWeight: "bold",
    paddingRight: 10,
    width: 120,
  },
});
