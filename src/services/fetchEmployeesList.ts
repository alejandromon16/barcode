import {
  getDocs,
  collection,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import firebase from "@/config/firebase/firebase";
import { UserDataI } from "./fetchUserData";

export const fetchEmployeesList = async (): Promise<UserDataI[]> => {
  try {
    const q = query(
      collection(firebase.db, "users"),
      where("isAdmin", "==", false)
    );
    const querySnapshot = await getDocs(q);
    
    const data: UserDataI[] = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as UserDataI),
      id: doc.id

    }));

    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return [];
  }
};
