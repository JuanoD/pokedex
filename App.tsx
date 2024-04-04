import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "@/navigation/Tab";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  let children = (
    <NavigationContainer>
      <TabNavigation />
      <StatusBar style="auto" />
    </NavigationContainer>
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
