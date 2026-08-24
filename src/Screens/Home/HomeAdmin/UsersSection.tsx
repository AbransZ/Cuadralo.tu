import { useState, useEffect, useCallback } from "react";
import { useWindowDimensions } from "react-native";
import {
  Box, Text, VStack, HStack, ScrollView, Input, InputField,
  Button, ButtonText, Modal, ModalBackdrop, ModalContent,
  ModalHeader, ModalBody, ModalCloseButton, ModalFooter,
} from "@gluestack-ui/themed";
import { useAppTheme } from "../../../Theme/ThemeManager";
import { useHomeAdminViewModel } from "./HomeAdminViewModel";

const cardShadow = { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3, elevation: 2 };

export function UsersSection() {
  const { color } = useAppTheme();
  const { width } = useWindowDimensions();
  const isWideScreen = width >= 768;
  const [showModal, setShowModal] = useState(false);
  const [datoBuscado, setDatoBuscado] = useState("");

  const {
    empleadosDelAdmin,
    usuariosEncontrados,
    cargandoEmpleados,
    buscarUsuariosDisponibles,
    contratarUsuario,
  } = useHomeAdminViewModel();

  useEffect(() => {
    if (showModal) {
      buscarUsuariosDisponibles("");
    }
  }, [showModal, buscarUsuariosDisponibles]);

  const handleBuscar = useCallback((textoBusqueda: string) => {
    setDatoBuscado(textoBusqueda);
    buscarUsuariosDisponibles(textoBusqueda);
  }, [buscarUsuariosDisponibles]);

  const handleContratar = async (idUsuario: number) => {
    await contratarUsuario(idUsuario);
    await buscarUsuariosDisponibles(datoBuscado);
  };

  return (
    <ScrollView bg={color.background} flex={1}>
      <VStack space="lg" p="$6">
        <Text size="2xl" fontWeight="$bold" color={color.textPrimary}>
          Gestion de Usuarios
        </Text>

        <HStack space="md" flexWrap="wrap">
          <Box flex={1} minWidth={isWideScreen ? undefined : "$32"} bg={color.surface} p="$5" borderRadius="$xl" borderWidth={1} borderColor={color.border} style={cardShadow}>
            <Text size="xs" color={color.textSecondary}>Total Usuarios</Text>
            <Text size="2xl" fontWeight="$bold" color={color.primary} mt="$1">{empleadosDelAdmin.length}</Text>
          </Box>
          <Box flex={1} minWidth={isWideScreen ? undefined : "$32"} bg={color.surface} p="$5" borderRadius="$xl" borderWidth={1} borderColor={color.border} style={cardShadow}>
            <Text size="xs" color={color.textSecondary}>Comisiones Ganadas</Text>
            <Text size="2xl" fontWeight="$bold" color={color.accent} mt="$1">$0</Text>
          </Box>
        </HStack>

        <HStack space="md" flexWrap="wrap">
          <Box flex={1} minWidth={isWideScreen ? undefined : "$32"} bg={color.surface} p="$5" borderRadius="$xl" borderWidth={1} borderColor={color.border} style={cardShadow}>
            <Text size="xs" color={color.textSecondary}>Ventas Totales</Text>
            <Text size="2xl" fontWeight="$bold" color="#F59E0B" mt="$1">$0</Text>
          </Box>
          <Box flex={1} minWidth={isWideScreen ? undefined : "$32"} bg={color.surface} p="$5" borderRadius="$xl" borderWidth={1} borderColor={color.border} style={cardShadow}>
            <Text size="xs" color={color.textSecondary}>Ganancias Netas</Text>
            <Text size="2xl" fontWeight="$bold" color={color.primary} mt="$1">$0</Text>
          </Box>
        </HStack>

        <Box bg={color.surface} p="$5" borderRadius="$xl" borderWidth={1} borderColor={color.border} style={cardShadow}>
          <Text size="lg" fontWeight="$bold" color={color.textPrimary} mb="$3">
            Usuarios Registrados
          </Text>

          {cargandoEmpleados && empleadosDelAdmin.length === 0 ? (
            <Text size="sm" color={color.textSecondary}>Cargando empleados...</Text>
          ) : empleadosDelAdmin.length === 0 ? (
            <Text size="sm" color={color.textSecondary}>No hay usuarios asignados</Text>
          ) : (
            <VStack space="md">
              {empleadosDelAdmin.map((empleado) => (
                <Box key={empleado.id} bg={color.background} p="$4" borderRadius="$lg" borderWidth={1} borderColor={color.border}>
                  <HStack justifyContent="space-between" alignItems="center">
                    <VStack flex={1}>
                      <Text size="md" fontWeight="$bold" color={color.textPrimary}>{empleado.nombre}</Text>
                      <Text size="sm" color={color.textSecondary}>{empleado.correo}</Text>
                      <Text size="xs" color={color.textSecondary} mt="$1">@{empleado.usuario}</Text>
                    </VStack>
                    <VStack alignItems="flex-end">
                      <Text size="xs" color={color.textSecondary}>Ventas</Text>
                      <Text size="md" fontWeight="$bold" color="#F59E0B">$0</Text>
                      <Text size="xs" color={color.textSecondary} mt="$1">Comision</Text>
                      <Text size="md" fontWeight="$bold" color={color.accent}>$0</Text>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          )}

          <Button size="md" variant="solid" action="primary" borderRadius={10} bgColor={color.primary} mt="$4" onPress={() => setShowModal(true)}>
            <ButtonText>+ Asignar Nuevo Usuario</ButtonText>
          </Button>
        </Box>
      </VStack>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size={isWideScreen ? "lg" : "full"}>
        <ModalBackdrop bgColor="rgba(0,0,0,0.5)" />
        <ModalContent mx="$6" my="$8" bg={color.surface} borderRadius="$xl" style={{ maxHeight: "85%" }}>
          <ModalHeader borderBottomWidth={1} borderBottomColor={color.border} pb="$3">
            <Text size="lg" fontWeight="$bold" color={color.textPrimary}>Asignar Nuevo Usuario</Text>
            <ModalCloseButton>
              <Text size="xl" color={color.textSecondary}>X</Text>
            </ModalCloseButton>
          </ModalHeader>

          <ModalBody>
            <ScrollView showsVerticalScrollIndicator={false}>
              <VStack space="md" pt="$4">
                <Input variant="outline" size="md" borderRadius={10} borderColor={color.primary}>
                  <InputField placeholder="Buscar usuario por nombre o correo" color={color.textPrimary} value={datoBuscado} onChangeText={handleBuscar} />
                </Input>

                {usuariosEncontrados.length === 0 ? (
                  <Text size="sm" color={color.textSecondary} mt="$2">No se encontraron usuarios disponibles</Text>
                ) : (
                  <VStack space="md" mt="$2">
                    {usuariosEncontrados.map((usuarioEncontrado) => (
                      <Box key={usuarioEncontrado.id} bg={color.background} p="$4" borderRadius="$lg" borderWidth={1} borderColor={color.border}>
                        <HStack justifyContent="space-between" alignItems="center">
                          <VStack flex={1}>
                            <Text size="sm" color={color.textSecondary}>ID: {usuarioEncontrado.id}</Text>
                            <Text size="md" fontWeight="$bold" color={color.textPrimary}>{usuarioEncontrado.correo}</Text>
                            <Text size="xs" color={color.textSecondary} mt="$1">@{usuarioEncontrado.usuario}</Text>
                            <Text size="xs" color={color.textSecondary} mt="$1">
                              Registrado: {new Date(usuarioEncontrado.createdAt).toLocaleDateString()}
                            </Text>
                          </VStack>
                          <Button size="sm" variant="solid" action="primary" borderRadius={8} bgColor={color.primary} onPress={() => handleContratar(usuarioEncontrado.id)}>
                            <ButtonText>Contratar</ButtonText>
                          </Button>
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                )}
              </VStack>
            </ScrollView>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ScrollView>
  );
}
