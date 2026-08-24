export interface Product {
  codigo: string;
  nombre: string;
  descripcion: string;
  stock: number;
  fechaRegistro: string;
  fechaCaducidad?: string;
  tipo: string;
  categoria: string;
  precioBs: number;
  precioUSD: number;
  precioEUR: number;
}

export interface AdminProduct extends Product {
  nombreUsuario: string;
  idUsuario: string;
  comisionVenta: number;
}
