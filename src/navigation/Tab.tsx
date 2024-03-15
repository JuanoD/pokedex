import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Account from "@/navigation/AccountNavigation";
import Pokedex from "@/navigation/PokedexNavigation";
import Favorite from "@/navigation/FavoriteNavigation";

const Tabs = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tabs.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Pokedex"
    >
      <Tabs.Screen
        name="Favorites"
        component={Favorite}
        options={{
          tabBarLabel: "Favoritos",
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Pokedex"
        component={Pokedex}
        options={{ tabBarLabel: "", tabBarIcon: () => <Pokeball /> }}
      />
      <Tabs.Screen
        name="Home"
        component={Account}
        options={{
          tabBarLabel: "Cuenta",
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

function Pokeball() {
  return (
    <Image
      source={require("@/assets/pokeball.png")}
      style={{ width: 75, height: 75, top: -15 }}
    />
  );
}
