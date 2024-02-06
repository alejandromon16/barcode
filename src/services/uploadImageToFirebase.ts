import firebase from "@/config/firebase/firebase";
import { getDownloadURL, ref, StorageReference, uploadBytes } from "firebase/storage";

const getFirebaseDownloadURL = async (storageRef: StorageReference) => {
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

const uploadBlobToFirebase = (storageRef:StorageReference, blob: Blob | Uint8Array | ArrayBuffer) => {
  return uploadBytes(storageRef, blob);
};

export const uploadImageToFirebase = async (uri:string, imageName: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const storageRef = ref(firebase.storage, `/tickets/${imageName}.png`);
  await uploadBlobToFirebase(storageRef, blob);

  const downloadURL = await getFirebaseDownloadURL(storageRef);
  return downloadURL;
};