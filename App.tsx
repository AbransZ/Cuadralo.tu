import { useEffect } from "react";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider, VStack } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginScreen } from "./src/Screens/Login/Login";
import { HomeUserScreen } from "./src/Screens/Home/HomeUser/HomeUser";
import { HomeAdminScreen } from "./src/Screens/Home/HomeAdmin/HomeAdmin";
import { CreateScreen } from "./src/Screens/Login/Create";
import { ForgotPasswordScreen } from "./src/Screens/Login/ForgotPassword";
import { Header } from "./src/components/Header";
import { useAuthStore } from "./src/Store/AuthStore";
import { useAppTheme } from "./src/Theme/ThemeManager";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

function HomeUserWithHeader() {
  const { color } = useAppTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.surface }} edges={["top"]}>
      <VStack flex={1}>
        <Header />
        <HomeUserScreen />
      </VStack>
    </SafeAreaView>
  );
}

function HomeAdminWithHeader() {
  const { color } = useAppTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.surface }} edges={["top"]}>
      <VStack flex={1}>
        <Header />
        <HomeAdminScreen />
      </VStack>
    </SafeAreaView>
  );
}

export default function App() {
  const isAuthenticated = useAuthStore((authState) => authState.isAuthenticated);
  const user = useAuthStore((authState) => authState.user);
  const checkAuth = useAuthStore((authState) => authState.checkAuth);
  const loadTheme = useAppTheme((themeState) => themeState.loadTheme);

  useEffect(() => {
    checkAuth();
    loadTheme();
  }, []);

  return (
    <SafeAreaProvider>
       <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            user?.nivelUsuario === 1 ? (
              <Stack.Screen name={"HomeAdmin"} component={HomeAdminWithHeader} />
            ) : (
              <Stack.Screen name={"HomeUser"} component={HomeUserWithHeader} />
            )
          ) : (
            <>
              <Stack.Screen name={"Login"} component={LoginScreen} />
              <Stack.Screen name={"Create"} component={CreateScreen} />
              <Stack.Screen name={"ForgotPassword"} component={ForgotPasswordScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
    </SafeAreaProvider>
   
  );
}
