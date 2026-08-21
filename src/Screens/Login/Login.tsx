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
import { useAppTheme } from "../../Theme/ThemeManager";

export function LoginScreen() {
  const navigation = useNavigation();
  const { color } = useAppTheme();
  const { width } = useWindowDimensions();
  const isWideScreen = width >= 768;

  return (
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

              <Input
                variant="outline"
                size="md"
                borderRadius={10}
                borderColor={color.primary}
              >
                <InputField placeholder="Usuario" color={color.textPrimary} />
              </Input>

              <Input
                variant="outline"
                size="md"
                borderRadius={10}
                borderColor={color.primary}
              >
                <InputField
                  placeholder="Contrasena"
                  type="password"
                  color={color.textPrimary}
                />
                <Button variant="link" alignSelf="center" pr={10}>
                  <Image
                    source={require("../../sources/Images/eye.png")}
                    size="2xs"
                    tintColor={color.textPrimary}
                  />
                </Button>
              </Input>

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
              >
                <ButtonText>Ingresar</ButtonText>
              </Button>
            </VStack>
          </Box>
        </ScrollView>
      </Center>
    </HStack>
  );
}
