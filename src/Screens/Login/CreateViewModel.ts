import { useState } from "react";
import axios from "axios";
import { CreateUserRequest, CreateUserResponse } from "./Data/Models/User";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export function useCreateViewModel() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [confirmarContrasenia, setConfirmarContrasenia] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (): Promise<CreateUserResponse | null> => {
    if (!nombre.trim()) { setError("El nombre es requerido"); return null; }
    if (!correo.trim()) { setError("El correo es requerido"); return null; }
    if (!correo.includes("@") || !correo.endsWith(".com")) { setError("Correo invalido, debe contener @ y terminar en .com"); return null; }
    if (!usuario.trim()) { setError("El usuario es requerido"); return null; }
    if (!contrasenia || contrasenia.length < 6) { setError("La contrasena debe tener minimo 6 caracteres"); return null; }
    if (contrasenia !== confirmarContrasenia) { setError("Las contrasenas no coinciden"); return null; }

    setLoading(true);
    setError(null);
    try {
      const data: CreateUserRequest = { nombre, correo, usuario, contrasenia };
      const response = await axios.post<CreateUserResponse>(`${API_URL}/auth/create`, data);
      return response.data;
    } catch (err) {
      setError("Error al crear cuenta, intenta de nuevo");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    nombre,
    correo, 
    usuario, 
    contrasenia, 
    confirmarContrasenia,
    loading, 
    error,
    setNombre, 
    setCorreo, 
    setUsuario, 
    setContrasenia, 
    setConfirmarContrasenia,
    submit,
  };
}
