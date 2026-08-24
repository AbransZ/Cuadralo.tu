import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../Screens/Login/Data/Models/User";

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  login: async (token: string, user: User) => {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    set({ token: null, user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const storedToken = await AsyncStorage.getItem("token");
    const storedUser = await AsyncStorage.getItem("user");
    if (storedToken && storedUser) {
      set({
        token: storedToken,
        user: JSON.parse(storedUser),
        isAuthenticated: true,
      });
    }
  },
}));
