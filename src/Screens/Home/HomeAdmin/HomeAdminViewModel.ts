import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { UsuarioResumen } from "../../Login/Data/Models/User";
import { useAuthStore } from "../../../Store/AuthStore";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const RETRASO_BUSQUEDA_MS = 350;

export function useHomeAdminViewModel() {
  const usuarioAdmin = useAuthStore((authState) => authState.user);
  const [empleadosDelAdmin, setEmpleadosDelAdmin] = useState<UsuarioResumen[]>([]);
  const [usuariosEncontrados, setUsuariosEncontrados] = useState<UsuarioResumen[]>([]);
  const [cargandoEmpleados, setCargandoEmpleados] = useState(false);
  const [cargandoBusqueda, setCargandoBusqueda] = useState(false);
  const [contratandoUsuarioId, setContratandoUsuarioId] = useState<number | null>(null);
  const [errorCarga, setErrorCarga] = useState<string | null>(null);
  const [errorBusqueda, setErrorBusqueda] = useState<string | null>(null);
  const [errorContratacion, setErrorContratacion] = useState<string | null>(null);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);
  const [mostrarModalAsignacion, setMostrarModalAsignacion] = useState(false);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  // Identifica la ultima peticion de busqueda para ignorar respuestas viejas.
  const idPeticionBusqueda = useRef(0);

  const cargarEmpleados = useCallback(async () => {
    if (!usuarioAdmin?.id) return;
    try {
      setCargandoEmpleados(true);
      setErrorCarga(null);
      const respuestaEmpleados = await axios.get<UsuarioResumen[]>(
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
    const idPeticionActual = idPeticionBusqueda.current + 1;
    idPeticionBusqueda.current = idPeticionActual;

    try {
      setCargandoBusqueda(true);
      setErrorBusqueda(null);
      const respuestaBusqueda = await axios.get<UsuarioResumen[]>(
        `${API_URL}/auth/users/search`,
        { params: { datoBuscado, idAdminExclude: usuarioAdmin.id } }
      );

      // Si llego una respuesta de una busqueda anterior, se descarta.
      if (idPeticionActual !== idPeticionBusqueda.current) return;
      setUsuariosEncontrados(respuestaBusqueda.data);
    } catch (errorBusquedaUsuarios: any) {
      if (idPeticionActual !== idPeticionBusqueda.current) return;
      console.log("[HomeAdmin] Error al buscar usuarios:", errorBusquedaUsuarios.message);
      setErrorBusqueda("No se pudieron cargar los usuarios disponibles");
    } finally {
      if (idPeticionActual === idPeticionBusqueda.current) {
        setCargandoBusqueda(false);
      }
    }
  }, [usuarioAdmin?.id]);

  const abrirModalAsignacion = useCallback(() => {
    setTextoBusqueda("");
    setUsuariosEncontrados([]);
    setErrorBusqueda(null);
    setErrorContratacion(null);
    setMensajeExito(null);
    setMostrarModalAsignacion(true);
  }, []);

  const cerrarModalAsignacion = useCallback(() => {
    // Invalida cualquier busqueda en curso al cerrar el modal.
    idPeticionBusqueda.current += 1;
    setMostrarModalAsignacion(false);
    setTextoBusqueda("");
    setUsuariosEncontrados([]);
    setCargandoBusqueda(false);
    setErrorBusqueda(null);
    setErrorContratacion(null);
    setMensajeExito(null);
  }, []);

  const contratarUsuario = useCallback(async (idUsuario: number) => {
    if (!usuarioAdmin?.id) return;
    if (contratandoUsuarioId !== null) return;

    const usuarioYaContratado = empleadosDelAdmin.some(
      (empleado) => empleado.id === idUsuario
    );
    if (usuarioYaContratado) {
      setErrorContratacion("El usuario ya esta contratado");
      return;
    }

    try {
      setContratandoUsuarioId(idUsuario);
      setErrorContratacion(null);
      setMensajeExito(null);
      const respuestaContratacion = await axios.patch<{ message: string }>(
        `${API_URL}/auth/users/${usuarioAdmin.id}/hire/${idUsuario}`
      );

      await cargarEmpleados();
      setUsuariosEncontrados((usuariosActuales) =>
        usuariosActuales.filter((usuario) => usuario.id !== idUsuario)
      );
      setTextoBusqueda("");
      setMensajeExito(
        respuestaContratacion.data.message || "Usuario contratado exitosamente"
      );
    } catch (errorContratacionUsuario: any) {
      console.log("[HomeAdmin] Error al contratar usuario:", errorContratacionUsuario.message);
      setErrorContratacion(
        errorContratacionUsuario.response?.data?.message ||
          "No se pudo contratar al usuario"
      );
    } finally {
      setContratandoUsuarioId(null);
    }
  }, [usuarioAdmin?.id, contratandoUsuarioId, empleadosDelAdmin, cargarEmpleados]);

  useEffect(() => {
    cargarEmpleados();
    const intervaloActualizacion = setInterval(cargarEmpleados, 5000);
    return () => clearInterval(intervaloActualizacion);
  }, [cargarEmpleados]);

  // Espera un breve momento tras la ultima tecla antes de buscar.
  useEffect(() => {
    if (!mostrarModalAsignacion || !usuarioAdmin?.id) return;

    const temporizadorBusqueda = setTimeout(() => {
      buscarUsuariosDisponibles(textoBusqueda);
    }, RETRASO_BUSQUEDA_MS);

    return () => clearTimeout(temporizadorBusqueda);
  }, [textoBusqueda, mostrarModalAsignacion, usuarioAdmin?.id, buscarUsuariosDisponibles]);

  return {
    usuarioAdmin,
    empleadosDelAdmin,
    usuariosEncontrados,
    cargandoEmpleados,
    cargandoBusqueda,
    contratandoUsuarioId,
    errorCarga,
    errorBusqueda,
    errorContratacion,
    mensajeExito,
    mostrarModalAsignacion,
    textoBusqueda,
    abrirModalAsignacion,
    cerrarModalAsignacion,
    setTextoBusqueda,
    buscarUsuariosDisponibles,
    contratarUsuario,
    cargarEmpleados,
  };
}
