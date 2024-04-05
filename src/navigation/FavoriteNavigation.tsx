import Favorites from "@/screens/Favorites";
import Pokemon from "@/screens/Pokemon";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function FavoriteNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavoritesStack"
        component={Favorites}
        options={{ title: "Favoritos" }}
      />
      <Stack.Screen
        name="PokemonStack"
        component={Pokemon as ({}) => JSX.Element}
        options={{
          title: "",
          headerShown: true,
          headerTransparent: true,
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
