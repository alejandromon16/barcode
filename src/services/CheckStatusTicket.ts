import { doc, getDocs, query, where, CollectionReference, DocumentSnapshot, DocumentData, Timestamp, collection } from "firebase/firestore";
import firebase from "../config/firebase/firebase";


export interface TicketDataI {
  createdAt: Timestamp;
  isAlreadyScan: boolean;
  qrValue: string;
}

export type TicketStatus = 'VALID' | 'ALREADY_SCAN' | 'INVALID'

export const checkStatusTicket  = async (qrValue: string): Promise<TicketStatus> => {
  try {
    const ticketsRef = collection(firebase.db,'tickets');
    const q = query(ticketsRef, where('qrValue','==', qrValue));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const ticketData: TicketDataI = querySnapshot.docs[0].data() as TicketDataI;
      console.log("User snapshot:", ticketData);

      if (ticketData.isAlreadyScan) {
        console.log("Ticket is already scanned.");
        return 'ALREADY_SCAN';
      } else {
        console.log("Document has qrValue and is not already scanned.");
        return 'VALID'
      }
    }

    console.log("No document with matching qrValue found.");
    return 'INVALID'
  } catch (error) {
    console.error("Error fetching Ticket:", error);
    return 'INVALID';
  }
};
