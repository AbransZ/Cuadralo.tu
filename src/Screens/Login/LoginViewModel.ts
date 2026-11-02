import { useState } from "react";
import axios from "axios";
import { LoginRequest, LoginResponse } from "./Data/Models/User";
import { useAuthStore } from "../../Store/AuthStore";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "http://api-cuadralo.192.168.0.20.sslip.io";
console.log("[LoginViewModel] API_URL:", API_URL);

export function useLoginViewModel() {
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore((authState) => authState.login);
   const usuarioTrimmed = usuario.trim();
    const contraseniaTrimmed = contrasenia.trim();

  const submit = async (): Promise<boolean> => {
    if (!usuarioTrimmed) { setError("El usuario es requerido"); return false; }
    if (!contraseniaTrimmed) { setError("La contrasena es requerida"); return false; }

    setLoading(true);
    setError(null);

   

    const url = `${API_URL}/auth/login`;
    const data: LoginRequest = { usuario: usuarioTrimmed, contrasenia: contraseniaTrimmed };

    console.log("[Login] URL:", url);
    console.log("[Login] Enviando:", JSON.stringify(data));

    try {
      const response = await axios.post<LoginResponse>(url, data);
      console.log("[Login] Status:", response.status);
      console.log("[Login] Response:", JSON.stringify(response.data));
      await login(response.data.token, response.data.user);
      console.log("[Login] Login exitoso, guardado en store");
      return true;
    } catch (err: any) {
      console.log("[Login] Error completo:", JSON.stringify({
        message: err.message,
        code: err.code,
        status: err.response?.status,
        responseData: err.response?.data,
        requestURL: err.config?.url,
      }));
      setError(err.response?.data?.message || "Credenciales incorrectas");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    usuario,
    contrasenia,
    loading,
    error,
    setUsuario,
    setContrasenia,
    submit,
  };
}
