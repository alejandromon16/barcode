import { doc, getDoc, DocumentSnapshot, DocumentData } from "firebase/firestore";
import firebase from "@/config/firebase/firebase";

export interface UserDataI {
  id: string;
  email: string;
  isAdmin: boolean;
  isEmailVerified: boolean;
  fullName: string;
  phoneNumber: string;
  ci: string;
}

export const fetchUserData = async (documentId: string): Promise<UserDataI | null> => {
  try {
    const docRef = doc(firebase.db, "users", documentId);
    const docSnapshot: DocumentSnapshot<DocumentData> = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const userData: UserDataI = docSnapshot.data() as UserDataI;
      console.log("User snapshot:", userData);
      return userData;
    }

    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};


