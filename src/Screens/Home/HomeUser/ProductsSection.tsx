import { useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  Box, Text, VStack, HStack, ScrollView, Input, InputField,
  Button, ButtonText, Modal, ModalBackdrop, ModalContent,
  ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Pressable,
} from "@gluestack-ui/themed";
import { useAppTheme } from "../../../Theme/ThemeManager";

const cardShadow = { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3, elevation: 2 };

function PriceInput({ symbol, placeholder, value, onChangeText, color }: {
  symbol: string; placeholder: string; value: string; onChangeText: (t: string) => void; color: any;
}) {
  return (
    <HStack alignItems="center" borderRadius={10} borderWidth={1} borderColor={color.primary} overflow="hidden">
      <Box bg={color.surface} px="$3" py="$3" borderRightWidth={1} borderRightColor={color.border}>
        <Text size="md" fontWeight="$bold" color={color.textSecondary}>{symbol}</Text>
      </Box>
      <Input flex={1} variant="outline" size="md">
        <InputField placeholder={placeholder} keyboardType="numeric" color={color.textPrimary} value={value} onChangeText={onChangeText} />
      </Input>
    </HStack>
  );
}

export function ProductsSection() {
  const { color } = useAppTheme();
  const { width } = useWindowDimensions();
  const isWideScreen = width >= 768;
  const [showModal, setShowModal] = useState(false);

  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState("");
  const [precioBs, setPrecioBs] = useState("");
  const [precioUSD, setPrecioUSD] = useState("");
  const [precioEUR, setPrecioEUR] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tipo, setTipo] = useState("");

  const resetForm = () => {
    setCodigo(""); setNombre(""); setDescripcion(""); setStock("");
    setPrecioBs(""); setPrecioUSD(""); setPrecioEUR("");
    setCategoria(""); setTipo("");
  };

  const handleClose = () => {
    resetForm();
    setShowModal(false);
  };

  return (
    <ScrollView bg={color.background} flex={1}>
      <VStack space="lg" p="$6">
        <Text size="2xl" fontWeight="$bold" color={color.textPrimary}>
          Productos
        </Text>

        <Box
          bg={color.surface}
          p="$5"
          borderRadius="$xl"
          borderWidth={1}
          borderColor={color.border}
          style={cardShadow}
        >
          <Text size="lg" fontWeight="$bold" color={color.textPrimary} mb="$3">
            Lista de Productos
          </Text>
          <Text size="sm" color={color.textSecondary}>
            No hay productos registrados
          </Text>

          <Button
            size="md"
            variant="solid"
            action="primary"
            borderRadius={10}
            bgColor={color.primary}
            mt="$4"
            onPress={() => setShowModal(true)}
          >
            <ButtonText>+ Agregar Producto</ButtonText>
          </Button>
        </Box>
      </VStack>

      <Modal isOpen={showModal} onClose={handleClose} size={isWideScreen ? "lg" : "full"}>
        <ModalBackdrop bgColor="rgba(0,0,0,0.5)" />
        <ModalContent mx="$6" my="$8" bg={color.surface} borderRadius="$xl" style={{ maxHeight: "85%" }}>
          <ModalHeader borderBottomWidth={1} borderBottomColor={color.border} pb="$3">
            <Text size="lg" fontWeight="$bold" color={color.textPrimary}>
              Agregar Producto
            </Text>
            <ModalCloseButton>
              <Text size="xl" color={color.textSecondary}>X</Text>
            </ModalCloseButton>
          </ModalHeader>

          <ModalBody>
            <ScrollView showsVerticalScrollIndicator={false}>
              <VStack space="md" pt="$4">
                <Input variant="outline" size="md" borderRadius={10} borderColor={color.primary}>
                  <InputField placeholder="Codigo" color={color.textPrimary} value={codigo} onChangeText={setCodigo} />
                </Input>

                <Input variant="outline" size="md" borderRadius={10} borderColor={color.primary}>
                  <InputField placeholder="Nombre" color={color.textPrimary} value={nombre} onChangeText={setNombre} />
                </Input>

                <Input variant="outline" size="md" borderRadius={10} borderColor={color.primary}>
                  <InputField placeholder="Descripcion" color={color.textPrimary} value={descripcion} onChangeText={setDescripcion} />
                </Input>

                <HStack space="md">
                  <Input variant="outline" size="md" flex={1} borderRadius={10} borderColor={color.primary}>
                    <InputField placeholder="Stock" keyboardType="numeric" color={color.textPrimary} value={stock} onChangeText={setStock} />
                  </Input>
                  <Input variant="outline" size="md" flex={1} borderRadius={10} borderColor={color.primary}>
                    <InputField placeholder="Tipo (producto o servicio)" color={color.textPrimary} value={tipo} onChangeText={setTipo} />
                  </Input>
                </HStack>

                <Input variant="outline" size="md" borderRadius={10} borderColor={color.primary}>
                  <InputField placeholder="Categoria" color={color.textPrimary} value={categoria} onChangeText={setCategoria} />
                </Input>

                <Text size="md" fontWeight="$bold" color={color.textPrimary} mt="$2">
                  Precios
                </Text>

                <PriceInput symbol="$" placeholder="Precio Dolares (USD)" value={precioUSD} onChangeText={setPrecioUSD} color={color} />
                <PriceInput symbol="Bs" placeholder="Precio Bolivares (VES)" value={precioBs} onChangeText={setPrecioBs} color={color} />
                <PriceInput symbol="€" placeholder="Precio Euros (EUR)" value={precioEUR} onChangeText={setPrecioEUR} color={color} />
              </VStack>
            </ScrollView>
          </ModalBody>

          <ModalFooter borderTopWidth={1} borderTopColor={color.border} pt="$3">
            <Button size="md" variant="solid" action="primary" borderRadius={10} bgColor={color.primary} onPress={handleClose}>
              <ButtonText>Agregar Producto</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ScrollView>
  );
}
