import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "./src/Screens/Login/Login";
import { HomeScreen } from "./src/Screens/Home/Home";
import { ProductsScreen } from "./src/Screens/Products/Producst";
import { CreateScreen } from "./src/Screens/Login/Create";
import { ForgotPasswordScreen } from "./src/Screens/Login/ForgotPassword";
import { Header } from "./src/components/Header";
import { VStack } from "@gluestack-ui/themed";

const Stack = createNativeStackNavigator();

function HomeWithHeader() {
  return (
    <VStack flex={1}>
      <Header />
      <HomeScreen />
    </VStack>
  );
}

function ProductsWithHeader() {
  return (
    <VStack flex={1}>
      <Header />
      <ProductsScreen />
    </VStack>
  );
}

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={"Login"} component={LoginScreen} />
          <Stack.Screen name={"Home"} component={HomeWithHeader} />
          <Stack.Screen name={"Products"} component={ProductsWithHeader} />
          <Stack.Screen name={"Create"} component={CreateScreen} />
          <Stack.Screen name={"ForgotPassword"} component={ForgotPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
