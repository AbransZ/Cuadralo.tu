import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "./src/Screens/Login/Login";
import { HomeScreen } from "./src/Screens/Home/Home";
import { ProductsScreen } from "./src/Screens/Products/Producst";
import { CreateScreen } from "./src/Screens/Login/Create";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={"Login"} component={LoginScreen} />
          <Stack.Screen name={"Home"} component={HomeScreen} />
          <Stack.Screen name={"Products"} component={ProductsScreen} />
          <Stack.Screen name={'Create'} component={CreateScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
