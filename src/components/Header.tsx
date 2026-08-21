import { HStack, Text, Button } from "@gluestack-ui/themed";
import { useAppTheme } from "../Theme/ThemeManager";

export function Header() {
  const { color, isDark, onthemeChange } = useAppTheme();

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
    </HStack>
  );
}
