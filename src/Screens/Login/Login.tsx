import { useState } from "react";
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
import { useLoginViewModel } from "./LoginViewModel";

export function LoginScreen() {
  const navigation = useNavigation();
  const { color } = useAppTheme();
  const { width } = useWindowDimensions();
  const isWideScreen = width >= 768;
  const viewmodel = useLoginViewModel();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
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
                  Cuadralo.tu
                </Text>
                <Text
                  size="lg"
                  color={color.textSecondary}
                  textAlign="center"
                >
                  Gestiona tu propio inventario de manera sencilla y rapida
                </Text>
              </VStack>

              {viewmodel.error && (
                <Text color="#EF4444" size="sm" textAlign="center">
                  {viewmodel.error}
                </Text>
              )}

              <Input variant="outline" size="md" borderRadius={10} borderColor={color.primary}>
                <InputField
                  placeholder="Usuario"
                  color={color.textPrimary}
                  value={viewmodel.usuario}
                  onChangeText={viewmodel.setUsuario}
                />
              </Input>

              <HStack alignItems="center" borderRadius={10} borderWidth={1} borderColor={color.primary} overflow="hidden">
                <Input flex={1} variant="outline" size="md" borderWidth={0}>
                  <InputField
                    placeholder="Contrasena"
                    type={showPassword ? "text" : "password"}
                    color={color.textPrimary}
                    value={viewmodel.contrasenia}
                    onChangeText={viewmodel.setContrasenia}
                  />
                </Input>
                <Button
                  variant="link"
                  px="$3"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text size="lg" color={color.textSecondary}>
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </Text>
                </Button>
              </HStack>

              <Button
                variant="link"
                alignSelf="flex-start"
                onPress={() => navigation.navigate("ForgotPassword" as never)}
              >
                <Text color={color.primary} size="md">
                  Olvidaste tu contrasena?
                </Text>
              </Button>

              <Button
                variant="link"
                alignSelf="flex-start"
                onPress={() => navigation.navigate("Create" as never)}
              >
                <Text color={color.primary} size="md">
                  Crear cuenta
                </Text>
              </Button>

              <Button
                size="md"
                variant="solid"
                mt="$4"
                action="primary"
                borderRadius={10}
                bgColor={color.primary}
                onPress={handleLogin}
                disabled={viewmodel.loading}
              >
                <ButtonText>{viewmodel.loading ? "Ingresando..." : "Ingresar"}</ButtonText>
              </Button>
            </VStack>
          </Box>
        </ScrollView>
      </Center>
      </HStack>
    </SafeAreaView>
  );
}
