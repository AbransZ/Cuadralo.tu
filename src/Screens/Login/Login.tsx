import {
  Box,
  Button,
  ButtonText,
  Center,
  Input,
  InputField,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { View } from "react-native";

export function LoginScreen() {
  return (
    <Center flex={1} bg="$backgroundDark950">
      <Box
        p="$4"
        bg="$backgroundDark900"
        borderRadius="$xl"
        w="$80"
        borderWidth={1}
        borderColor="$borderDark800"
      >
        <VStack space={"md"}>
          <VStack space="xs" mb={4}>
            <Text
              size={"3xl"}
              fontWeight={"$bold"}
              color={"$primary500"}
              textAlign={"center"}
            >
              Cuadralo.tu
            </Text>
            <Text
              size={"xs"}
              fontWeight={"$normal"}
              color={"$primary500"}
              textAlign={"center"}
            >
              Gestiona tu propio inventario de manera sencilla y rápida
            </Text>
          </VStack>

          <Input variant={"outline"} size={"md"}>
            <InputField placeholder={"Usuario"} color={"$white"}></InputField>
          </Input>

          <Input variant={"outline"} size={"md"} mt={"$4"}>
            <InputField
              placeholder={"Contraseña"}
              type={"password"}
              color={"$white"}
            ></InputField>
          </Input>

          <Button size={"md"} variant={"solid"} mt={"$6"} action={"primary"} borderRadius={10}>
            <ButtonText>Ingresar</ButtonText>
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
