import { useState } from "react";
import axios from "axios";
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from "./Data/Models/User";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export function useForgotPasswordViewModel() {
  const [correo, setCorreo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const submit = async (): Promise<boolean> => {
    const correoTrimmed = correo.trim();

    if (!correoTrimmed) {
      setError("El correo es requerido");
      return false;
    }

    if (!correoTrimmed.includes("@") || !correoTrimmed.includes(".")) {
      setError("Ingresa un correo valido");
      return false;
    }

    setLoading(true);
    setError(null);
    setMensaje(null);

    try {
      const data: ForgotPasswordRequest = { correo: correoTrimmed };
      const response = await axios.post<ForgotPasswordResponse>(
        `${API_URL}/auth/forgot-password`,
        data
      );
      setMensaje(
        response.data.message || "Revisa tu correo para continuar"
      );
      return true;
    } catch (errorRecuperacion: any) {
      console.log(
        "[ForgotPassword] Error:",
        errorRecuperacion.message,
        errorRecuperacion.response?.status
      );
      setError(
        errorRecuperacion.response?.data?.message ||
          "No se pudo enviar la solicitud, intenta de nuevo"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    correo,
    loading,
    error,
    mensaje,
    setCorreo,
    submit,
  };
}
