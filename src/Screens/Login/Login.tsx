import {
  Box,
  Button,
  ButtonText,
  Center,
  HStack,
  Image,
  ImageBackground,
  Input,
  InputField,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useAppTheme } from "../../Theme/ThemeManager";
import { SvgUri } from "react-native-svg";

export function LoginScreen() {
  const { color, isDark, onthemeChange } = useAppTheme();
  return (
    <HStack flex={1} bg={color.background}>
      <Box flex={1} borderRadius={10}p={"$20"}>
        <Image
          size="xl"
          source={require("../../sources/Images/Gemini_Generated_Image_qpeg91qpeg91qpeg.png")}
          alt="presentation"
          position="relative"
          resizeMode="cover"
          w={"$full"}
          h={"$full"}
          borderRadius={20}
        />
      </Box>
      <Center flex={1} bg={color.background}>
        <Box p="$4" bg={color.surface} borderRadius="$xl" borderWidth={1}>
          <VStack space={"md"} my={40} px={10}>
            <VStack space="xs" mb={4}>
              <Text
                size={"6xl"}
                fontWeight={"$bold"}
                color={color.textPrimary}
                textAlign={"center"}
              >
                Cuadralo.tu
              </Text>
              <Text
                size={"xl"}
                fontWeight={"$normal"}
                color={color.textPrimary}
                textAlign={"center"}
              >
                Gestiona tu propio inventario de manera sencilla y rápida
              </Text>
            </VStack>

            <Input
              variant={"outline"}
              size={"xl"}
              borderRadius={10}
              borderColor={color.primary}
            >
              <InputField placeholder={"Usuario"} color={"$white"} />
            </Input>

            <Input
              variant={"outline"}
              size={"xl"}
              mt={"$4"}
              borderRadius={10}
              borderColor={color.primary}
            >
              <InputField
                placeholder={"Contraseña"}
                type={"password"}
                color={"$white"}
              />
              <Button variant="link" alignSelf="center" pr={10}>
                <Image
                  source={require("../../sources/Images/eye.png")}
                  size="xs"
                  tintColor={color.textPrimary}
                  
                />
              </Button>
            </Input>
            <Button variant="link" alignSelf="flex-start">
              <Text color={color.primary} size="lg" >
                Olvidaste tu contraseña?
              </Text>
            </Button>
            <Button variant= "link"alignSelf="flex-start">
              
              <Text color={color.primary} size="lg">
            
                Crear cuenta
              </Text>
            </Button>

            <Button
              size={"xl"}
              variant={"solid"}
              mt={"$6"}
              action={"primary"}
              borderRadius={10}
              bgColor={color.primary}
            >
              <ButtonText>Ingresar</ButtonText>
            </Button>
          </VStack>
        </Box>
      </Center>
    </HStack>
  );
}
