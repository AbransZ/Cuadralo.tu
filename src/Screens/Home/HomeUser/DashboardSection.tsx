import { Box, Text, VStack, HStack, ScrollView } from "@gluestack-ui/themed";
import { useAppTheme } from "../../../Theme/ThemeManager";
import { useHomeUserViewModel } from "./HomeUserViewModel";

const cardShadow = { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3, elevation: 2 };

export function DashboardSection() {
  const { color } = useAppTheme();
  const viewmodel = useHomeUserViewModel();

  return (
    <ScrollView bg={color.background} flex={1}>
      <VStack space="lg" p="$6">
        {viewmodel.infoAdmin && (
          <Box bg={color.surface} p="$4" borderRadius="$xl" borderWidth={1} borderColor={color.border} style={cardShadow}>
            <Text size="xs" color={color.textSecondary}>Administrador a cargo</Text>
            <Text size="md" fontWeight="$bold" color={color.textPrimary} mt="$1">{viewmodel.infoAdmin.nombre}</Text>
            <Text size="sm" color={color.textSecondary}>@{viewmodel.infoAdmin.usuario} · {viewmodel.infoAdmin.correo}</Text>
          </Box>
        )}

        <Text size="2xl" fontWeight="$bold" color={color.textPrimary}>
          Dashboard
        </Text>

        <HStack space="md">
          <Box
            flex={1}
            bg={color.surface}
            p="$5"
            borderRadius="$xl"
            borderWidth={1}
            borderColor={color.border}
            style={cardShadow}
          >
            <Text size="sm" color={color.textSecondary}>Total Productos</Text>
            <Text size="3xl" fontWeight="$bold" color={color.primary} mt="$2">0</Text>
          </Box>
          <Box
            flex={1}
            bg={color.surface}
            p="$5"
            borderRadius="$xl"
            borderWidth={1}
            borderColor={color.border}
            style={cardShadow}
          >
            <Text size="sm" color={color.textSecondary}>Stock Total</Text>
            <Text size="3xl" fontWeight="$bold" color={color.accent} mt="$2">0</Text>
          </Box>
        </HStack>

        <Box
          bg={color.surface}
          p="$5"
          borderRadius="$xl"
          borderWidth={1}
          borderColor={color.border}
          style={cardShadow}
        >
          <Text size="lg" fontWeight="$bold" color={color.textPrimary} mb="$3">
            Productos con Stock Bajo
          </Text>
          <Text size="sm" color={color.textSecondary}>
            No hay productos con stock bajo
          </Text>
        </Box>
      </VStack>
    </ScrollView>
  );
}
