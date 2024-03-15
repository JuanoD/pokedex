import Favorites from "@/screens/Favorites";
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
    </Stack.Navigator>
  );
}
