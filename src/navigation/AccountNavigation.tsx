import Account from "@/screens/Account";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function FavoriteNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AccountStack"
        component={Account}
        options={{ title: "Cuenta" }}
      />
    </Stack.Navigator>
  );
}
