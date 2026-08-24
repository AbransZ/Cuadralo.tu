import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { User } from "../../Login/Data/Models/User";
import { useAuthStore } from "../../../Store/AuthStore";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export function useHomeAdminViewModel() {
  const usuarioAdmin = useAuthStore((authState) => authState.user);
  const [empleadosDelAdmin, setEmpleadosDelAdmin] = useState<User[]>([]);
  const [usuariosEncontrados, setUsuariosEncontrados] = useState<User[]>([]);
  const [cargandoEmpleados, setCargandoEmpleados] = useState(false);
  const [errorCarga, setErrorCarga] = useState<string | null>(null);

  const cargarEmpleados = useCallback(async () => {
    if (!usuarioAdmin?.id) return;
    try {
      setCargandoEmpleados(true);
      setErrorCarga(null);
      const respuestaEmpleados = await axios.get<User[]>(
        `${API_URL}/auth/users/${usuarioAdmin.id}/employees`
      );
      setEmpleadosDelAdmin(respuestaEmpleados.data);
    } catch (errorCargaEmpleados: any) {
      console.log("[HomeAdmin] Error al cargar empleados:", errorCargaEmpleados.message);
      setErrorCarga("Error al cargar empleados");
    } finally {
      setCargandoEmpleados(false);
    }
  }, [usuarioAdmin?.id]);

  const buscarUsuariosDisponibles = useCallback(async (datoBuscado: string) => {
    if (!usuarioAdmin?.id) return;
    try {
      const respuestaBusqueda = await axios.get<User[]>(
        `${API_URL}/auth/users/search`,
        { params: { datoBuscado, idAdminExclude: usuarioAdmin.id } }
      );
      setUsuariosEncontrados(respuestaBusqueda.data);
    } catch (errorBusqueda: any) {
      console.log("[HomeAdmin] Error al buscar usuarios:", errorBusqueda.message);
    }
  }, [usuarioAdmin?.id]);

  const contratarUsuario = useCallback(async (idUsuario: number) => {
    if (!usuarioAdmin?.id) return;
    try {
      const respuestaContratacion = await axios.patch<{ message: string }>(
        `${API_URL}/auth/users/${usuarioAdmin.id}/hire/${idUsuario}`
      );
      await cargarEmpleados();
      return respuestaContratacion.data;
    } catch (errorContratacion: any) {
      console.log("[HomeAdmin] Error al contratar usuario:", errorContratacion.message);
    }
  }, [usuarioAdmin?.id, cargarEmpleados]);

  useEffect(() => {
    cargarEmpleados();
    const intervaloActualizacion = setInterval(cargarEmpleados, 5000);
    return () => clearInterval(intervaloActualizacion);
  }, [cargarEmpleados]);

  return {
    usuarioAdmin,
    empleadosDelAdmin,
    usuariosEncontrados,
    cargandoEmpleados,
    errorCarga,
    buscarUsuariosDisponibles,
    contratarUsuario,
    cargarEmpleados,
  };
}
