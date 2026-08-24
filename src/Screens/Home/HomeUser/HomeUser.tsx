import { createDrawerNavigator } from "@react-navigation/drawer";
import { DashboardSection } from "./DashboardSection";
import { ProductsSection } from "./ProductsSection";
import { useAppTheme } from "../../../Theme/ThemeManager";

const Drawer = createDrawerNavigator();

export function HomeUserScreen() {
  const { color } = useAppTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: color.surface, elevation: 2, shadowOpacity: 0.1 },
        headerTintColor: color.textPrimary,
        headerTitleStyle: { fontWeight: "700", fontSize: 18 },
        drawerStyle: { backgroundColor: color.surface, width: 280 },
        drawerLabelStyle: { fontSize: 16, fontWeight: "600", marginLeft: -4 },
        drawerActiveTintColor: color.primary,
        drawerInactiveTintColor: color.textSecondary,
        drawerActiveBackgroundColor: color.primary + "15",
      }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardSection} />
      <Drawer.Screen name="Productos" component={ProductsSection} />
    </Drawer.Navigator>
  );
}
