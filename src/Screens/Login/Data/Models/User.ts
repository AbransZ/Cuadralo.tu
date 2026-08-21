export interface User {
  id: string;
  nombre: string;
  correo: string;
  usuario: string;
  contrasenia: string;
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
