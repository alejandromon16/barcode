import { doc, getDocs, query, where, CollectionReference, DocumentSnapshot, DocumentData, Timestamp, collection, updateDoc } from "firebase/firestore";
import firebase from "../config/firebase/firebase";


export interface TicketDataI {
  createdAt: Timestamp;
  isAlreadyScan: boolean;
  qrValue: string;
}

export type TicketStatus = 'VALID' | 'ALREADY_SCAN' | 'INVALID' | 'PROCESSING'

export const checkStatusTicket  = async (qrValue: string, userId: string): Promise<TicketStatus> => {
  try {
    const ticketsRef = collection(firebase.db,'tickets');
    const q = query(ticketsRef, where('qrValue','==', qrValue));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const ticketDoc = querySnapshot.docs[0];
      const ticketData: TicketDataI = querySnapshot.docs[0].data() as TicketDataI;
      console.log("User snapshot:", ticketData);

      if (ticketData.isAlreadyScan) {
        console.log("Ticket is already scanned.");
        return 'ALREADY_SCAN';
      } else {
        console.log("Document has qrValue and is not already scanned.");

        console.log('ticket id', ticketDoc.id)
        await updateDoc(doc(firebase.db, 'tickets', ticketDoc.id), {
          isAlreadyScan: true,
          scanBy: userId,
          updatedAt: Timestamp.now()
        });

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