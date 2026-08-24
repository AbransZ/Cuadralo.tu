import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Product } from "../Data/Models/Product";
import { useAuthStore } from "../../../Store/AuthStore";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface InfoAdmin {
  nombre: string;
  correo: string;
  usuario: string;
}

export function useHomeUserViewModel() {
  const usuarioActual = useAuthStore((authState) => authState.user);
  const [activeSection, setActiveSection] = useState<"dashboard" | "products">("dashboard");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [infoAdmin, setInfoAdmin] = useState<InfoAdmin | null>(null);

  const cargarInfoAdmin = useCallback(async () => {
    if (!usuarioActual?.id) return;
    try {
      const respuestaInfoAdmin = await axios.get<InfoAdmin>(
        `${API_URL}/auth/users/${usuarioActual.id}/admin-info`
      );
      setInfoAdmin(respuestaInfoAdmin.data);
    } catch (errorCargaAdmin) {
      console.log("[HomeUser] No se pudo cargar info del admin:", errorCargaAdmin);
    }
  }, [usuarioActual?.id]);

  useEffect(() => {
    cargarInfoAdmin();
  }, [cargarInfoAdmin]);

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(products.map((producto) =>
      producto.codigo === updatedProduct.codigo ? updatedProduct : producto
    ));
  };

  const sellProduct = (codigo: string, cantidad: number) => {
    setProducts(products.map((producto) =>
      producto.codigo === codigo
        ? { ...producto, stock: producto.stock - cantidad }
        : producto
    ));
  };

  const deleteProduct = (codigo: string) => {
    setProducts(products.filter((producto) => producto.codigo !== codigo));
  };

  const totalStock = products.reduce((acumulador, producto) => acumulador + producto.stock, 0);
  const lowStockProducts = products.filter((producto) => producto.stock < 5);

  return {
    activeSection,
    setActiveSection,
    products,
    selectedProduct,
    setSelectedProduct,
    addProduct,
    updateProduct,
    sellProduct,
    deleteProduct,
    totalStock,
    lowStockProducts,
    infoAdmin,
  };
}
