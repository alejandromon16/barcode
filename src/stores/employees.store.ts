import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  employeeUpdate: boolean;
}

const useEmployeeStore = create<AuthState>()(
  persist(
    (set, get) => ({
      employeeUpdate: false
    }),
    {
      name: "employee-storage",
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

export default useEmployeeStore;