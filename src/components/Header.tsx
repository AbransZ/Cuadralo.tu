import { HStack, Text, Button } from "@gluestack-ui/themed";
import { useAppTheme } from "../Theme/ThemeManager";
import { useAuthStore } from "../Store/AuthStore";

export function Header() {
  const { color, isDark, onthemeChange } = useAppTheme();
  const user = useAuthStore((authState) => authState.user);
  const logout = useAuthStore((authState) => authState.logout);

  return (
    <HStack
      bg={color.surface}
      px="$4"
      py="$3"
      alignItems="center"
      justifyContent="space-between"
      borderBottomWidth={1}
      borderBottomColor={color.border}
    >
      <Text size="xl" fontWeight="$bold" color={color.primary}>
        Cuadralo.tu
      </Text>
      <HStack space="md" alignItems="center">
        <Text size="md" color={color.textPrimary}>
          {user?.nombre || "Usuario"}
        </Text>
        <Button
          variant="outline"
          size="sm"
          borderColor={color.border}
          bg="transparent"
          onPress={onthemeChange}
        >
          <Text size="lg" color={color.textPrimary}>
            {isDark ? "\u2600\uFE0F" : "\uD83C\uDF19"}
          </Text>
        </Button>
        <Button
          variant="outline"
          size="sm"
          borderColor={color.border}
          bg="transparent"
          onPress={logout}
        >
          <Text size="sm" color={color.textPrimary}>
            Salir
          </Text>
        </Button>
      </HStack>
    </HStack>
  );
}
