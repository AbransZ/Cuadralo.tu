import {
  Box,
  Button,
  ButtonText,
  Center,
  HStack,
  Image,
  Input,
  InputField,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../../Theme/ThemeManager";
import { useForgotPasswordViewModel } from "./ForgotPasswordViewModel";

export function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const { color } = useAppTheme();
  const { width } = useWindowDimensions();
  const isWideScreen = width >= 768;
  const viewmodel = useForgotPasswordViewModel();

  const handleSubmit = async () => {
    await viewmodel.submit();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.background }}>
      <HStack
        flex={1}
        bg={color.background}
        flexDirection={isWideScreen ? "row" : "column"}
      >
      <Box flex={2} p={isWideScreen ? "$20" : "$6"} alignItems="center" justifyContent="center">
        <Image
          source={require("../../sources/Images/Gemini_Generated_Image_qpeg91qpeg91qpeg.png")}
          alt="Presentacion de Cuadralo"
          resizeMode="cover"
          w="85%"
          h="85%"
          borderRadius={20}
        />
      </Box>

      <Center flex={3} bg={color.background}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          showsVerticalScrollIndicator={false}
          w="$full"
        >
          <Box
            p="$4"
            mx={isWideScreen ? "$8" : "$6"}
            my={isWideScreen ? "$0" : "$6"}
            maxWidth={isWideScreen ? "$96" : undefined}
            alignSelf="center"
            bg={color.surface}
            borderRadius="$xl"
            borderWidth={1}
            borderColor={color.border}
          >
            <VStack space="md" py="$6" px="$2">
              <VStack space="xs" mb="$2">
                <Text
                  size="4xl"
                  fontWeight="$bold"
                  color={color.textPrimary}
                  textAlign="center"
                >
                  Recuperar contrasena
                </Text>
                <Text
                  size="lg"
                  color={color.textSecondary}
                  textAlign="center"
                >
                  Introduce tu correo y te enviaremos instrucciones para recuperar tu cuenta
                </Text>
              </VStack>

              {viewmodel.error && (
                <Text color="#EF4444" size="sm" textAlign="center">
                  {viewmodel.error}
                </Text>
              )}

              {viewmodel.mensaje && (
                <Text color={color.accent} size="sm" textAlign="center">
                  {viewmodel.mensaje}
                </Text>
              )}

              <Input
                variant="outline"
                size="md"
                borderRadius={10}
                borderColor={color.primary}
              >
                <InputField
                  placeholder="Correo electronico"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  color={color.textPrimary}
                  value={viewmodel.correo}
                  onChangeText={viewmodel.setCorreo}
                />
              </Input>

              <Button
                size="md"
                variant="solid"
                mt="$4"
                action="primary"
                borderRadius={10}
                bgColor={color.primary}
                onPress={handleSubmit}
                disabled={viewmodel.loading}
              >
                <ButtonText>
                  {viewmodel.loading ? "Enviando..." : "Recuperar contrasena"}
                </ButtonText>
              </Button>

              <Button variant="link" onPress={() => navigation.goBack()}>
                <Text color={color.primary} size="md">
                  Volver al inicio de sesion
                </Text>
              </Button>
            </VStack>
          </Box>
        </ScrollView>
      </Center>
      </HStack>
    </SafeAreaView>
  );
}
