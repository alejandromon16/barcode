import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import firebase from "@/config/firebase/firebase";
import { fetchUserData } from "@/services/fetchUserData";

interface AuthState {
  isAuth: boolean;
  isAdmin: boolean;
  userId: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      isAuth: false,
      userId: null,
      isAdmin: false,

      login: async (email, password) => {
        try {
          console.log(`Auth store login input: ${email} ${password}`);
          const userCredential = await signInWithEmailAndPassword(
            firebase.auth,
            email,
            password
          );
          const id = userCredential.user.uid;
          const userData = await fetchUserData(id);
          if (userData) {
            set({ isAuth: true, userId: id, isAdmin: userData.isAdmin });
          }
        } catch (error) {
          handleLoginError(error);
        }
      },

      logout: async () => {
        try {
          await signOut(firebase.auth);
          set({ isAuth: false, userId: null, isAdmin: false });
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
