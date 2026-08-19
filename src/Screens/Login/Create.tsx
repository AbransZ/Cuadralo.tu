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

export function CreateScreen() {
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
            <Box flex={1} p={isWideScreen ? "$20" : "$6"}>
                <Image
                    source={require("../../sources/Images/Gemini_Generated_Image_qpeg91qpeg91qpeg.png")}
                    alt="Presentacion de Cuadralo"
                    resizeMode="cover"
                    w="$full"
                    h="$full"
                    borderRadius={20}
                />
            </Box>

            <Center flex={1} bg={color.background}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
                    showsVerticalScrollIndicator={false}
                    w="$full"
                >
                    <Box
                        p="$4"
                        m={isWideScreen ? "$0" : "$6"}
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
                                    Crear cuenta
                                </Text>
                                <Text
                                    size="lg"
                                    color={color.textSecondary}
                                    textAlign="center"
                                >
                                    Comienza a gestionar tu inventario con Cuadralo.tu
                                </Text>
                            </VStack>

                            <Input variant="outline" size="xl" borderRadius={10} borderColor={color.primary}>
                                <InputField placeholder="Nombre completo" color={color.textPrimary} />
                            </Input>

                            <Input variant="outline" size="xl" borderRadius={10} borderColor={color.primary}>
                                <InputField placeholder="Correo electronico" keyboardType="email-address" color={color.textPrimary} />
                            </Input>

                            <Input variant="outline" size="xl" borderRadius={10} borderColor={color.primary}>
                                <InputField placeholder="Usuario" autoCapitalize="none" color={color.textPrimary} />
                            </Input>

                            <Input variant="outline" size="xl" borderRadius={10} borderColor={color.primary}>
                                <InputField placeholder="Contraseña" type="password" color={color.textPrimary} />
                            </Input>

                            <Input variant="outline" size="xl" borderRadius={10} borderColor={color.primary}>
                                <InputField placeholder="Confirmar contraseña" type="password" color={color.textPrimary} />
                            </Input>

                            <Button
                                size="xl"
                                variant="solid"
                                mt="$4"
                                action="primary"
                                borderRadius={10}
                                bgColor={color.primary}
                            >
                                <ButtonText>Crear cuenta</ButtonText>
                            </Button>

                            <Button variant="link" onPress={() => navigation.goBack()}>
                                <Text color={color.primary} size="lg">
                                    Ya tengo una cuenta
                                </Text>
                            </Button>
                        </VStack>
                    </Box>
                </ScrollView>
            </Center>
        </HStack>
    );
}
