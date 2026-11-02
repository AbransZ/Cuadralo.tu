export interface User {
  id: number;
  nombre: string;
  correo: string;
  usuario: string;
  contrasenia: string;
  nivelUsuario: number;
  activo: boolean;
  productosRegistrados: number[];
  adminId: number | null;
  createdAt: string;
}

export interface CreateUserRequest {
  nombre: string;
  correo: string;
  usuario: string;
  contrasenia: string;
}

export interface CreateUserResponse {
  token: string;
  user: User;
  message: string;
}

export interface LoginRequest {
  usuario: string;
  contrasenia: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  message: string;
}

export interface UsuarioResumen {
  id: number;
  nombre: string;
  correo: string;
  usuario: string;
  nivelUsuario: number;
  activo: boolean;
  productosRegistrados: number[];
  adminId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ForgotPasswordRequest {
  correo: string;
}

export interface ForgotPasswordResponse {
  message: string;
}
