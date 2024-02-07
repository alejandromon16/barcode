import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import firebase from "../config/firebase/firebase";


interface AuthState {
  isAuth: boolean;
  userId: string | null;
}

interface AuthActions {
  login: (inputs: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      isAuth: false,
      userId: null,

      login: async ({
        email,
        password,
      }: {
        email: string;
        password: string;
      }) => {
        try {
          const userCredential = await signInWithEmailAndPassword(
            firebase.auth,
            email,
            password
          );
          set({ isAuth: true, userId: userCredential.user.uid });
        } catch (error) {
          handleLoginError(error);
        }
      },


      logout: async () => {
        try {
          await signOut(firebase.auth);
          set({ isAuth: false, userId: null });
        } catch (error) {
          handleLogoutError(error);
        }
      },
    }),
    {
      name: "auth-storage",
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

export default useAuthStore;
