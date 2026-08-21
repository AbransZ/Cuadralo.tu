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
import { useCreateViewModel } from "./CreateViewModel";

export function CreateScreen() {
    const navigation = useNavigation();
    const { color } = useAppTheme();
    const { width } = useWindowDimensions();
    const isWideScreen = width >= 768;
    const vm = useCreateViewModel();

    const handleCreate = async () => {
        const result = await vm.submit();
        if (result) {
            navigation.goBack();
        }
    };

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

                            {vm.error && (
                                <Text color="#EF4444" size="sm" textAlign="center">
                                    {vm.error}
                                </Text>
                            )}

                            <Input variant="outline" size="md" borderRadius={10} borderColor={color.primary}>
                                <InputField
                                    placeholder="Nombre completo"
                                    color={color.textPrimary}
                                    value={vm.nombre}
                                    onChangeText={vm.setNombre}
                                />
                            </Input>

                            <Input variant="outline" size="md" borderRadius={10} borderColor={color.primary}>
                                <InputField
                                    placeholder="Correo electronico"
                                    keyboardType="email-address"
                                    color={color.textPrimary}
                                    value={vm.correo}
                                    onChangeText={vm.setCorreo}
                                />
                            </Input>

                            <Input variant="outline" size="md" borderRadius={10} borderColor={color.primary}>
                                <InputField
                                    placeholder="Usuario"
                                    autoCapitalize="none"
                                    color={color.textPrimary}
                                    value={vm.usuario}
                                    onChangeText={vm.setUsuario}
                                />
                            </Input>

                            <Input variant="outline" size="md" borderRadius={10} borderColor={color.primary}>
                                <InputField
                                    placeholder="Contrasena"
                                    type="password"
                                    color={color.textPrimary}
                                    value={vm.contrasenia}
                                    onChangeText={vm.setContrasenia}
                                />
                            </Input>

                            <Input variant="outline" size="md" borderRadius={10} borderColor={color.primary}>
                                <InputField
                                    placeholder="Confirmar contrasena"
                                    type="password"
                                    color={color.textPrimary}
                                    value={vm.confirmarContrasenia}
                                    onChangeText={vm.setConfirmarContrasenia}
                                />
                            </Input>

                            <Button
                                size="md"
                                variant="solid"
                                mt="$4"
                                action="primary"
                                borderRadius={10}
                                bgColor={color.primary}
                                onPress={handleCreate}
                                disabled={vm.loading}
                            >
                                <ButtonText>{vm.loading ? "Creando..." : "Crear cuenta"}</ButtonText>
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
