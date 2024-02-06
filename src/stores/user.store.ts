import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  updateUser: boolean
}

const useUserStore = create<AuthState>()(
  persist(
    (set, get) => ({
      updateUser: false
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

const handleLoginError = (error: any) => {
  console.error("Login failed:", error);
};

const handleLogoutError = (error: any) => {
  console.error("Logout failed:", error);
};

export default useUserStore;